/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AxiosError } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { ICaracteristicaClienteFornecedorDTO } from "@modules/omie/dtos/ICaracteristicaClienteFornecedorDTO";
import { IClienteFornecedorDTO } from "@modules/omie/dtos/IClienteFornecedorDTO";
import { ITagDTO } from "@modules/omie/dtos/ITagDTO";
import { TagClienteFornecedor } from "@modules/omie/infra/typeorm/entities/TagClienteFornecedor";
import { Tags } from "@modules/omie/infra/typeorm/entities/Tags";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { CaracteristicaClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/CaracteristicaClienteFornecedorRepository";
import { ClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/ClienteFornecedorRepository";
import { TagClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/TagClienteFornecedorRepository";
import { TagRepository } from "@modules/omie/infra/typeorm/repositories/TagRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { onlyNumbers } from "@utils/regex";

@injectable()
class ClienteFornecedorOmieServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private clienteFornecedorRepository: ClienteFornecedorRepository;
  private tokenEmpresaRepository: TokenEmpresaRepository;
  private tagClienteFornecedorRepository: TagClienteFornecedorRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private tagRepository: TagRepository;
  private caracteristicaClienteFornecedorRepository: CaracteristicaClienteFornecedorRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private page = 1;
  private totalPaginas: number;
  private appKey: string;
  private appSecret: string;
  private dataExec: string;
  private dataDefault = "2020-01-01T00:00:00";

  async execute() {
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.clienteFornecedorRepository = container.resolve(
      ClienteFornecedorRepository
    );
    this.caracteristicaClienteFornecedorRepository = container.resolve(
      CaracteristicaClienteFornecedorRepository
    );
    this.tagRepository = container.resolve(TagRepository);
    this.tagClienteFornecedorRepository = container.resolve(
      TagClienteFornecedorRepository
    );
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);

    this.dataExec = this.dateProvider.convertToUTC(this.dateProvider.dateNow());
    this.tokens = await this.tokenEmpresaRepository.findAll(true);

    this.tokens.forEach(async (token) => {
      this.appKey = token.appkey;
      this.appSecret = token.appsecret;
      const body = {
        ID_Empresa: token.empresaid,
        appKey: this.appKey,
        appSecret: this.appSecret,
      } as ITokensEmpresaDTO;
      this.bodys.push(body);
    });

    (async () => {
      for (const body of this.bodys) {
        const { appKey: app_key, appSecret: app_secret, ID_Empresa } = body;

        const ultimaExecucao = await this.ultimaExecucao.findByEmpresa(
          ID_Empresa,
          "cliente_fornecedor",
          OmieCall.ListarClientes
        );

        const { data } = ultimaExecucao;

        const filterData = this.dateProvider.filtroDate(data, this.dataExec);

        const param = [
          this.getParams(
            this.page,
            filterData[0],
            filterData[1],
            filterData[2],
            filterData[3]
          ),
        ];

        const bodyRequest = {
          call: OmieCall.ListarClientes,
          app_key,
          app_secret,
          param,
        } as IBodyOmieDTO;

        this.requestOmie(bodyRequest, OmieEndPoints.GetClientes)
          .then((resp) => {
            const { pagina, total_de_paginas, clientes_cadastro } = resp.data;

            if (clientes_cadastro) {
              this.criarClienteFornecedor(
                clientes_cadastro,
                ID_Empresa,
                app_key,
                app_secret
              );

              this.page = pagina;
              this.totalPaginas = total_de_paginas;
              if (this.page < this.totalPaginas) {
                this.pagination(
                  bodyRequest,
                  ID_Empresa,
                  app_key,
                  app_secret,
                  filterData
                );
              }
            }
          })
          .catch(async (error) => {
            const err = error as AxiosError;
            if (err.response) {
              const { faultstring, faultcode } = err.response.data;
              const {
                status,
                statusText,
                config: { url, data, baseURL, method },
              } = err.response;

              console.error({
                code: status,
                message: faultstring == null ? statusText : faultstring,
                faultcode,
                id_empresa: ID_Empresa,
                baseURL,
                method,
                url,
                data,
              });

              if (faultcode === "SOAP-ENV:Client-5113") {
                await this.ultimaExecucao.create({
                  id_empresa: ID_Empresa,
                  nome_api: OmieCall.ListarClientes,
                  objeto: "cliente_fornecedor",
                  data: this.dataExec,
                });
              } else {
                await this.ultimaExecucao.create({
                  id_empresa: ID_Empresa,
                  nome_api: OmieCall.ListarClientes,
                  objeto: "cliente_fornecedor",
                  data: "2020-01-01T00:00:00",
                });
              }
            } else if (err.request) {
              console.error(err.request.data);
            } else {
              console.error("Error", err.message);
            }
          });

        await this.ultimaExecucao.create({
          id_empresa: ID_Empresa,
          nome_api: OmieCall.ListarClientes,
          objeto: "cliente_fornecedor",
          data: this.dataExec,
        });
      }
    })();
  }

  async requestOmie(dobyRequest: IBodyOmieDTO, endPoint: OmieEndPoints) {
    const responseOmie = await this.apiOmie.handlePost(endPoint, dobyRequest);

    return responseOmie;
  }

  async criarClienteFornecedor(
    clientes_cadastro: IClienteFornecedorDTO[],
    empresaId: number,
    app_key: string,
    app_secret: string
  ) {
    (async () => {
      for (const cf of clientes_cadastro) {
        const clienteFornecedor = cf;

        const { caracteristicas } = cf;
        const { tags } = cf;
        const { recomendacoes } = cf;
        const { enderecoEntrega } = cf;
        const { dadosBancarios } = cf;
        const {
          cnpj_cpf,
          telefone1_ddd,
          telefone1_numero,
          cep,
          inscricao_estadual,
          inscricao_municipal,
        } = cf;

        clienteFornecedor.cnpj_cpf = onlyNumbers(cnpj_cpf);
        clienteFornecedor.telefone1_ddd = onlyNumbers(telefone1_ddd);
        clienteFornecedor.telefone1_numero = onlyNumbers(telefone1_numero);
        clienteFornecedor.cep = onlyNumbers(cep);
        clienteFornecedor.inscricao_estadual = onlyNumbers(inscricao_estadual);
        clienteFornecedor.inscricao_municipal =
          onlyNumbers(inscricao_municipal);

        if (tags) {
          await new Promise((r) => setTimeout(r, 5000));
          this.criartagsClientes(cf, app_key, app_secret, empresaId);
        }

        if (caracteristicas) {
          this.criarCaracteristica(
            caracteristicas,
            clienteFornecedor.codigo_cliente_omie,
            empresaId
          );
        }

        const { dInc, hInc, uInc, dAlt, hAlt, uAlt, cImpAPI } = cf.info;

        clienteFornecedor.info_usuario_inclusao = uInc;
        clienteFornecedor.info_usuario_alteracao = uAlt;
        clienteFornecedor.info_importado_api = cImpAPI;
        clienteFornecedor.info_data_inclusao = this.dateProvider.setDateOnly(
          dInc,
          hInc
        );
        clienteFornecedor.info_data_alteracao = this.dateProvider.setDateOnly(
          dAlt,
          hAlt
        );

        clienteFornecedor.recomendacoes_codigo_transportadora =
          recomendacoes.codigo_transportadora;
        clienteFornecedor.recomendacoes_codigo_vendedor =
          recomendacoes.codigo_vendedor;
        clienteFornecedor.recomendacoes_gerar_boletos =
          recomendacoes.gerar_boletos;
        clienteFornecedor.recomendacoes_numero_parcelas =
          recomendacoes.numero_parcelas;
        clienteFornecedor.recomnedacoes_email_fatura =
          recomendacoes.email_fatura;

        clienteFornecedor.enderentrega_entBairro = enderecoEntrega.entBairro;
        clienteFornecedor.enderentrega_entCEP = enderecoEntrega.entCEP;
        clienteFornecedor.enderentrega_entCidade = enderecoEntrega.entCidade;
        clienteFornecedor.enderentrega_entCnpjCpf = enderecoEntrega.entCnpjCpf;
        clienteFornecedor.enderentrega_entComplemento =
          enderecoEntrega.entComplemento;
        clienteFornecedor.enderentrega_entEndereco =
          enderecoEntrega.entEndereco;
        clienteFornecedor.enderentrega_entEstado = enderecoEntrega.entEstado;
        clienteFornecedor.enderentrega_entIE = enderecoEntrega.entIE;
        clienteFornecedor.enderentrega_entNumero = enderecoEntrega.entNumero;
        clienteFornecedor.enderentrega_entRazaoSocial =
          enderecoEntrega.entRazaoSocial;
        clienteFornecedor.enderentrega_entSepararEndereco =
          enderecoEntrega.entSepararEndereco;
        clienteFornecedor.enderentrega_entTelefone =
          enderecoEntrega.entTelefone;

        clienteFornecedor.dadosBancarios_agencia = dadosBancarios.agencia;
        clienteFornecedor.dadosBancarios_codigo_banco =
          dadosBancarios.codigo_banco;
        clienteFornecedor.dadosBancarios_conta_corrente =
          dadosBancarios.conta_corrente;
        clienteFornecedor.dadosBancarios_doc_titular =
          dadosBancarios.doc_titular;
        clienteFornecedor.dadosBancarios_nome_titular =
          dadosBancarios.nome_titular;

        clienteFornecedor.ID_Empresa = empresaId;

        objectKeys({ mode: "lowecase" })({
          clienteFornecedor,
        });

        await this.clienteFornecedorRepository.create(clienteFornecedor);

        await this.ultimaExecucao.create({
          id_empresa: empresaId,
          nome_api: OmieCall.ListarClientes,
          objeto: "cliente_fornecedor",
          data: this.dataExec,
        });
      }
    })();
  }

  async criarCaracteristica(
    caracteristicas: ICaracteristicaClienteFornecedorDTO[],
    codigo_cliente_omie: number,
    ID_Empresa: number
  ) {
    caracteristicas.forEach(async (caract) => {
      const caracteristica = caract;

      caracteristica.ID_Empresa = ID_Empresa;
      caracteristica.codigo_cliente_omie = codigo_cliente_omie;

      objectKeys({ mode: "lowecase" })({
        caracteristica,
      });

      await this.caracteristicaClienteFornecedorRepository.create(
        caracteristica
      );

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarClientes,
        objeto: "caracteristica_cliente_fornecedor",
        data: this.dataExec,
      });
    });
  }

  async criarTag(ID_Empresa: number, clienteFornecedor: IClienteFornecedorDTO) {
    const {
      codigo_cliente_integracao: cCodIntCliente,
      codigo_cliente_omie: nCodCliente,
    } = clienteFornecedor;

    if (cCodIntCliente && nCodCliente) {
      const bodyRequestTags = {
        call: OmieCall.ListarTags,
        app_key: this.appKey,
        app_secret: this.appSecret,
        param: [
          {
            nCodCliente,
          },
        ],
      } as IBodyOmieDTO;

      await this.requestOmie(bodyRequestTags, OmieEndPoints.GetClienteTags)
        .then((resp) => {
          const newTags = [] as ITagDTO[];
          const { tagsLista } = resp.data;

          if (tagsLista) {
            const tagsCliente = tagsLista as ITagDTO[];
            const newArray = tagsCliente
              .map((tagCliente: ITagDTO) => {
                const { nCodTag, tag } = tagCliente;
                const tagDTO = {
                  ID_Empresa,
                  nCodTag,
                  tag,
                } as ITagDTO;

                return tagDTO;
              })
              .filter((tagCliente) => {
                const exists = newTags.filter(
                  (t) =>
                    t.ID_Empresa === tagCliente.ID_Empresa &&
                    t.nCodTag === tagCliente.nCodTag
                );
                if (!exists) {
                  newTags.push(tagCliente);
                }

                return newTags;
              });

            newArray.forEach(async (t: ITagDTO) => {
              const { ID_Empresa, nCodTag, tag } = t;
              const tagFornecedor = new TagClienteFornecedor();
              tagFornecedor.id_empresa = ID_Empresa;
              tagFornecedor.codigo_cliente_omie = nCodCliente;
              tagFornecedor.ncodtag = nCodTag;

              objectKeys({ mode: "lowecase" })({
                tagFornecedor,
              });

              await this.tagClienteFornecedorRepository.create(tagFornecedor);

              const tagAtual = t as Tags;
              tagAtual.tag = tag;

              objectKeys({ mode: "lowecase" })({
                tagAtual,
              });

              await this.tagRepository.create(tagAtual);
            });
          }
        })
        .catch((error) => {
          const err = error as AxiosError;
          if (err.response) {
            const { faultstring } = err.response.data;
            const {
              status,
              statusText,
              config: { url, data, baseURL, method },
            } = err.response;
            console.error({
              code: status,
              message: faultstring == null ? statusText : faultstring,
              id_empresa: ID_Empresa,
              baseURL,
              method,
              url,
              data,
            });
          } else if (err.request) {
            console.error(err.request.data);
          } else {
            console.error("Error", err.message);
          }
        });
    }
  }

  async pagination(
    bodyRequest: IBodyOmieDTO,
    ID_Empresa: number,
    app_key: string,
    app_secret: string,
    filterData: string[]
  ) {
    bodyRequest.param.splice(0, 1);
    this.page += 1;

    const param = this.getParams(
      this.page,
      filterData[0],
      filterData[1],
      filterData[2],
      filterData[3]
    );
    bodyRequest.param.push(param);

    if (this.page <= this.totalPaginas) {
      this.requestOmie(bodyRequest, OmieEndPoints.GetClientes)
        .then(async (resp) => {
          const { status } = resp;
          const { clientes_cadastro, total_de_paginas } = resp.data;

          this.pagination(
            bodyRequest,
            ID_Empresa,
            app_key,
            app_secret,
            filterData
          );
          console.log(status);

          this.totalPaginas = total_de_paginas;
          if (status === 200) {
            await this.criarClienteFornecedor(
              clientes_cadastro,
              ID_Empresa,
              app_key,
              app_secret
            );

            if (this.page < this.totalPaginas) {
              this.pagination(
                bodyRequest,
                ID_Empresa,
                app_key,
                app_secret,
                filterData
              );
            }
          }
        })
        .catch(async (error) => {
          const err = error as AxiosError;
          if (err.response) {
            const { faultstring, faultcode } = err.response.data;
            const {
              status,
              statusText,
              config: { url, data, baseURL, method },
            } = err.response;

            console.error({
              code: status,
              message: faultstring == null ? statusText : faultstring,
              faultcode,
              id_empresa: ID_Empresa,
              baseURL,
              method,
              url,
              data,
            });

            if (faultcode === "SOAP-ENV:Client-5113") {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarClientes,
                objeto: "cliente_fornecedor",
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarClientes,
                objeto: "cliente_fornecedor",
                data: "2020-01-01T00:00:00",
              });
            }
          } else if (err.request) {
            console.error(err.request.data);
          } else {
            console.error("Error", err.message);
          }
        });
    }
  }

  getParams(
    pagina: number,
    filtrar_por_data_de: string,
    filtrar_por_hora_de: string,
    filtrar_por_data_ate: string,
    filtrar_por_hora_ate: string
  ) {
    const param = {
      pagina,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      filtrar_por_data_de,
      filtrar_por_hora_de,
      filtrar_por_data_ate,
      filtrar_por_hora_ate,
    };

    return param;
  }

  criartagsClientes(
    cliente: IClienteFornecedorDTO,
    app_key: string,
    app_secret: string,
    id_empresa: number
  ) {
    const { codigo_cliente_omie: nCodCliente } = cliente;

    const bodyRequest = {
      call: OmieCall.ListarTags,
      app_key,
      app_secret,
      param: [{ nCodCliente }],
    } as IBodyOmieDTO;

    this.requestOmie(bodyRequest, OmieEndPoints.GetClienteTags)
      .then((resp) => {
        const { nCodCliente, tagsLista } = resp.data;
        const newTags = [] as ITagDTO[];
        if (tagsLista) {
          const tagsCliente = tagsLista as ITagDTO[];

          const listaTags = tagsCliente
            .map((tagCliente: ITagDTO) => {
              const { nCodTag, tag } = tagCliente;
              const ID_Empresa = id_empresa;
              const tagDTO = {
                ID_Empresa,
                nCodTag,
                tag,
                nCodCliente,
              } as ITagDTO;
              return tagDTO;
            })
            .filter((tagCliente) => {
              const exists = newTags.filter(
                (t) =>
                  t.ID_Empresa !== tagCliente.ID_Empresa &&
                  t.nCodTag !== tagCliente.nCodTag
              );
              if (exists) {
                newTags.push(tagCliente);
              }

              return newTags;
            });

          listaTags.forEach(async (t: ITagDTO) => {
            const { ID_Empresa, nCodTag, tag } = t;
            const tagFornecedor = new TagClienteFornecedor();
            tagFornecedor.id_empresa = ID_Empresa;
            tagFornecedor.codigo_cliente_omie = nCodCliente;
            tagFornecedor.ncodtag = nCodTag;
            objectKeys({ mode: "lowecase" })({
              tagFornecedor,
            });
            await this.tagClienteFornecedorRepository.create(tagFornecedor);

            await this.ultimaExecucao.create({
              id_empresa,
              nome_api: OmieCall.ListarTags,
              objeto: "tag_cliente_fornecedor",
              data: this.dataExec,
            });

            const tagAtual = t as Tags;
            tagAtual.tag = tag;
            objectKeys({ mode: "lowecase" })({
              tagAtual,
            });
            await this.tagRepository.create(tagAtual);

            await this.ultimaExecucao.create({
              id_empresa,
              nome_api: OmieCall.ListarTags,
              objeto: "tag",
              data: this.dataExec,
            });
          });
        }
      })
      .catch(async (error) => {
        const err = error as AxiosError;
        if (err.response) {
          const { faultstring, faultcode } = err.response.data;
          const {
            status,
            statusText,
            config: { url, data, baseURL, method },
          } = err.response;

          console.error({
            code: status,
            message: faultstring == null ? statusText : faultstring,
            faultcode,
            id_empresa,
            baseURL,
            method,
            url,
            data,
          });

          if (faultcode === "SOAP-ENV:Client-105") {
            await this.ultimaExecucao.create({
              id_empresa,
              nome_api: OmieCall.ListarTags,
              objeto: "tag",
              data: this.dataExec,
            });
          } else {
            await this.ultimaExecucao.create({
              id_empresa,
              nome_api: OmieCall.ListarTags,
              objeto: "tag",
              data: "2020-01-01T00:00:00",
            });
          }
        } else if (err.request) {
          console.error(err.request.data);
        } else {
          console.error("Error", err.message);
        }
      });
  }
}

export { ClienteFornecedorOmieServices };

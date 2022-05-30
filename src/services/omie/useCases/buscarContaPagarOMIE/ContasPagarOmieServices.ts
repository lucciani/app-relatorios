import { AxiosError } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { ICategoriaContaPagarDTO } from "@modules/omie/dtos/ICategoriaContaPagarDTO";
import { IContaPagarDTO } from "@modules/omie/dtos/IContaPagarDTO";
import { IDistribuicaoContaPagarDTO } from "@modules/omie/dtos/IDistribuicaoContaPagarDTO";
import { ILancamentoDetalheDTO } from "@modules/omie/dtos/ILancamentoDetalheDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { CategoriaContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/CategoriaContaPagarRepository";
import { ContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/ContaPagarRepository";
import { DistribuicaoContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/DistribuicaoContaPagarRepository";
import { LancamentoDetalheRepository } from "@modules/omie/infra/typeorm/repositories/LancamentoDetalheRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

@injectable()
class ContasPagarOmieServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private contaPagarRepository: ContaPagarRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private tokenEmpresaRepository: TokenEmpresaRepository;
  private distribuicaoContaPagar: DistribuicaoContaPagarRepository;
  private categoriaContaPagarRepository: CategoriaContaPagarRepository;
  private lancamentoDetalheRepository: LancamentoDetalheRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private page = 1;
  private totalPaginas: number;
  private data: string;
  private dataExec: string;

  async execute() {
    this.contaPagarRepository = container.resolve(ContaPagarRepository);
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
    this.lancamentoDetalheRepository = container.resolve(
      LancamentoDetalheRepository
    );
    this.categoriaContaPagarRepository = container.resolve(
      CategoriaContaPagarRepository
    );
    this.distribuicaoContaPagar = container.resolve(
      DistribuicaoContaPagarRepository
    );
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.data = this.dateProvider.convertToUTC(this.dateProvider.dateNow());
    this.tokens = await this.tokenEmpresaRepository.findAll(true);

    this.tokens.forEach(async (token) => {
      const body = {
        ID_Empresa: token.empresaid,
        appKey: token.appkey,
        appSecret: token.appsecret,
      } as ITokensEmpresaDTO;

      this.bodys.push(body);
    });

    this.bodys.forEach(async (body) => {
      const { appKey: app_key, appSecret: app_secret, ID_Empresa } = body;

      this.dataExec = this.dateProvider.convertToUTC(
        this.dateProvider.dateNow()
      );

      const ultimaExecucao = await this.ultimaExecucao.findByEmpresa(
        ID_Empresa,
        "conta_pagar",
        OmieCall.ListarContasPagar
      );

      const { data } = ultimaExecucao;

      const filterData = this.dateProvider.filtroDate(data, this.dataExec);

      const param = [this.getParams(this.page, filterData[0], filterData[2])];

      const bodyRequest = {
        call: OmieCall.ListarContasPagar,
        app_key,
        app_secret,
        param,
      } as IBodyOmieDTO;

      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { total_de_paginas, conta_pagar_cadastro } = resp.data;

          console.log(status);

          this.totalPaginas = total_de_paginas;
          if (status === 200) {
            if (conta_pagar_cadastro) {
              this.criarContaPagar(conta_pagar_cadastro, ID_Empresa);

              if (this.page < this.totalPaginas) {
                this.pagination(bodyRequest, ID_Empresa, filterData);
              }
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
                nome_api: OmieCall.ListarContasPagar,
                objeto: "conta_pagar",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarContasPagar,
                objeto: "conta_pagar",
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
        nome_api: OmieCall.ListarContasPagar,
        objeto: "conta_pagar",
        data: this.data,
      });
    });
  }

  getParams(
    pagina: number,
    filtrar_por_data_de: string,
    filtrar_por_data_ate: string
  ) {
    const param = {
      pagina,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      filtrar_por_data_de,
      filtrar_por_data_ate,
    };

    return param;
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.ContaPagar,
      dobyRequest
    );

    return responseOmie;
  }

  async pagination(
    bodyRequest: IBodyOmieDTO,
    ID_Empresa: number,
    filterData: string[]
  ) {
    bodyRequest.param.splice(0, 1);
    this.page += 1;

    const param = this.getParams(this.page, filterData[0], filterData[2]);

    bodyRequest.param.push({
      param,
    });

    if (this.page <= this.totalPaginas) {
      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { conta_pagar_cadastro } = resp.data;

          console.log(status);

          if (status === 200) {
            if (conta_pagar_cadastro) {
              this.criarContaPagar(conta_pagar_cadastro, ID_Empresa);

              if (this.page < this.totalPaginas) {
                this.pagination(bodyRequest, ID_Empresa, filterData);
              }
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
                nome_api: OmieCall.ListarContasPagar,
                objeto: "conta_pagar",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarContasPagar,
                objeto: "conta_pagar",
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

  async criarContaPagar(
    conta_pagar_cadastro: IContaPagarDTO[],
    ID_Empresa: number
  ): Promise<void> {
    conta_pagar_cadastro.forEach(async (cp) => {
      const contaPagar = cp;

      const { distribuicao } = contaPagar;
      const { categorias } = contaPagar;
      const { lancamento_detalhe } = contaPagar;

      const { dInc, hInc, uInc, dAlt, hAlt, uAlt, cImpAPI } = cp.info;
      const { data_vencimento, data_previsao, data_emissao, data_entrada } = cp;

      contaPagar.info_usuario_inclusao = uInc;
      contaPagar.info_usuario_alteracao = uAlt;
      contaPagar.info_importado_api = cImpAPI;
      contaPagar.info_data_inclusao = this.dateProvider.setDateOnly(dInc, hInc);
      contaPagar.info_data_alteracao = this.dateProvider.setDateOnly(
        dAlt,
        hAlt
      );

      contaPagar.data_emissao = this.dateProvider.dateFormat(data_emissao);

      contaPagar.data_previsao = this.dateProvider.dateFormat(data_previsao);
      contaPagar.data_entrada = this.dateProvider.dateFormat(data_entrada);

      contaPagar.data_vencimento =
        this.dateProvider.dateFormat(data_vencimento);

      contaPagar.ID_Empresa = ID_Empresa;

      objectKeys({ mode: "lowecase" })({
        contaPagar,
      });

      await this.contaPagarRepository.create(contaPagar);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: "conta_pagar",
        data: this.data,
      });

      if (distribuicao) {
        this.criarDistribuicao(
          distribuicao,
          contaPagar.codigo_lancamento_omie,
          ID_Empresa
        );
      }

      if (categorias) {
        this.criarCategoria(
          categorias,
          contaPagar.codigo_lancamento_omie,
          ID_Empresa
        );
      }

      if (lancamento_detalhe) {
        this.criarLancamento(
          lancamento_detalhe,
          contaPagar.codigo_lancamento_omie,
          ID_Empresa
        );
      }
    });
  }

  async criarDistribuicao(
    distribuicoes: IDistribuicaoContaPagarDTO[],
    codigo_lancamento_omie: number,
    ID_Empresa: number
  ): Promise<void> {
    distribuicoes.forEach(async (dist) => {
      const distribuicao = dist;

      distribuicao.ID_Empresa = ID_Empresa;
      distribuicao.codigo_lancamento_omie = codigo_lancamento_omie;

      objectKeys({ mode: "lowecase" })({
        distribuicao,
      });

      await this.distribuicaoContaPagar.create(distribuicao);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: "distribuicao_conta_pagar",
        data: this.data,
      });
    });
  }

  async criarCategoria(
    categorias: ICategoriaContaPagarDTO[],
    codigo_lancamento_omie: number,
    ID_Empresa: number
  ): Promise<void> {
    categorias.forEach(async (cat) => {
      const categoria = cat;

      categoria.ID_Empresa = ID_Empresa;
      categoria.codigo_lancamento_omie = codigo_lancamento_omie;

      objectKeys({ mode: "lowecase" })({
        categoria,
      });

      await this.categoriaContaPagarRepository.create(categoria);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: "categoria_conta_pagar",
        data: this.data,
      });
    });
  }

  async criarLancamento(
    lancamentos: ILancamentoDetalheDTO[],
    codigo_lancamento: number,
    ID_Empresa: number
  ): Promise<void> {
    lancamentos.forEach(async (lanc) => {
      const lancamento = lanc;

      lancamento.ID_Empresa = ID_Empresa;
      lancamento.codigo_lancamento = codigo_lancamento;

      objectKeys({ mode: "lowecase" })({
        lancamento,
      });

      await this.lancamentoDetalheRepository.create(lancamento);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasPagar,
        objeto: "lancamento_detalhe",
        data: this.data,
      });
    });
  }
}

export { ContasPagarOmieServices };

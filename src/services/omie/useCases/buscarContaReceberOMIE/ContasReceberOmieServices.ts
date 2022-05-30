import { AxiosError } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { ICategoriaContaReceberDTO } from "@modules/omie/dtos/ICategoriaContaReceberDTO";
import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { IDistriuicaoContaReceberDTO } from "@modules/omie/dtos/IDistribuicaoContaReceberDTO";
import { ILancamentoDetalheDTO } from "@modules/omie/dtos/ILancamentoDetalheDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { CategoriaContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/CategoriaContaReceberRepository";
import { ContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/ContaReceberRepository";
import { DistribuicaoContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/DistribuicaoContaReceberRepository";
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
class ContasReceberOmieServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private contaReceberRepository: ContaReceberRepository;
  private tokenEmpresaRepository: TokenEmpresaRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private distribuicaoContaReceber: DistribuicaoContaReceberRepository;
  private categoriaContaReceberRepository: CategoriaContaReceberRepository;
  private lancamentoDetalheRepository: LancamentoDetalheRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private page = 1;
  private totalPaginas: number;
  private data: string;
  private dataExec: string;

  async execute() {
    this.contaReceberRepository = container.resolve(ContaReceberRepository);
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.distribuicaoContaReceber = container.resolve(
      DistribuicaoContaReceberRepository
    );
    this.categoriaContaReceberRepository = container.resolve(
      CategoriaContaReceberRepository
    );
    this.lancamentoDetalheRepository = container.resolve(
      LancamentoDetalheRepository
    );
    this.data = this.dateProvider.convertToUTC(this.dateProvider.dateNow());
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
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
        "conta_receber",
        OmieCall.ListarContasReceber
      );

      const { data } = ultimaExecucao;

      const filterData = this.dateProvider.filtroDate(data, this.dataExec);

      const param = [this.getParams(this.page, filterData[0], filterData[2])];

      const bodyRequest = {
        call: OmieCall.ListarContasReceber,
        app_key,
        app_secret,
        param,
      } as IBodyOmieDTO;

      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { pagina, total_de_paginas, conta_receber_cadastro } =
            resp.data;
          console.log(status);

          if (status === 200) {
            if (conta_receber_cadastro) {
              this.criarContaReceber(conta_receber_cadastro, ID_Empresa);

              this.page = pagina;
              this.totalPaginas = total_de_paginas;

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
                nome_api: OmieCall.ListarContasReceber,
                objeto: "conta_receber",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarContasReceber,
                objeto: "conta_receber",
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
        nome_api: OmieCall.ListarContasReceber,
        objeto: "conta_receber",
        data: this.data,
      });
    });
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.ContaReceber,
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
          const { conta_receber_cadastro, total_de_paginas } = resp.data;
          console.log(status);

          if (status === 200) {
            if (conta_receber_cadastro) {
              this.criarContaReceber(conta_receber_cadastro, ID_Empresa);
              this.totalPaginas = total_de_paginas;

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
                nome_api: OmieCall.ListarContasReceber,
                objeto: "conta_receber",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarContasReceber,
                objeto: "conta_receber",
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

  async criarContaReceber(
    conta_receber_cadastro: IContaReceberDTO[],
    empresaId: number
  ): Promise<void> {
    conta_receber_cadastro.forEach(async (cr) => {
      const contaReceber = cr;

      const { distribuicao } = contaReceber;
      const { categorias } = contaReceber;
      const { lancamento_detalhe } = contaReceber;

      const { dInc, hInc, uInc, dAlt, hAlt, uAlt, cImpAPI } = cr.info;
      const { data_vencimento, data_previsao, data_emissao, data_registro } =
        cr;

      const {
        cGerado,
        dDtEmBol,
        cNumBoleto,
        cNumBancario,
        nPerJuros,
        nPerMulta,
      } = cr.boleto;

      contaReceber.info_usuario_inclusao = uInc;
      contaReceber.info_usuario_alteracao = uAlt;
      contaReceber.info_importado_api = cImpAPI;
      contaReceber.info_data_inclusao = this.dateProvider.setDateOnly(
        dInc,
        hInc
      );
      contaReceber.info_data_alteracao = this.dateProvider.setDateOnly(
        dAlt,
        hAlt
      );

      contaReceber.cGerado = cGerado;
      contaReceber.dDtEmBol = dDtEmBol;
      contaReceber.cNumBoleto = cNumBoleto;
      contaReceber.cNumBancario = cNumBancario;
      contaReceber.nPerJuros = nPerJuros;
      contaReceber.nPerMulta = nPerMulta;

      contaReceber.data_emissao = this.dateProvider.dateFormat(data_emissao);

      contaReceber.data_previsao = this.dateProvider.dateFormat(data_previsao);

      contaReceber.data_registro = this.dateProvider.dateFormat(data_registro);

      contaReceber.data_vencimento =
        this.dateProvider.dateFormat(data_vencimento);

      contaReceber.ID_Empresa = empresaId;

      objectKeys({ mode: "lowecase" })({
        contaReceber,
      });

      await this.contaReceberRepository.create(contaReceber);

      await this.ultimaExecucao.create({
        id_empresa: empresaId,
        nome_api: OmieCall.ListarContasReceber,
        objeto: "conta_receber",
        data: this.data,
      });

      if (distribuicao) {
        this.criarDistribuicao(
          distribuicao,
          contaReceber.codigo_lancamento_omie,
          empresaId
        );
      }

      if (categorias) {
        this.criarCategoria(
          categorias,
          contaReceber.codigo_lancamento_omie,
          empresaId
        );
      }

      if (lancamento_detalhe) {
        this.criarLancamento(
          lancamento_detalhe,
          contaReceber.codigo_lancamento_omie,
          empresaId
        );
      }
    });
  }

  async criarDistribuicao(
    distribuicoes: IDistriuicaoContaReceberDTO[],
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

      await this.distribuicaoContaReceber.create(distribuicao);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: "distribuicao_conta_receber",
        data: this.data,
      });
    });
  }

  async criarCategoria(
    categorias: ICategoriaContaReceberDTO[],
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

      await this.categoriaContaReceberRepository.create(categoria);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarContasReceber,
        objeto: "categoria_conta_receber",
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
        nome_api: OmieCall.ListarContasReceber,
        objeto: "lancamento_detalhe",
        data: this.data,
      });
    });
  }

  getParams(
    pagina?: number,
    filtrar_por_data_de?: string,
    filtrar_por_data_ate?: string
  ): any {
    const param = {
      pagina,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      filtrar_por_data_de,
      filtrar_por_data_ate,
    };

    return param;
  }
}

export { ContasReceberOmieServices };

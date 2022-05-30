import { AxiosError, AxiosResponse } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { IDetalhesMovimentoFinanceiroDTO } from "@modules/omie/dtos/IDetalhesMovimentoFinanceiroDTO";
import { IMovimentoFinanceiroCategoriaDTO } from "@modules/omie/dtos/IMovimentoFinanceiroCategoriaDTO";
import { IMovimentoFinanceiroDepartamentoDTO } from "@modules/omie/dtos/IMovimentoFinanceiroDepartamentoDTO";
import { IMovimentoFinanceiroDTO } from "@modules/omie/dtos/IMovimentoFinanceiroDTO";
import { IResumoMovimentoFinanceiroDTO } from "@modules/omie/dtos/IResumoMovimentoFinanceiroDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { MovimentoFinanceiroCategoriaRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroCategoriaRepository";
import { MovimentoFinanceiroDepartamentoRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroDepartamentoRepository";
import { MovimentoFinanceiroRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroRepository";
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
class MovimentoFinanceiroServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private tokenEmpresaRepository: TokenEmpresaRepository;
  private movimentoFinanceiroRepository: MovimentoFinanceiroRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private movimentoFinanceiroDepartamentoRepository: MovimentoFinanceiroDepartamentoRepository;
  private movimentoFinanceiroCategoriaRepository: MovimentoFinanceiroCategoriaRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private nPagina = 1;
  private nTotPaginas: number;
  private responseOmie: AxiosResponse<any, any>;
  private data: string;
  private dataExec: string;

  constructor() {
    this.dateProvider = container.resolve(DayjsDateProvider);
  }

  async execute() {
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
    this.movimentoFinanceiroRepository = container.resolve(
      MovimentoFinanceiroRepository
    );
    this.movimentoFinanceiroDepartamentoRepository = container.resolve(
      MovimentoFinanceiroDepartamentoRepository
    );
    this.movimentoFinanceiroCategoriaRepository = container.resolve(
      MovimentoFinanceiroCategoriaRepository
    );
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
        "movimento_financeiro",
        OmieCall.ListarMovimentos
      );

      const { data } = ultimaExecucao;

      const filterData = this.dateProvider.filtroDate(data, this.dataExec);

      const param = [
        this.getParams(
          this.nPagina,
          filterData[0],
          filterData[2],
          filterData[0],
          filterData[2]
        ),
      ];

      const bodyRequest = {
        call: OmieCall.ListarMovimentos,
        app_key,
        app_secret,
        param,
      } as IBodyOmieDTO;

      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { movimentos, nTotPaginas } = resp.data;
          console.log(status);

          this.nTotPaginas = nTotPaginas;
          if (status === 200) {
            this.criarMovimentoFinanceiro(movimentos, ID_Empresa);

            if (this.nPagina < this.nTotPaginas) {
              this.pagination(bodyRequest, ID_Empresa, filterData);
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
                nome_api: OmieCall.ListarMovimentos,
                objeto: "movimento_financeiro",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarMovimentos,
                objeto: "movimento_financeiro",
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
        nome_api: OmieCall.ListarMovimentos,
        objeto: "movimento_financeiro",
        data: this.data,
      });
    });
  }

  async criarMovimentoFinanceiro(
    movimentos: IMovimentoFinanceiroDTO[],
    ID_Empresa: number
  ) {
    movimentos.forEach(async (movimento) => {
      const { detalhes, resumo, departamentos, categorias } = movimento;

      const {
        nCodTitulo,
        cCodIntTitulo,
        cNumTitulo,
        dDtEmissao,
        dDtVenc,
        dDtPrevisao,
        dDtPagamento,
        nCodCliente,
        cCPFCNPJCliente,
        nCodCtr,
        cNumCtr,
        nCodOS,
        cNumOS,
        nCodCC,
        cStatus,
        cNatureza,
        cTipo,
        cOperacao,
        cNumDocFiscal,
        cCodCateg,
        cNumParcela,
        nValorTitulo,
        nValorPIS,
        cRetPIS,
        nValorCOFINS,
        cRetCOFINS,
        nValorCSLL,
        cRetCSLL,
        nValorIR,
        cRetIR,
        nValorISS,
        cRetISS,
        nValorINSS,
        cRetINSS,
        cCodProjeto,
        observacao,
        cCodVendedor,
        nCodComprador,
        cCodigoBarras,
        cNSU,
        nCodNF,
        dDtRegistro,
        cNumBoleto,
        cChaveNFe,
        cOrigem,
        nCodTitRepet,
        cGrupo,
        nCodMovCC,
        nValorMovCC,
        nCodMovCCRepet,
        nDesconto: dnDesconto,
        nJuros: dnJuros,
        nMulta: dnMulta,
        nCodBaixa,
        dDtCredito,
        dDtConcilia,
        cHrConcilia,
        cUsConcilia,
        dDtInc,
        cHrInc,
        cUsInc,
        dDtAlt,
        cHrAlt,
        cUstAlt,
      } = detalhes as IDetalhesMovimentoFinanceiroDTO;

      const {
        cLiquidado,
        nValPago,
        nValAberto,
        nDesconto,
        nJuros,
        nMulta,
        nValLiquido,
      } = resumo as IResumoMovimentoFinanceiroDTO;

      const movimentoFinanceiro = movimento;

      movimentoFinanceiro.nCodTitulo = nCodTitulo;
      movimentoFinanceiro.nCodBaixa = nCodBaixa;
      movimentoFinanceiro.cCodIntTitulo = cCodIntTitulo;
      movimentoFinanceiro.cNumTitulo = cNumTitulo;
      movimentoFinanceiro.nCodCliente = nCodCliente;
      movimentoFinanceiro.cCPFCNPJCliente = onlyNumbers(cCPFCNPJCliente);
      movimentoFinanceiro.nCodCtr = nCodCtr;
      movimentoFinanceiro.cNumCtr = cNumCtr;
      movimentoFinanceiro.nCodOS = nCodOS;
      movimentoFinanceiro.cNumOS = cNumOS;
      movimentoFinanceiro.nCodCC = nCodCC;
      movimentoFinanceiro.cStatus = cStatus;
      movimentoFinanceiro.cNatureza = cNatureza;
      movimentoFinanceiro.cTipo = cTipo;
      movimentoFinanceiro.cOperacao = cOperacao;
      movimentoFinanceiro.cNumDocFiscal = cNumDocFiscal;
      movimentoFinanceiro.cCodCateg = cCodCateg;
      movimentoFinanceiro.cNumParcela = cNumParcela;
      movimentoFinanceiro.nValorTitulo = nValorTitulo;
      movimentoFinanceiro.nValorPIS = nValorPIS;
      movimentoFinanceiro.cRetPIS = cRetPIS;
      movimentoFinanceiro.nValorCOFINS = nValorCOFINS;
      movimentoFinanceiro.cRetCOFINS = cRetCOFINS;
      movimentoFinanceiro.nValorCSLL = nValorCSLL;
      movimentoFinanceiro.cRetCSLL = cRetCSLL;
      movimentoFinanceiro.nValorIR = nValorIR;
      movimentoFinanceiro.cRetIR = cRetIR;
      movimentoFinanceiro.nValorISS = nValorISS;
      movimentoFinanceiro.cRetISS = cRetISS;
      movimentoFinanceiro.nValorINSS = nValorINSS;
      movimentoFinanceiro.cRetINSS = cRetINSS;
      movimentoFinanceiro.cCodProjeto = cCodProjeto;
      movimentoFinanceiro.observacao = observacao;
      movimentoFinanceiro.nCodComprador = nCodComprador;
      movimentoFinanceiro.cCodigoBarras = cCodigoBarras;
      movimentoFinanceiro.cNSU = cNSU;
      movimentoFinanceiro.nCodNF = nCodNF;
      movimentoFinanceiro.cNumBoleto = cNumBoleto;
      movimentoFinanceiro.cChaveNFe = cChaveNFe;
      movimentoFinanceiro.cOrigem = cOrigem;
      movimentoFinanceiro.nCodTitRepet = nCodTitRepet;
      movimentoFinanceiro.cGrupo = cGrupo;
      movimentoFinanceiro.nCodMovCC = nCodMovCC;
      movimentoFinanceiro.nValorMovCC = nValorMovCC;
      movimentoFinanceiro.nCodMovCCRepet = nCodMovCCRepet;
      movimentoFinanceiro.nDesconto = dnDesconto;
      movimentoFinanceiro.nJuros = dnJuros;
      movimentoFinanceiro.nMulta = dnMulta;
      movimentoFinanceiro.cUsConcilia = cUsConcilia;
      movimentoFinanceiro.cCodVendedor = cCodVendedor;
      movimentoFinanceiro.cUsInc = cUsInc;
      movimentoFinanceiro.cUstAlt = cUstAlt;

      movimentoFinanceiro.dDtConcilia = this.dateProvider.setDateOnly(
        dDtConcilia,
        cHrConcilia
      );

      movimentoFinanceiro.dDtInc = this.dateProvider.setDateOnly(
        dDtInc,
        cHrInc
      );

      movimentoFinanceiro.dDtAlt = this.dateProvider.setDateOnly(
        dDtAlt,
        cHrAlt
      );

      movimentoFinanceiro.dDtEmissao =
        dDtEmissao === undefined
          ? null
          : this.dateProvider.dateFormat(dDtEmissao);
      movimentoFinanceiro.dDtVenc =
        dDtVenc === undefined ? null : this.dateProvider.dateFormat(dDtVenc);
      movimentoFinanceiro.dDtPrevisao =
        dDtPrevisao === undefined
          ? null
          : this.dateProvider.dateFormat(dDtPrevisao);
      movimentoFinanceiro.dDtPagamento =
        dDtPagamento === undefined
          ? null
          : this.dateProvider.dateFormat(dDtPagamento);
      movimentoFinanceiro.dDtRegistro =
        dDtRegistro === undefined
          ? null
          : this.dateProvider.dateFormat(dDtRegistro);
      movimentoFinanceiro.dDtCredito =
        dDtCredito === undefined
          ? null
          : this.dateProvider.dateFormat(dDtCredito);

      movimentoFinanceiro.resumo_cLiquidado = cLiquidado;
      movimentoFinanceiro.resumo_nValPago = nValPago;
      movimentoFinanceiro.resumo_nValAberto = nValAberto;
      movimentoFinanceiro.resumo_nDesconto = nDesconto;
      movimentoFinanceiro.resumo_nJuros = nJuros;
      movimentoFinanceiro.resumo_nMulta = nMulta;
      movimentoFinanceiro.resumo_nValLiquido = nValLiquido;

      movimentoFinanceiro.ID_Empresa = ID_Empresa;

      objectKeys({ mode: "lowecase" })({
        movimentoFinanceiro,
      });

      await this.movimentoFinanceiroRepository.create(movimentoFinanceiro);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarMovimentos,
        objeto: "movimento_financeiro",
        data: this.data,
      });

      const movimentoFinanceiroDepartamento =
        departamentos as IMovimentoFinanceiroDepartamentoDTO[];

      const movimentoFinanceiroCategoria =
        categorias as IMovimentoFinanceiroCategoriaDTO[];

      this.criarMovimentoFinanceiroDepartamento(
        movimentoFinanceiroDepartamento,
        ID_Empresa,
        nCodTitulo
      );

      this.criarMovimentoFinanceiroCategoria(
        movimentoFinanceiroCategoria,
        ID_Empresa,
        nCodTitulo
      );
    });
  }

  async criarMovimentoFinanceiroCategoria(
    movimentoFinanceiroCategoria: IMovimentoFinanceiroCategoriaDTO[],
    ID_Empresa: number,
    nCodTitulo: number
  ) {
    if (movimentoFinanceiroCategoria) {
      movimentoFinanceiroCategoria.forEach(async (movFin) => {
        const movimentoFinanceiroCat = movFin;

        movimentoFinanceiroCat.ID_Empresa = ID_Empresa;
        movimentoFinanceiroCat.nCodTitulo = nCodTitulo;

        objectKeys({ mode: "lowecase" })({
          movimentoFinanceiroCat,
        });

        this.movimentoFinanceiroCategoriaRepository.create(
          movimentoFinanceiroCat
        );

        await this.ultimaExecucao.create({
          id_empresa: ID_Empresa,
          nome_api: OmieCall.ListarMovimentos,
          objeto: "movimento_financeiro_categoria",
          data: this.data,
        });
      });
    }
  }

  async criarMovimentoFinanceiroDepartamento(
    movimentosFinanceiroDepartamento: IMovimentoFinanceiroDepartamentoDTO[],
    ID_Empresa: number,
    nCodTitulo: number
  ) {
    if (movimentosFinanceiroDepartamento) {
      movimentosFinanceiroDepartamento.forEach(async (movFin) => {
        const movimentoFinanceiroDep = movFin;

        movimentoFinanceiroDep.ID_Empresa = ID_Empresa;
        movimentoFinanceiroDep.nCodTitulo = nCodTitulo;

        objectKeys({ mode: "lowecase" })({
          movimentoFinanceiroDep,
        });

        this.movimentoFinanceiroDepartamentoRepository.create(
          movimentoFinanceiroDep
        );

        await this.ultimaExecucao.create({
          id_empresa: ID_Empresa,
          nome_api: OmieCall.ListarMovimentos,
          objeto: "movimento_financeiro_departamento",
          data: this.data,
        });
      });
    }
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.GetMovimentoFinanceiro,
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
    this.nPagina += 1;

    const param = this.getParams(
      this.nPagina,
      filterData[0],
      filterData[2],
      filterData[0],
      filterData[2]
    );

    bodyRequest.param.push({
      param,
    });

    if (this.nPagina <= this.nTotPaginas) {
      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { movimentos, nTotPaginas } = resp.data;
          console.log(status);

          this.nTotPaginas = nTotPaginas;
          if (status === 200) {
            this.criarMovimentoFinanceiro(movimentos, ID_Empresa);

            if (this.nPagina < this.nTotPaginas) {
              this.pagination(bodyRequest, ID_Empresa, filterData);
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
                nome_api: OmieCall.ListarMovimentos,
                objeto: "movimento_financeiro",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarMovimentos,
                objeto: "movimento_financeiro",
                data: "2020-01-01T00:00:00",
              });
            }
          } else if (err.request) {
            console.error(err.request.data);
          } else {
            console.error("Error", err.message);
          }
        });

      // this.pagination(bodyRequest, ID_Empresa);
    }
  }

  getParams(
    numPagina?: number,
    dDtIncDe?: string,
    dDtIncAte?: string,
    dDtAltDe?: string,
    dDtAltAte?: string
  ): any {
    const param = {
      nPagina: numPagina,
      nRegPorPagina: 500,
      cTpLancamento: "CPCR",
      dDtIncDe,
      dDtIncAte,
      dDtAltDe,
      dDtAltAte,
    };

    return param;
  }
}

export { MovimentoFinanceiroServices };

import { AxiosError } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { ICabecalhoConsultaDTO } from "@modules/omie/dtos/ICabecalhoConsultaDTO";
import { IFreteConsultaDTO } from "@modules/omie/dtos/IFreteConsultaDTO";
import { IItemPedidoCompraDTO } from "@modules/omie/dtos/IItemPedidoCompraDTO";
import { IParcelaPedidoCompraDTO } from "@modules/omie/dtos/IParcelaPedidoCompraDTO";
import { IPedidoCompraDepartamentoDTO } from "@modules/omie/dtos/IPedidoCompraDepartamentoDTO";
import { IPedidoCompraDTO } from "@modules/omie/dtos/IPedidoCompraDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { ItemPedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/ItemPedidoCompraRepository";
import { ParcelaPedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/ParcelaPedidoCompraRepository";
import { PedidoCompraDepartamentoRepository } from "@modules/omie/infra/typeorm/repositories/PedidoCompraDepartamentoRepository";
import { PedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/PedidoCompraRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

@injectable()
class PedidoCompraOmieServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private pedidoCompraRepository: PedidoCompraRepository;
  private itemPedidoCompraRepository: ItemPedidoCompraRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private parcelaPedidoCompraRepository: ParcelaPedidoCompraRepository;
  private pedidoCompraDepartamentoRepository: PedidoCompraDepartamentoRepository;
  private tokenEmpresaRepository: TokenEmpresaRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private nPagina = 1;
  private nTotalPaginas: number;
  private data: string;
  private dataExec: string;

  constructor() {
    this.dateProvider = container.resolve(DayjsDateProvider);
  }

  async execute() {
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
    this.pedidoCompraRepository = container.resolve(PedidoCompraRepository);
    this.itemPedidoCompraRepository = container.resolve(
      ItemPedidoCompraRepository
    );
    this.parcelaPedidoCompraRepository = container.resolve(
      ParcelaPedidoCompraRepository
    );
    this.pedidoCompraDepartamentoRepository = container.resolve(
      PedidoCompraDepartamentoRepository
    );
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
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
        "pedido_compra",
        OmieCall.PesquisarPedCompra
      );

      const { data } = ultimaExecucao;

      const filterData = this.dateProvider.filtroDate(data, this.dataExec);

      const param = [
        this.getParams(this.nPagina, filterData[0], filterData[2]),
      ];

      const bodyRequest = {
        call: OmieCall.PesquisarPedCompra,
        app_key,
        app_secret,
        param,
      } as IBodyOmieDTO;

      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { pedidos_pesquisa, nTotalPaginas } = resp.data;
          console.log(status);

          this.nTotalPaginas = nTotalPaginas;
          if (status === 200) {
            this.criarPedidoCompra(pedidos_pesquisa, ID_Empresa);

            if (this.nPagina < this.nTotalPaginas) {
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
                nome_api: OmieCall.PesquisarPedCompra,
                objeto: "pedido_compra",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.PesquisarPedCompra,
                objeto: "pedido_compra",
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
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: "pedido_compra",
        data: this.data,
      });
    });
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.GetPedidoCompra,
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

    const param = this.getParams(this.nPagina, filterData[0], filterData[2]);

    bodyRequest.param.push({
      param,
    });

    if (this.nPagina <= this.nTotalPaginas) {
      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { pedidos_pesquisa, nTotalPaginas } = resp.data;
          console.log(status);

          this.nTotalPaginas = nTotalPaginas;
          if (status === 200) {
            this.criarPedidoCompra(pedidos_pesquisa, ID_Empresa);

            if (this.nPagina < this.nTotalPaginas) {
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
                nome_api: OmieCall.PesquisarPedCompra,
                objeto: "pedido_compra",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.PesquisarPedCompra,
                objeto: "pedido_compra",
                data: "2020-01-01T00:00:00",
              });
            }
          } else if (err.request) {
            console.error(err.request.data);
          } else {
            console.error("Error", err.message);
          }
        });

      // this.pagination(bodyRequest, empresaId);
    }
  }

  getParams(
    numPagina?: number,
    dDataInicial?: string,
    dDataFinal?: string
  ): any {
    const param = {
      nPagina: numPagina,
      nRegsPorPagina: 500,
      lApenasImportadoApi: "F",
      lExibirPedidosPendentes: "T",
      lExibirPedidosFaturados: "T",
      lExibirPedidosRecebidos: "T",
      lExibirPedidosCancelados: "T",
      lExibirPedidosEncerrados: "T",
      dDataInicial,
      dDataFinal,
      lApenasAlterados: "F",
    };

    return param;
  }
  async criarPedidoCompra(
    pedidos_pesquisa: IPedidoCompraDTO[],
    ID_Empresa: number
  ) {
    pedidos_pesquisa.forEach(async (pedidoPesquisa: IPedidoCompraDTO) => {
      const {
        cabecalho_consulta,
        frete_consulta,
        produtos_consulta,
        parcelas_consulta,
        departamentos_consulta,
      } = pedidoPesquisa;

      const {
        nCodPed,
        cCodIntPed,
        dIncData,
        cIncHora,
        cEtapa,
        cNumero,
        dDtPrevisao,
        cCodParc,
        nQtdeParc,
        nCodFor,
        cCodIntFor,
        cCodCateg,
        nCodCompr,
        cContato,
        nCodCC,
        nCodIntCC,
        nCodProj,
        cNumPedido,
        cObs,
        cObsInt,
      } = cabecalho_consulta as ICabecalhoConsultaDTO;

      const {
        nCodTransp,
        cCodIntTransp,
        cTpFrete,
        cPlaca,
        cUF,
        nQtdVol,
        cEspVol,
        cMarVol,
        cNumVol,
        nPesoLiq,
        nPesoBruto,
        nValFrete,
        nValSeguro,
        cLacre,
        ValOutras,
      } = frete_consulta as IFreteConsultaDTO;

      const pedidoCompra = pedidoPesquisa;
      pedidoCompra.nCodPed = nCodPed;
      pedidoCompra.cCodIntPed = cCodIntPed;
      pedidoCompra.cEtapa = cEtapa;
      pedidoCompra.cNumero = cNumero;
      pedidoCompra.cCodParc = cCodParc;
      pedidoCompra.nQtdeParc = nQtdeParc;
      pedidoCompra.nCodFor = nCodFor;
      pedidoCompra.cCodIntFor = cCodIntFor;
      pedidoCompra.cCodCateg = cCodCateg;
      pedidoCompra.nCodCompr = nCodCompr;
      pedidoCompra.cContato = cContato;
      pedidoCompra.nCodCC = nCodCC;
      pedidoCompra.nCodIntCC = nCodIntCC;
      pedidoCompra.nCodProj = nCodProj;
      pedidoCompra.cNumPedido = cNumPedido;
      pedidoCompra.cObs = cObs;
      pedidoCompra.cObsInt = cObsInt;

      pedidoCompra.frete_ValOutras = ValOutras;
      pedidoCompra.frete_cCodIntTransp = cCodIntTransp;
      pedidoCompra.frete_cTpFrete = cTpFrete;
      pedidoCompra.frete_cPlaca = cPlaca;
      pedidoCompra.frete_cUF = cUF;
      pedidoCompra.frete_nQtdVol = nQtdVol;
      pedidoCompra.frete_cEspVol = cEspVol;
      pedidoCompra.frete_cMarVol = cMarVol;
      pedidoCompra.frete_cNumVol = cNumVol;
      pedidoCompra.frete_nPesoLiq = nPesoLiq;
      pedidoCompra.frete_nPesoBruto = nPesoBruto;
      pedidoCompra.frete_nValFrete = nValFrete;
      pedidoCompra.frete_nValSeguro = nValSeguro;
      pedidoCompra.frete_cLacre = cLacre;
      pedidoCompra.frete_nCodTransp = nCodTransp;

      pedidoCompra.dIncData = this.dateProvider.setDateOnly(dIncData, cIncHora);
      pedidoCompra.dDtPrevisao = this.dateProvider.dateFormat(dDtPrevisao);

      pedidoCompra.ID_Empresa = ID_Empresa;

      objectKeys({ mode: "lowecase" })({
        pedidoCompra,
      });

      await this.pedidoCompraRepository.create(pedidoCompra);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: "pedido_compra",
        data: this.data,
      });

      await this.criarItemPedidoCompra(produtos_consulta, ID_Empresa, nCodPed);

      await this.criarParcelaPedidoCompra(
        parcelas_consulta,
        ID_Empresa,
        nCodPed
      );

      await this.pedidoCompraDepartamento(
        departamentos_consulta,
        ID_Empresa,
        nCodPed
      );
    });
  }

  async pedidoCompraDepartamento(
    departamentos_consulta: IPedidoCompraDepartamentoDTO[],
    ID_Empresa: number,
    nCodPed: number
  ) {
    departamentos_consulta.forEach(
      async (depConsul: IPedidoCompraDepartamentoDTO) => {
        const pedidoCompraDepartamento = depConsul;
        pedidoCompraDepartamento.ID_Empresa = ID_Empresa;
        pedidoCompraDepartamento.nCodPed = nCodPed;

        objectKeys({ mode: "lowecase" })({
          pedidoCompraDepartamento,
        });

        await this.pedidoCompraDepartamentoRepository.create(
          pedidoCompraDepartamento
        );

        await this.ultimaExecucao.create({
          id_empresa: ID_Empresa,
          nome_api: OmieCall.PesquisarPedCompra,
          objeto: "pedido_compra_departamento",
          data: this.data,
        });
      }
    );
  }

  async criarItemPedidoCompra(
    produtos_consulta: IItemPedidoCompraDTO[],
    ID_Empresa: number,
    nCodPed: number
  ) {
    produtos_consulta.forEach(async (prodCons: IItemPedidoCompraDTO) => {
      const itemPedidoCompra = prodCons;
      itemPedidoCompra.ID_Empresa = ID_Empresa;
      itemPedidoCompra.nCodPed = nCodPed;

      objectKeys({ mode: "lowecase" })({
        itemPedidoCompra,
      });

      await this.itemPedidoCompraRepository.create(itemPedidoCompra);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: "item_pedido_compra",
        data: this.data,
      });
    });
  }

  async criarParcelaPedidoCompra(
    parcelas_consulta: IParcelaPedidoCompraDTO[],
    ID_Empresa: number,
    nCodPed: number
  ) {
    parcelas_consulta.forEach(async (parcCons: IParcelaPedidoCompraDTO) => {
      const parcelaConsulta = parcCons;
      const { dVencto } = parcelaConsulta;
      parcelaConsulta.ID_Empresa = ID_Empresa;
      parcelaConsulta.nCodPed = nCodPed;

      if (!dVencto) {
        parcelaConsulta.dVencto = null;
      } else {
        parcelaConsulta.dVencto = this.dateProvider.dateFormat(dVencto);
      }

      objectKeys({ mode: "lowecase" })({
        parcelaConsulta,
      });

      await this.parcelaPedidoCompraRepository.create(parcelaConsulta);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.PesquisarPedCompra,
        objeto: "parcela_pedido_compra",
        data: this.data,
      });
    });
  }
}

export { PedidoCompraOmieServices };

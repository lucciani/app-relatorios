import { AxiosError, AxiosResponse } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { IDadosIbptDTO } from "@modules/omie/dtos/IDadosIbptDTO";
import { IInfoDTO } from "@modules/omie/dtos/IInfoDTO";
import { IProdutoDTO } from "@modules/omie/dtos/IProdutoDTO";
import { IRecomendacoesFiscaisDTO } from "@modules/omie/dtos/IRecomendacoesFiscaisDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { ProdutoRepository } from "@modules/omie/infra/typeorm/repositories/ProdutoRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

@injectable()
class ProdutoOmieServices {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private tokenEmpresaRepository: TokenEmpresaRepository;
  private produtoRepository: ProdutoRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private dateProvider: DayjsDateProvider;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private pagina = 1;
  private total_de_paginas: number;
  private responseOmie: AxiosResponse<any, any>;
  private data: string;
  private dataExec: string;

  constructor() {
    this.dateProvider = container.resolve(DayjsDateProvider);
  }

  async execute() {
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
    this.produtoRepository = container.resolve(ProdutoRepository);
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);
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

      const ultimaExecucao = await this.ultimaExecucao.findByEmpresa(
        ID_Empresa,
        "produto",
        OmieCall.ListarProdutos
      );

      const { data } = ultimaExecucao;

      this.dataExec = this.dateProvider.convertToUTC(
        this.dateProvider.dateNow()
      );

      const filterData = this.dateProvider.filtroDate(data, this.dataExec);

      const param = [
        this.getParams(
          this.pagina,
          filterData[0],
          filterData[1],
          filterData[2],
          filterData[3]
        ),
      ];

      const bodyRequest = {
        call: OmieCall.ListarProdutos,
        app_key,
        app_secret,
        param,
      } as IBodyOmieDTO;

      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { produto_servico_cadastro, total_de_paginas } = resp.data;
          console.log(status);

          this.total_de_paginas = total_de_paginas;
          if (status === 200) {
            this.criarProduto(produto_servico_cadastro, ID_Empresa);

            if (this.pagina < this.total_de_paginas) {
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
                nome_api: OmieCall.ListarProdutos,
                objeto: "produto",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarProdutos,
                objeto: "produto",
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
        nome_api: OmieCall.ListarProdutos,
        objeto: "produto",
        data: this.data,
      });
    });
  }

  async criarProduto(
    produto_servico_cadastro: IProdutoDTO[],
    ID_Empresa: number
  ) {
    produto_servico_cadastro.forEach(async (produtoServico: IProdutoDTO) => {
      const { dadosIbpt, info, recomendacoes_fiscais } = produtoServico;

      const {
        aliqFederal,
        aliqEstadual,
        aliqMunicipal,
        fonte,
        chave,
        versao,
        valido_de,
        valido_ate,
      } = dadosIbpt as IDadosIbptDTO;

      const { dInc, hInc, uInc, dAlt, hAlt, uAlt, cImpAPI } = info as IInfoDTO;

      const {
        cnpj_fabricante,
        cupom_fiscal,
        id_cest,
        id_preco_tabelado,
        indicador_escala,
        market_place,
        origem_mercadoria,
      } = recomendacoes_fiscais as IRecomendacoesFiscaisDTO;

      const produto = produtoServico;

      produto.info_dInc = this.dateProvider.setDateOnly(dInc, hInc);
      produto.info_dAlt = this.dateProvider.setDateOnly(dAlt, hAlt);
      produto.info_uInc = uInc;
      produto.info_uAlt = uAlt;
      produto.cImpAPI = cImpAPI;

      produto.dadosIbpt_valido_ate =
        valido_ate === "" ? null : this.dateProvider.dateFormat(valido_ate);
      produto.dadosIbpt_valido_de =
        valido_de === "" ? null : this.dateProvider.dateFormat(valido_de);
      produto.dadosIbpt_aliqEstadual = aliqEstadual;
      produto.dadosIbpt_aliqFederal = aliqFederal;
      produto.dadosIbpt_aliqMunicipal = aliqMunicipal;
      produto.dadosIbpt_chave = chave;
      produto.dadosIbpt_fonte = fonte;
      produto.dadosIbpt_versao = versao;

      produto.cnpj_fabricante = cnpj_fabricante;
      produto.cupom_fiscal = cupom_fiscal;
      produto.id_cest = id_cest;
      produto.id_preco_tabelado = id_preco_tabelado;
      produto.indicador_escala = indicador_escala;
      produto.market_place = market_place;
      produto.origem_mercadoria = origem_mercadoria;

      produto.ID_Empresa = ID_Empresa;

      objectKeys({ mode: "lowecase" })({
        produto,
      });

      await this.produtoRepository.create(produto);

      await this.ultimaExecucao.create({
        id_empresa: ID_Empresa,
        nome_api: OmieCall.ListarProdutos,
        objeto: "produto",
        data: this.data,
      });
    });
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.GetProdutos,
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
    this.pagina += 1;

    const param = this.getParams(
      this.pagina,
      filterData[0],
      filterData[1],
      filterData[2],
      filterData[3]
    );

    bodyRequest.param.push({
      param,
    });

    if (this.pagina <= this.total_de_paginas) {
      this.requestOmie(bodyRequest)
        .then((resp) => {
          const { status } = resp;
          const { produto_servico_cadastro, total_de_paginas } = resp.data;
          console.log(status);

          this.total_de_paginas = total_de_paginas;
          if (status === 200) {
            this.criarProduto(produto_servico_cadastro, ID_Empresa);

            if (this.pagina < this.total_de_paginas) {
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
                nome_api: OmieCall.ListarProdutos,
                objeto: "produto",
                data: this.dataExec,
              });
            } else {
              await this.ultimaExecucao.create({
                id_empresa: ID_Empresa,
                nome_api: OmieCall.ListarProdutos,
                objeto: "produto",
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
    filtrar_por_data_de?: string,
    filtrar_por_hora_de?: string,
    filtrar_por_data_ate?: string,
    filtrar_por_hora_ate?: string
  ): any {
    const param = {
      pagina: numPagina,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      filtrar_apenas_omiepdv: "N",
      filtrar_por_data_de,
      filtrar_por_data_ate,
      filtrar_por_hora_de,
      filtrar_por_hora_ate,
    };

    return param;
  }
}

export { ProdutoOmieServices };

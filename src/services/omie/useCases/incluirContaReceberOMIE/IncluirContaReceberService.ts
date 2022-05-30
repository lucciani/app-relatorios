/* eslint-disable consistent-return */
import { AxiosError, AxiosResponse } from "axios";
import { container, injectable } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { IResponseEnelDTO } from "@services/omie/dtos/IResponseEnelDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class IncluirContaReceberService {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private tokenEmpresaRepository: TokenEmpresaRepository;
  private dateProvider: DayjsDateProvider;
  private token: TokenEmpresa;
  private bodys: ITokensEmpresaDTO[] = [];
  private pagina = 1;
  private total_de_paginas: number;
  private responseOmie: AxiosResponse<any, any>;
  private responseError: IResponseEnelDTO;

  constructor() {
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
  }

  async executeInserir({
    codigo_lancamento_omie,
    codigo_lancamento_integracao,
    codigo_cliente_fornecedor,
    codigo_cliente_fornecedor_integracao,
    data_vencimento,
    valor_documento,
    codigo_categoria,
    data_previsao,
    categorias,
    id_conta_corrente,
    numero_documento,
    numero_parcela,
    codigo_tipo_documento,
    numero_documento_fiscal,
    numero_pedido,
    chave_nfe,
    observacao,
    codigo_barras_ficha_compensacao,
    codigo_cmc7_cheque,
    data_emissao,
    id_origem,
    operacao,
    valor_pis,
    retem_pis,
    valor_cofins,
    retem_cofins,
    valor_csll,
    retem_csll,
    valor_ir,
    retem_ir,
    valor_iss,
    retem_iss,
    valor_inss,
    retem_inss,
    bloqueado,
    bloquear_baixa,
    importado_api,
    baixar_documento,
    conciliar_documento,
    acao,
    lancamento_detalhe,
    distribuicao,
    status_titulo,
    codigo_vendedor,
    codigo_projeto,
    nsu,
    data_registro,
    tipo_agrupamento,
    info,
    boleto,
    nCodPedido,
    bloquear_exclusao,
    nCodOS,
    ID_Empresa,
  }: IContaReceberDTO): Promise<IResponseEnelDTO> {
    this.token = await this.tokenEmpresaRepository.findByCompanyId(ID_Empresa);

    if (!this.token) {
      throw new AppError(
        `Não existe um cadastro de empresa com o código ${ID_Empresa}.`
      );
    }

    const auth = {
      appKey: this.token.appkey,
      appSecret: this.token.appsecret,
    } as ITokensEmpresaDTO;

    const { appKey: app_key, appSecret: app_secret } = auth;

    const param = this.getParams({
      codigo_lancamento_omie,
      codigo_lancamento_integracao,
      codigo_cliente_fornecedor,
      codigo_cliente_fornecedor_integracao,
      data_vencimento,
      valor_documento,
      codigo_categoria,
      data_previsao,
      categorias,
      id_conta_corrente,
      numero_documento,
      numero_parcela,
      codigo_tipo_documento,
      numero_documento_fiscal,
      numero_pedido,
      chave_nfe,
      observacao,
      codigo_barras_ficha_compensacao,
      codigo_cmc7_cheque,
      data_emissao,
      id_origem,
      operacao,
      valor_pis,
      retem_pis,
      valor_cofins,
      retem_cofins,
      valor_csll,
      retem_csll,
      valor_ir,
      retem_ir,
      valor_iss,
      retem_iss,
      valor_inss,
      retem_inss,
      bloqueado,
      bloquear_baixa,
      importado_api,
      baixar_documento,
      conciliar_documento,
      acao,
      lancamento_detalhe,
      distribuicao,
      status_titulo,
      codigo_vendedor,
      codigo_projeto,
      nsu,
      data_registro,
      tipo_agrupamento,
      info,
      boleto,
      nCodPedido,
      bloquear_exclusao,
      nCodOS,
    });

    const bodyRequest = {
      call: OmieCall.IncluirContaReceber,
      app_key,
      app_secret,
      param,
    } as IBodyOmieDTO;

    try {
      const resp = await this.requestOmie(bodyRequest);
      console.log(resp.data);
      const { status } = resp;
      const { descricao_status, codigo_status } = resp.data;

      const responseSucesso: IResponseEnelDTO = {
        retorno: codigo_status,
        mensagem: descricao_status,
        code: status,
      };

      return responseSucesso;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const { faultstring } = err.response.data;
        const { statusText, status } = err.response;
        this.responseError = {
          retorno: 1,
          mensagem: faultstring == null ? statusText : faultstring,
          code: status,
        };
        return this.responseError;
      }
      if (err.request) {
        this.responseError = {
          retorno: 1,
          mensagem: err.request.data,
          code: 500,
        };
        console.error(err.request.data);
        return this.responseError;
      }
      this.responseError = {
        retorno: 1,
        mensagem: err.request.data,
        code: 500,
      };
      console.error(err.request.data);
      return this.responseError;
    }
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.ContaReceber,
      dobyRequest
    );

    return responseOmie;
  }

  getParams(contaReceber: IContaReceberDTO): any {
    const {
      codigo_lancamento_omie,
      codigo_lancamento_integracao,
      codigo_cliente_fornecedor,
      codigo_cliente_fornecedor_integracao,
      data_vencimento,
      valor_documento,
      codigo_categoria,
      data_previsao,
      categorias,
      id_conta_corrente,
      numero_documento,
      numero_parcela,
      codigo_tipo_documento,
      numero_documento_fiscal,
      numero_pedido,
      chave_nfe,
      observacao,
      codigo_barras_ficha_compensacao,
      codigo_cmc7_cheque,
      data_emissao,
      id_origem,
      operacao,
      valor_pis,
      retem_pis,
      valor_cofins,
      retem_cofins,
      valor_csll,
      retem_csll,
      valor_ir,
      retem_ir,
      valor_iss,
      retem_iss,
      valor_inss,
      retem_inss,
      bloqueado,
      bloquear_baixa,
      importado_api,
      baixar_documento,
      conciliar_documento,
      acao,
      lancamento_detalhe,
      distribuicao,
      status_titulo,
      codigo_vendedor,
      codigo_projeto,
      nsu,
      data_registro,
      tipo_agrupamento,
      info,
      boleto,
      nCodPedido,
      bloquear_exclusao,
      nCodOS,
    } = contaReceber;

    const param = [
      {
        codigo_lancamento_omie,
        codigo_lancamento_integracao,
        codigo_cliente_fornecedor,
        codigo_cliente_fornecedor_integracao,
        data_vencimento,
        valor_documento,
        codigo_categoria,
        data_previsao,
        categorias,
        id_conta_corrente,
        numero_documento,
        numero_parcela,
        codigo_tipo_documento,
        numero_documento_fiscal,
        numero_pedido,
        chave_nfe,
        observacao,
        codigo_barras_ficha_compensacao,
        codigo_cmc7_cheque,
        data_emissao,
        id_origem,
        operacao,
        valor_pis,
        retem_pis,
        valor_cofins,
        retem_cofins,
        valor_csll,
        retem_csll,
        valor_ir,
        retem_ir,
        valor_iss,
        retem_iss,
        valor_inss,
        retem_inss,
        bloqueado,
        bloquear_baixa,
        importado_api,
        baixar_documento,
        conciliar_documento,
        acao,
        lancamento_detalhe,
        distribuicao,
        status_titulo,
        codigo_vendedor,
        codigo_projeto,
        nsu,
        data_registro,
        tipo_agrupamento,
        info,
        boleto,
        nCodPedido,
        bloquear_exclusao,
        nCodOS,
      },
    ];

    return param;
  }
}

export { IncluirContaReceberService };

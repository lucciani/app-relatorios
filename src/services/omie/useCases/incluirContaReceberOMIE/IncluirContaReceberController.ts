import { Request, Response } from "express";
import { container } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";

import { IncluirContaReceberService } from "./IncluirContaReceberService";

class IncluirContaReceberController {
  async handleIncluir(request: Request, response: Response): Promise<Response> {
    const incluirContaReceberService = container.resolve(
      IncluirContaReceberService
    );

    const { body, params } = request;
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
    } = body;
    const { id_empresa } = params;

    const req: IContaReceberDTO = {
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
      ID_Empresa: parseInt(id_empresa, 10),
    };

    const resp = await incluirContaReceberService.executeInserir(req);
    const { code } = resp;
    if (code === 500) {
      console.log(`ERROR: ${JSON.stringify(resp)}`);
      return response.status(500).json(resp);
    }

    console.log(`OK: ${JSON.stringify(resp)}`);
    return response.status(200).json(resp);
  }
}

export { IncluirContaReceberController };

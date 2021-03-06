import { ICategoriaContaPagarDTO } from "./ICategoriaContaPagarDTO";
import { IDistribuicaoContaPagarDTO } from "./IDistribuicaoContaPagarDTO";
import { IInfoDTO } from "./IInfoDTO";
import { ILancamentoDetalheDTO } from "./ILancamentoDetalheDTO";

interface IContaPagarDTO {
  codigo_lancamento_omie?: number;
  info: IInfoDTO;
  codigo_lancamento_integracao?: string;
  codigo_cliente_fornecedor?: number;
  codigo_cliente_fornecedor_integracao?: string;
  data_vencimento?: string;
  valor_documento?: number;
  codigo_categoria?: string;
  data_previsao?: string;
  id_conta_corrente?: number;
  numero_documento_fiscal?: string;
  data_emissao?: string;
  data_entrada?: string;
  codigo_projeto?: number;
  observacao?: string;
  valor_pis?: number;
  retem_pis?: string;
  valor_cofins?: number;
  retem_cofins?: string;
  valor_csll?: number;
  retem_csll?: string;
  valor_ir?: number;
  retem_ir?: string;
  valor_iss?: number;
  retem_iss?: string;
  valor_inss?: number;
  retem_inss?: string;
  numero_pedido?: string;
  codigo_tipo_documento?: string;
  numero_documento?: string;
  numero_parcela?: string;
  chave_nfe?: string;
  codigo_barras_ficha_compensacao?: string;
  codigo_vendedor?: number;
  id_origem?: string;
  info_data_inclusao?: string;
  info_usuario_inclusao?: string;
  info_data_alteracao?: string;
  info_usuario_alteracao?: string;
  info_importado_api?: string;
  operacao?: string;
  status_titulo?: string;
  nsu?: string;
  acao?: string;
  lancamento_detalhe?: ILancamentoDetalheDTO[];
  distribuicao?: IDistribuicaoContaPagarDTO[];
  categorias?: ICategoriaContaPagarDTO[];
  id_conta_corrente_integracao?: string;
  bloqueado?: string;
  baixa_bloqueada?: string;
  codigo_cmc7_cheque?: string;
  importado_api?: string;
  bloquear_exclusao?: string;
  codigo_forma_pagamento?: string;
  banco_transferencia?: string;
  agencia_transferencia?: string;
  conta_corrente_transferencia?: string;
  finalidade_transferencia?: string;
  cpf_cnpj_transferencia?: string;
  nome_transferencia?: string;
  codigo_barras_boleto?: string;
  juros_boleto?: number;
  multa_boleto?: number;
  ID_Empresa?: number;
}

export { IContaPagarDTO };

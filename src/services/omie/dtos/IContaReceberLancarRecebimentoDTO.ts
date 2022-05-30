interface IContaReceberLancarRecebimentoDTO {
  codigo_lancamento?: number;
  codigo_lancamento_integracao?: string;
  codigo_baixa?: number;
  codigo_baixa_integracao?: string;
  codigo_conta_corrente?: number;
  codigo_conta_corrente_integracao?: string;
  valor?: number;
  juros?: number;
  desconto?: number;
  multa?: number;
  data?: string;
  observacao?: string;
  bloqueado?: string;
  conciliar_documento?: string;
  nsu?: string;
  id_empresa?: number;
}

export { IContaReceberLancarRecebimentoDTO };

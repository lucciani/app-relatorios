interface IContaReceberLancarRecebimentoRespostaDTO {
  codigo_lancamento?: number;
  codigo_lancamento_integracao?: string;
  codigo_baixa?: string;
  codigo_baixa_integracao?: string;
  liquidado?: string;
  valor_baixado?: number;
  codigo_status?: string;
  descricao_status?: string;
}

export { IContaReceberLancarRecebimentoRespostaDTO };

interface IMovimentoFinanceiroDepartamentoDTO {
  nCodTitulo?: number;
  ID_Empresa?: number;
  codigo?: string;
  nDistrPercentual?: number;
  nDistrValor?: number;
  nValorFixo?: string;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IMovimentoFinanceiroDepartamentoDTO };

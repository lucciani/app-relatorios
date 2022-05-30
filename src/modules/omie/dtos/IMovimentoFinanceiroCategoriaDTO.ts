interface IMovimentoFinanceiroCategoriaDTO {
  nCodTitulo?: number;
  ID_Empresa?: number;
  codigo?: string;
  nDistrPercentual?: number;
  nDistrValor?: number;
  nValorFixo?: string;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IMovimentoFinanceiroCategoriaDTO };

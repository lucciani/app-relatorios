interface ILancamentoDetalheDTO {
  codigo_lancamento?: number;
  nCodInt?: string;
  COO?: string;
  CCF?: string;
  ID_Empresa?: number;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { ILancamentoDetalheDTO };

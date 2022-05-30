interface IItemPedidoCompraDTO {
  id?: string;
  nCodPed?: number;
  cCodIntItem?: string;
  nCodItem?: number;
  cCodIntProd?: string;
  nCodProd?: number;
  cProduto?: string;
  cDescricao?: string;
  cNCM?: string;
  cEAN?: string;
  cUnidade?: string;
  nPesoLiq?: number;
  nPesoBruto?: number;
  nQtde?: number;
  nValUnit?: number;
  nValMerc?: number;
  nDesconto?: number;
  nValorIcms?: number;
  nValorSt?: number;
  nValorIpi?: number;
  nValorPis?: number;
  nValorCofins?: number;
  nFrete?: number;
  nSeguro?: number;
  nDespesas?: number;
  nValTot?: number;
  cObs?: string;
  cMkpAtuPv?: string;
  cMkpAtuSm?: string;
  nMkpPerc?: number;
  codigo_local_estoque?: number;
  cCodCateg?: string;
  ID_Empresa?: number;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IItemPedidoCompraDTO };

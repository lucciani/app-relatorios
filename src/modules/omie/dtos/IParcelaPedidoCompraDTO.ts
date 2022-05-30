interface IParcelaPedidoCompraDTO {
  nCodPed?: number;
  nParcela?: number;
  dVencto?: string;
  nValor?: number;
  nDias?: number;
  nPercent?: number;
  ID_Empresa?: number;
  created_at?: Date;
  updated_at?: Date;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IParcelaPedidoCompraDTO };

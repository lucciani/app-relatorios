interface IPedidoCompraDepartamentoDTO {
  nCodPed?: number;
  ID_Empresa?: number;
  cCodDepto?: string;
  nPerc?: number;
  nValor?: number;
  created_at?: Date;
  updated_at?: Date;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IPedidoCompraDepartamentoDTO };

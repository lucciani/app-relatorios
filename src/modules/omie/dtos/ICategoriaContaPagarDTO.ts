interface ICategoriaContaPagarDTO {
  codigo_lancamento_omie?: number;
  codigo_categoria?: string;
  valor?: number;
  percentual?: number;
  ID_Empresa?: number;
  setCreateDate(): void;
  setUpdateDate(): void;
}
export { ICategoriaContaPagarDTO };

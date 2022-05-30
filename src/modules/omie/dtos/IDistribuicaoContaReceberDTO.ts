interface IDistriuicaoContaReceberDTO {
  codigo_lancamento_omie?: number;
  ID_Empresa?: number;
  cCodDep?: number;
  cDesDep?: string;
  nValDep?: number;
  nPerDep?: number;
  setCreateDate(): void;
  setUpdateDate(): void;
}

export { IDistriuicaoContaReceberDTO };

interface IEmpresaDTO {
  id?: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  ie: string;
  apelido?: string;
  appKey?: string;
  appSecret?: string;
}

export { IEmpresaDTO };

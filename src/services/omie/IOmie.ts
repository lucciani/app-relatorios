interface IParamPagination {
  pagina: number;
  registros_por_pagina: number;
  apenas_importado_api?: string;
}

interface IBodyOmie {
  call?: string;
  app_key?: string;
  app_secret?: string;
  param?: IParamPagination[];
}

interface IResponseOmie {
  data?: object;
  status?: number;
  statusText?: string;
  request?: object;
}

export { IBodyOmie, IResponseOmie, IParamPagination };

interface IBodyOmieDTO {
  call?: string;
  app_key?: string;
  app_secret?: string;
  param?: any[];
  nCodCliente?: number;
  cCodIntCliente?: string;
  nCodPed?: number;
  cCodIntPed?: string;
  cNumero?: string;
  nPagina?: number;
  nRegsPorPagina?: number;
  lApenasImportadoApi?: string;
  lExibirPedidosPendentes?: string;
  lExibirPedidosFaturados?: string;
  lExibirPedidosRecebidos?: string;
  lExibirPedidosCancelados?: string;
  lExibirPedidosEncerrados?: string;
  dDataInicial?: string;
  dDataFinal?: string;
  lApenasAlterados?: string;
}

export { IBodyOmieDTO };

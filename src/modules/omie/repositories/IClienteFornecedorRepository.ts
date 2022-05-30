import { ClienteFornecedor } from "../infra/typeorm/entities/ClienteFornecedor";

interface IClienteFornecedorRepository {
  create(cliente: ClienteFornecedor): Promise<ClienteFornecedor>;
  findByEmpresaIdAndCodigoCliente(
    cliente: ClienteFornecedor
  ): Promise<ClienteFornecedor>;
  findByEmpresa(id_empresa: number): Promise<ClienteFornecedor[]>;
}

export { IClienteFornecedorRepository };

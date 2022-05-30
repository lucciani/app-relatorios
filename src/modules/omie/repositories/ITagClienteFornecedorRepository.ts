import { TagClienteFornecedor } from "../infra/typeorm/entities/TagClienteFornecedor";

interface ITagClienteFornecedorRepository {
  create(tags: TagClienteFornecedor): Promise<TagClienteFornecedor>;
  findByEmpresaIdAndCodTagAndCodigoCliente(
    tags: TagClienteFornecedor
  ): Promise<TagClienteFornecedor>;
}

export { ITagClienteFornecedorRepository };

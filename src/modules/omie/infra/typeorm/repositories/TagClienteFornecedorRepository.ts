import { getRepository, Repository } from "typeorm";

import { ITagClienteFornecedorRepository } from "@modules/omie/repositories/ITagClienteFornecedorRepository";

import { TagClienteFornecedor } from "../entities/TagClienteFornecedor";

class TagClienteFornecedorRepository
  implements ITagClienteFornecedorRepository
{
  private repository: Repository<TagClienteFornecedor>;

  constructor() {
    this.repository = getRepository<TagClienteFornecedor>(TagClienteFornecedor);
  }

  async create(tags: TagClienteFornecedor): Promise<TagClienteFornecedor> {
    const tag = this.repository.create(tags);
    const { codigo_cliente_omie, ncodtag, id_empresa } = tag;

    const tagClienteFornecedorAtual =
      await this.findByEmpresaIdAndCodTagAndCodigoCliente(tag);

    if (!tagClienteFornecedorAtual) {
      const tagClienteFornecedorNova = await this.repository.save(tag);
      return tagClienteFornecedorNova;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(tagClienteFornecedorAtual)
      .returning("*")
      .where("codigo_cliente_omie = :codigo_cliente_omie", {
        codigo_cliente_omie,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("ncodtag = :ncodtag", {
        ncodtag,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByEmpresaIdAndCodTagAndCodigoCliente(
    tags: TagClienteFornecedor
  ): Promise<TagClienteFornecedor> {
    const { codigo_cliente_omie, ncodtag, id_empresa } = tags;
    const tagClienteFornecedor = await this.repository.findOne({
      where: { codigo_cliente_omie, id_empresa, ncodtag },
    });

    return tagClienteFornecedor;
  }
}

export { TagClienteFornecedorRepository };

import { getRepository, Repository } from "typeorm";

import { ICategoriaContaPagarRepository } from "@modules/omie/repositories/ICategoriaContaPagarRepository";

import { CategoriaContaPagar } from "../entities/CategoriaContaPagar";

class CategoriaContaPagarRepository implements ICategoriaContaPagarRepository {
  private repository: Repository<CategoriaContaPagar>;

  constructor() {
    this.repository = getRepository<CategoriaContaPagar>(CategoriaContaPagar);
  }

  async create(categoria: CategoriaContaPagar): Promise<CategoriaContaPagar> {
    const cat = this.repository.create(categoria);
    const { codigo_lancamento_omie, id_empresa, codigo_categoria } = cat;

    const categoriaAtual =
      await this.findByEmpresaIdAndCodigoOmieAndCodigoCategoria(cat);

    if (!categoriaAtual) {
      const categoriaNova = await this.repository.save(cat);
      return categoriaNova;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(categoriaAtual)
      .returning("*")
      .where("codigo_lancamento_omie = :codigo_lancamento_omie", {
        codigo_lancamento_omie,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("codigo_categoria = :codigo_categoria", {
        codigo_categoria,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByEmpresaIdAndCodigoOmieAndCodigoCategoria(
    categoria: CategoriaContaPagar
  ): Promise<CategoriaContaPagar> {
    const { codigo_lancamento_omie, id_empresa, codigo_categoria } = categoria;
    const categoriaAtual = await this.repository.findOne({
      where: { codigo_lancamento_omie, id_empresa, codigo_categoria },
    });

    return categoriaAtual;
  }
}

export { CategoriaContaPagarRepository };

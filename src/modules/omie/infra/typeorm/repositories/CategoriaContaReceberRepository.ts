import { getRepository, Repository } from "typeorm";

import { ICategoriaContaReceberRepository } from "@modules/omie/repositories/ICategoriaContaReceberRepository";

import { CategoriaContaReceber } from "../entities/CategoriaContaReceber";

class CategoriaContaReceberRepository
  implements ICategoriaContaReceberRepository
{
  private repository: Repository<CategoriaContaReceber>;

  constructor() {
    this.repository = getRepository<CategoriaContaReceber>(
      CategoriaContaReceber
    );
  }

  async create(
    categoria: CategoriaContaReceber
  ): Promise<CategoriaContaReceber> {
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
    categoria: CategoriaContaReceber
  ): Promise<CategoriaContaReceber> {
    const { codigo_lancamento_omie, id_empresa, codigo_categoria } = categoria;
    const categoriaAtual = await this.repository.findOne({
      where: { codigo_lancamento_omie, id_empresa, codigo_categoria },
    });

    return categoriaAtual;
  }
}

export { CategoriaContaReceberRepository };

import { getRepository, Repository } from "typeorm";

import { IProdutoRepository } from "@modules/omie/repositories/IProdutoRepository";

import { Produto } from "../entities/Produto";

class ProdutoRepository implements IProdutoRepository {
  private repository: Repository<Produto>;

  constructor() {
    this.repository = getRepository<Produto>(Produto);
  }

  async create(produto: Produto): Promise<Produto> {
    const produtoCriado = this.repository.create(produto);
    const { codigo_produto, id_empresa } = produtoCriado;

    const produtoAtual = await this.findByCodigoProdutoAndEmpresaId(
      produtoCriado
    );

    if (!produtoAtual) {
      const produtoNovo = await this.repository.save(produtoCriado);
      return produtoNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(produtoAtual)
      .returning("*")
      .where("codigo_produto = :codigo_produto", {
        codigo_produto,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .execute();

    return objAtualizado.raw[0];
  }

  async findByCodigoProdutoAndEmpresaId(produto: Produto): Promise<Produto> {
    const { codigo_produto, id_empresa } = produto;
    const produtoAtual = await this.repository.findOne({
      where: { codigo_produto, id_empresa },
    });

    return produtoAtual;
  }
}

export { ProdutoRepository };

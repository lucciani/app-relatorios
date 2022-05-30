import { getRepository, Repository } from "typeorm";

import { IPedidoCompraRepository } from "@modules/omie/repositories/IPedidoCompraRepository";

import { PedidoCompra } from "../entities/PedidoCompra";

class PedidoCompraRepository implements IPedidoCompraRepository {
  private repository: Repository<PedidoCompra>;

  constructor() {
    this.repository = getRepository<PedidoCompra>(PedidoCompra);
  }

  async create(pedidoCompra: PedidoCompra): Promise<PedidoCompra> {
    const pedidoCompraCriado = this.repository.create(pedidoCompra);
    const { ncodped, id_empresa } = pedidoCompra;

    const pedidoCompraAtual = await this.findByCodigoPedidoAndEmpresaId(
      pedidoCompraCriado
    );

    if (!pedidoCompraAtual) {
      const pedidoCompraNovo = await this.repository.save(pedidoCompraCriado);
      return pedidoCompraNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(pedidoCompraAtual)
      .returning("*")
      .where("ncodped = :ncodped", {
        ncodped,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByCodigoPedidoAndEmpresaId(
    pedidoCompra: PedidoCompra
  ): Promise<PedidoCompra> {
    const { ncodped, id_empresa } = pedidoCompra;
    const pedidoCompraAtual = await this.repository.findOne({
      where: { ncodped, id_empresa },
    });

    return pedidoCompraAtual;
  }
}

export { PedidoCompraRepository };

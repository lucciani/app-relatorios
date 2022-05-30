import { getRepository, Repository } from "typeorm";

import { IItemPedidoCompraRepository } from "@modules/omie/repositories/IItemPedidoCompraRepository";

import { ItemPedidoCompra } from "../entities/ItemPedidoCompra";

class ItemPedidoCompraRepository implements IItemPedidoCompraRepository {
  private repository: Repository<ItemPedidoCompra>;

  constructor() {
    this.repository = getRepository<ItemPedidoCompra>(ItemPedidoCompra);
  }

  async create(itemPedidoCompra: ItemPedidoCompra): Promise<ItemPedidoCompra> {
    const itemPedidoCompraCriado = this.repository.create(itemPedidoCompra);
    const { ncodped, id_empresa, ncoditem } = itemPedidoCompraCriado;

    const itemPedidoCompraAtual = await this.findByCodigoPedidoAndEmpresaId(
      itemPedidoCompraCriado
    );

    if (!itemPedidoCompraAtual) {
      const itemPedidoCompraNovo = await this.repository.save(
        itemPedidoCompraCriado
      );
      return itemPedidoCompraNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(itemPedidoCompraAtual)
      .returning("*")
      .where("ncodped = :ncodped", {
        ncodped,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("ncoditem = :ncoditem", {
        ncoditem,
      })
      .execute();

    return objAtualizado.raw[0];
  }

  async findByCodigoPedidoAndEmpresaId(
    itemPedidoCompra: ItemPedidoCompra
  ): Promise<ItemPedidoCompra> {
    const { ncodped, id_empresa, ncoditem } = itemPedidoCompra;
    const itemPedidoCompraAtual = await this.repository.findOne({
      where: { ncodped, id_empresa, ncoditem },
    });

    return itemPedidoCompraAtual;
  }
}

export { ItemPedidoCompraRepository };

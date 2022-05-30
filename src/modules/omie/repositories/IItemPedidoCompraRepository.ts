import { ItemPedidoCompra } from "../infra/typeorm/entities/ItemPedidoCompra";

interface IItemPedidoCompraRepository {
  create(itemPedidoCompra: ItemPedidoCompra): Promise<ItemPedidoCompra>;
  findByCodigoPedidoAndEmpresaId(
    itemPedidoCompra: ItemPedidoCompra
  ): Promise<ItemPedidoCompra>;
}

export { IItemPedidoCompraRepository };

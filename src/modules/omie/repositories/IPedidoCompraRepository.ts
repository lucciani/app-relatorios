import { PedidoCompra } from "../infra/typeorm/entities/PedidoCompra";

interface IPedidoCompraRepository {
  create(pedidoCompra: PedidoCompra): Promise<PedidoCompra>;
  findByCodigoPedidoAndEmpresaId(
    pedidoCompra: PedidoCompra
  ): Promise<PedidoCompra>;
}

export { IPedidoCompraRepository };

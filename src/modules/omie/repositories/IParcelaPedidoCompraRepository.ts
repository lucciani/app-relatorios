import { ParcelaPedidoCompra } from "../infra/typeorm/entities/ParcelaPedidoCompra";

interface IParcelaPedidoCompraRepository {
  create(
    parcelaPedidoCompra: ParcelaPedidoCompra
  ): Promise<ParcelaPedidoCompra>;
  findByCodigoPedidoAndEmpresaId(
    parcelaPedidoCompra: ParcelaPedidoCompra
  ): Promise<ParcelaPedidoCompra>;
}

export { IParcelaPedidoCompraRepository };

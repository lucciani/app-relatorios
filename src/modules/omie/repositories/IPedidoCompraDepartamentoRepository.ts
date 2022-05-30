import { PedidoCompraDepartamento } from "../infra/typeorm/entities/PedidoCompraDepartamento";

interface IPedidoCompraDepartamentoRepository {
  create(
    pedidoCompraDepartamento: PedidoCompraDepartamento
  ): Promise<PedidoCompraDepartamento>;
  findByCodigoPedidoAndEmpresaIdAndCodigoDep(
    pedidoCompraDepartamento: PedidoCompraDepartamento
  ): Promise<PedidoCompraDepartamento>;
}

export { IPedidoCompraDepartamentoRepository };

import { getRepository, Repository } from "typeorm";

import { IPedidoCompraDepartamentoRepository } from "@modules/omie/repositories/IPedidoCompraDepartamentoRepository";

import { PedidoCompraDepartamento } from "../entities/PedidoCompraDepartamento";

class PedidoCompraDepartamentoRepository
  implements IPedidoCompraDepartamentoRepository
{
  private repository: Repository<PedidoCompraDepartamento>;

  constructor() {
    this.repository = getRepository<PedidoCompraDepartamento>(
      PedidoCompraDepartamento
    );
  }

  async create(
    pedidoCompraDepartamento: PedidoCompraDepartamento
  ): Promise<PedidoCompraDepartamento> {
    const pedidoCompraDepartamentoCriado = this.repository.create(
      pedidoCompraDepartamento
    );
    const { ncodped, id_empresa, ccoddepto } = pedidoCompraDepartamentoCriado;

    const pedidoCompraDepartamentoAtual =
      await this.findByCodigoPedidoAndEmpresaIdAndCodigoDep(
        pedidoCompraDepartamentoCriado
      );

    if (!pedidoCompraDepartamentoAtual) {
      const pedidoCompraDepartamentoNovo = await this.repository.save(
        pedidoCompraDepartamentoCriado
      );
      return pedidoCompraDepartamentoNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(pedidoCompraDepartamentoAtual)
      .returning("*")
      .where("ncodped = :ncodped", {
        ncodped,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("ccoddepto = :ccoddepto", {
        ccoddepto,
      })
      .execute();

    return objAtualizado.raw[0];
  }

  async findByCodigoPedidoAndEmpresaIdAndCodigoDep(
    pedidoCompraDepartamento: PedidoCompraDepartamento
  ): Promise<PedidoCompraDepartamento> {
    const { ncodped, id_empresa, ccoddepto } = pedidoCompraDepartamento;
    const pedidoCompraAtual = await this.repository.findOne({
      where: { ncodped, id_empresa, ccoddepto },
    });

    return pedidoCompraAtual;
  }
}

export { PedidoCompraDepartamentoRepository };

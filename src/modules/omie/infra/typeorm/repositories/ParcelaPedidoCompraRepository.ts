import { getRepository, Repository } from "typeorm";

import { IParcelaPedidoCompraRepository } from "@modules/omie/repositories/IParcelaPedidoCompraRepository";

import { ParcelaPedidoCompra } from "../entities/ParcelaPedidoCompra";

class ParcelaPedidoCompraRepository implements IParcelaPedidoCompraRepository {
  private repository: Repository<ParcelaPedidoCompra>;

  constructor() {
    this.repository = getRepository<ParcelaPedidoCompra>(ParcelaPedidoCompra);
  }

  async create(
    parcelaPedidoCompra: ParcelaPedidoCompra
  ): Promise<ParcelaPedidoCompra> {
    const parcelaPedidoCompraCriado =
      this.repository.create(parcelaPedidoCompra);
    const { ncodped, id_empresa, nparcela } = parcelaPedidoCompra;

    const parcelaPedidoCompraAtual = await this.findByCodigoPedidoAndEmpresaId(
      parcelaPedidoCompraCriado
    );

    if (!parcelaPedidoCompraAtual) {
      const parcelaPedidoCompraNovo = await this.repository.save(
        parcelaPedidoCompraCriado
      );
      return parcelaPedidoCompraNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(parcelaPedidoCompraAtual)
      .returning("*")
      .where("ncodped = :ncodped", {
        ncodped,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("nparcela = :nparcela", {
        nparcela,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByCodigoPedidoAndEmpresaId(
    parcelaPedidoCompra: ParcelaPedidoCompra
  ): Promise<ParcelaPedidoCompra> {
    const { ncodped, id_empresa, nparcela } = parcelaPedidoCompra;
    const parcelaPdidoCompraAtual = await this.repository.findOne({
      where: { ncodped, id_empresa, nparcela },
    });

    return parcelaPdidoCompraAtual;
  }
}

export { ParcelaPedidoCompraRepository };

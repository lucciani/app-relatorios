import { getRepository, Repository } from "typeorm";

import { ICaracteristicaClienteFornecedorRepository } from "@modules/omie/repositories/ICaracteristicaClienteFornecedorRepository";

import { CaracteristicaClienteFornecedor } from "../entities/CaracteristicaClienteFornecedor";

class CaracteristicaClienteFornecedorRepository
  implements ICaracteristicaClienteFornecedorRepository
{
  private repository: Repository<CaracteristicaClienteFornecedor>;

  constructor() {
    this.repository = getRepository<CaracteristicaClienteFornecedor>(
      CaracteristicaClienteFornecedor
    );
  }

  async create(
    tags: CaracteristicaClienteFornecedor
  ): Promise<CaracteristicaClienteFornecedor> {
    const caract = this.repository.create(tags);
    const { codigo_cliente_omie, campo, id_empresa } = caract;

    const caracteristicaAtual =
      await this.findByEmpresaIdAndCodigoClienteAndCampo(caract);

    if (!caracteristicaAtual) {
      const caracteristicaNova = await this.repository.save(caract);
      return caracteristicaNova;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(caracteristicaAtual)
      .returning("*")
      .where("codigo_cliente_omie = :codigo_cliente_omie", {
        codigo_cliente_omie,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("campo = :campo", {
        campo,
      })
      .execute();
    return objAtualizado.raw[0];
  }

  async findByEmpresaIdAndCodigoClienteAndCampo(
    tags: CaracteristicaClienteFornecedor
  ): Promise<CaracteristicaClienteFornecedor> {
    const { codigo_cliente_omie, campo, id_empresa } = tags;
    const caracteristicaAtual = await this.repository.findOne({
      where: { codigo_cliente_omie, id_empresa, campo },
    });

    return caracteristicaAtual;
  }
}

export { CaracteristicaClienteFornecedorRepository };

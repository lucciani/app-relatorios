import { getRepository, Repository } from "typeorm";

import { IClienteFornecedorRepository } from "@modules/omie/repositories/IClienteFornecedorRepository";

import { ClienteFornecedor } from "../entities/ClienteFornecedor";

class ClienteFornecedorRepository implements IClienteFornecedorRepository {
  private repository: Repository<ClienteFornecedor>;

  constructor() {
    this.repository = getRepository<ClienteFornecedor>(ClienteFornecedor);
  }

  async create(cliente: ClienteFornecedor): Promise<ClienteFornecedor> {
    const cli = this.repository.create(cliente);
    const { codigo_cliente_omie, id_empresa } = cli;

    const clienteFornecedorAtual = await this.findByEmpresaIdAndCodigoCliente(
      cli
    );

    if (!clienteFornecedorAtual) {
      const clienteFornecedorNovo = await this.repository.save(cli);
      return clienteFornecedorNovo;
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(clienteFornecedorAtual)
      .returning("*")
      .where("codigo_cliente_omie = :codigo_cliente_omie", {
        codigo_cliente_omie,
      })
      .andWhere("id_empresa = :id_empresa", {
        id_empresa,
      })
      .execute();

    return objAtualizado.raw[0];
  }

  async findByEmpresaIdAndCodigoCliente(
    cliente: ClienteFornecedor
  ): Promise<ClienteFornecedor> {
    const { codigo_cliente_omie, id_empresa } = cliente;
    const clienteFornecedorAtual = await this.repository.findOne({
      where: { codigo_cliente_omie, id_empresa },
    });

    return clienteFornecedorAtual;
  }

  async findByEmpresa(id_empresa: number): Promise<ClienteFornecedor[]> {
    const clienteFornecedorAtual = await this.repository.find({
      where: { id_empresa },
    });

    return clienteFornecedorAtual;
  }
}

export { ClienteFornecedorRepository };

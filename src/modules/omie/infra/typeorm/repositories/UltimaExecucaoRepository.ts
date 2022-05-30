import { getRepository, Repository } from "typeorm";

import { IUltimaExecucaoRepository } from "@modules/omie/repositories/IUltimaExecucaoRepository";

import { UltimaExecucao } from "../entities/UltimaExecucao";

class UltimaExecucaoRepository implements IUltimaExecucaoRepository {
  private repository: Repository<UltimaExecucao>;

  constructor() {
    this.repository = getRepository<UltimaExecucao>(UltimaExecucao);
  }

  async create(ultima_execucao: UltimaExecucao): Promise<UltimaExecucao> {
    const ultimaExecucao = this.repository.create(ultima_execucao);
    const { id_empresa, objeto, nome_api } = ultimaExecucao;

    const ultimaExecucaoAtual = await this.findByEmpresaId(ultimaExecucao);

    if (!ultimaExecucaoAtual) {
      this.repository
        .save(ultimaExecucao)
        .then((u) => {
          return u;
        })
        .catch((err) => {
          console.log(
            `CODE: ${err.code} | table: ${err.table} | messge: ${err.detail} | parameters: ${err.parameters} `
          );
        });
    }

    const objAtualizado = await this.repository
      .createQueryBuilder()
      .update()
      .set(ultimaExecucao)
      .returning("*")
      .where("id_empresa = :id_empresa", {
        id_empresa,
      })
      .andWhere("objeto = :objeto", { objeto })
      .andWhere("nome_api = :nome_api", { nome_api })
      .execute();
    return objAtualizado.raw[0];
  }

  async insert(ultima_execucao: UltimaExecucao): Promise<void> {
    const ultimaExecucao = this.repository.create(ultima_execucao);

    const ultimaExecucaoAtual = await this.findByEmpresaId(ultimaExecucao);

    if (!ultimaExecucaoAtual) {
      this.repository
        .save(ultimaExecucao)
        .then((u) => {
          return u;
        })
        .catch((err) => {
          console.log(
            `CODE: ${err.code} | table: ${err.table} | messge: ${err.detail} | parameters: ${err.parameters} `
          );
        });
    }
  }

  async findByEmpresaId(
    ultima_execucao: UltimaExecucao
  ): Promise<UltimaExecucao> {
    const { id_empresa, objeto, nome_api } = ultima_execucao;
    const ultimaExecucaoAtual = await this.repository.findOne({
      id_empresa,
      objeto,
      nome_api,
    });
    return ultimaExecucaoAtual;
  }

  async findByEmpresa(
    id_empresa: number,
    objeto?: string,
    nome_api?: string
  ): Promise<UltimaExecucao> {
    const ultimaExecucaoAtual = await this.repository.findOne({
      id_empresa,
      objeto,
      nome_api,
    });
    return ultimaExecucaoAtual;
  }
}

export { UltimaExecucaoRepository };

import { getRepository, Repository } from "typeorm";

import { IMovimentoFinanceiroRepository } from "@modules/omie/repositories/IMovimentoFinanceiroRepository";

import { MovimentoFinanceiro } from "../entities/MovimentoFinanceiro";

class MovimentoFinanceiroRepository implements IMovimentoFinanceiroRepository {
  private repository: Repository<MovimentoFinanceiro>;

  constructor() {
    this.repository = getRepository<MovimentoFinanceiro>(MovimentoFinanceiro);
  }

  async create(
    movimentoFinanceiro: MovimentoFinanceiro
  ): Promise<MovimentoFinanceiro> {
    const movFin = this.repository.create(movimentoFinanceiro);
    const { ncodtitulo, id_empresa, ncodcliente, cgrupo, corigem } = movFin;

    const movimentoFinanceiroAtual =
      await this.findByCodTituloCodProjAndEmpresaIdAndCodCliente(movFin);

    if (!movimentoFinanceiroAtual) {
      this.repository
        .save(movFin)
        .then((t) => {
          return t;
        })
        .catch((err) => {
          console.log(
            `CODE: ${err.code} | table: ${err.table} | messge: ${err.detail} | parameters: ${err.parameters} `
          );
        });
      // return movimentoFinanceiroNovo;
    } else {
      const objAtualizado = await this.repository
        .createQueryBuilder()
        .update()
        .set(movimentoFinanceiroAtual)
        .returning("*")
        .where("ncodtitulo = :ncodtitulo", {
          ncodtitulo,
        })
        .andWhere("id_empresa = :id_empresa", {
          id_empresa,
        })
        .andWhere("cgrupo = :cgrupo", {
          cgrupo,
        })
        .andWhere("ncodcliente = :ncodcliente", {
          ncodcliente,
        })
        .andWhere("corigem = :corigem", {
          corigem,
        })
        .execute();
      return objAtualizado.raw[0];
    }
    return movimentoFinanceiroAtual;
  }

  async findByCodTituloCodProjAndEmpresaIdAndCodCliente(
    movimentoFinanceiro: MovimentoFinanceiro
  ): Promise<MovimentoFinanceiro> {
    const { ncodtitulo, id_empresa, ncodcliente, cgrupo, corigem } =
      movimentoFinanceiro;
    const movimentoFinanceiroAtual = await this.repository.findOne({
      where: {
        ncodtitulo,
        id_empresa,
        ncodcliente,
        cgrupo,
        corigem,
      },
    });

    return movimentoFinanceiroAtual;
  }
}

export { MovimentoFinanceiroRepository };

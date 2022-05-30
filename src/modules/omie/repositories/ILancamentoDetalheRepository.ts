import { LancamentoDetalhe } from "../infra/typeorm/entities/LancamentoDetalhe";

interface ILancamentoDetalheRepository {
  create(lancamento: LancamentoDetalhe): Promise<LancamentoDetalhe>;
  findByCodigoOmieAndEmpresaId(
    lancamento: LancamentoDetalhe
  ): Promise<LancamentoDetalhe>;
}

export { ILancamentoDetalheRepository };

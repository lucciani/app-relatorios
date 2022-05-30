import { UltimaExecucao } from "../infra/typeorm/entities/UltimaExecucao";

interface IUltimaExecucaoRepository {
  create(ultima_execucao: UltimaExecucao): Promise<UltimaExecucao>;
  findByEmpresaId(ultima_execucao: UltimaExecucao): Promise<UltimaExecucao>;
  findByEmpresa(id_empresa: number): Promise<UltimaExecucao>;
  insert(ultima_execucao: UltimaExecucao): Promise<void>;
}

export { IUltimaExecucaoRepository };

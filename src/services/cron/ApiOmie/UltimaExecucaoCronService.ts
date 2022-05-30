/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-expressions */
import { container, injectable } from "tsyringe";

import { UltimaExecucaoUseCase } from "@modules/omie/useCases/ultimaExecucao/UltimaExecucaoUseCase";

@injectable()
class UltimaExecucaoCronService {
  private ultimaExecucaoUseCase: UltimaExecucaoUseCase;

  constructor() {
    this.ultimaExecucaoUseCase = container.resolve(UltimaExecucaoUseCase);
  }

  execute() {
    (async () => {
      Promise.all([
        this.ultimaExecucaoUseCase.execute(),
        await new Promise((r) => setTimeout(r, 30000)),
        await this.finalizada(),
      ]);
    })();
  }

  async finalizada() {
    console.log(`Cron UltimaExecucao finalizada no instante ${new Date()}`);
  }
}

export { UltimaExecucaoCronService };

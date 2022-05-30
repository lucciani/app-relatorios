/* eslint-disable no-promise-executor-return */
import { CronJob } from "cron";
import { container } from "tsyringe";

import { UltimaExecucaoUseCase } from "@modules/omie/useCases/ultimaExecucao/UltimaExecucaoUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CronService } from "./ApiOmie/CronService";

class Cron {
  private cadaHora = "0 * * * *";
  private cadaMin = "*/5 * * * *";
  private cadaSeg = "*/5 * * * * *";
  private instanteTeste = new Date("2022-05-18T17:33:30");
  private HORA = 1;

  execute() {
    const cronServices = container.resolve(CronService);
    const ultimaExecucaoCronService = container.resolve(UltimaExecucaoUseCase);
    const dateProvider = container.resolve(DayjsDateProvider);

    const job = new CronJob(
      this.cadaHora,
      async () => {
        const CRON_LOG = {
          running: job.running,
          lastExec: dateProvider.convertToUTC(job.lastDate()),
          nextExec: dateProvider.convertToUTC(dateProvider.addHours(this.HORA)),
          description: "Job para extração da API da OMIE.",
        };

        console.log("\n");
        console.log(CRON_LOG);

        ultimaExecucaoCronService.execute();

        await new Promise((r) => setTimeout(r, 30000));

        cronServices.execute();
      },
      null,
      true,
      "America/Sao_Paulo"
    );
  }
}

export { Cron };

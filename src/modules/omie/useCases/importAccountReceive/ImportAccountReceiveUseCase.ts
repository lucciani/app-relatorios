import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { IContaReceberRepository } from "@modules/omie/repositories/IContaReceberRepository";

interface IImportAccountReceive {
  codigo_lancamento_omie: number;
}

@injectable()
class ImportAccountReceiveUseCase {
  constructor(
    @inject("AccountsReceiveRepository")
    private accountsReceiveRepository: IContaReceberRepository
  ) {}

  loadAccountsReceive(
    file: Express.Multer.File
  ): Promise<IImportAccountReceive[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const accountsReceive: IImportAccountReceive[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [codigo_lancamento_omie] = line;
          accountsReceive.push({
            codigo_lancamento_omie,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(accountsReceive);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const accountsReceive = await this.loadAccountsReceive(file);

    accountsReceive.map(async (accountReceive) => {
      const { codigo_lancamento_omie } = accountReceive;

      const existAccountsExists =
        await this.accountsReceiveRepository.findByCodigoLancamento(
          codigo_lancamento_omie
        );

      if (!existAccountsExists) {
        // await this.accountsReceiveRepository.create({
        //   codigo_lancamento_omie,
        // });
      }
    });
  }
}

export { ImportAccountReceiveUseCase };

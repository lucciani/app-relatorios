import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { ContaReceberRepositoryInMemory } from "@modules/omie/repositories/in-memory/ContaReceberRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CriarContaReceberUseCase } from "./CriarContaReceberUseCase";

let createAccountReceiveUseCase: CriarContaReceberUseCase;
let accountReceiveRepositoryInMemory: ContaReceberRepositoryInMemory;

describe("Criar uma conta a receber", () => {
  beforeEach(() => {
    accountReceiveRepositoryInMemory = new ContaReceberRepositoryInMemory();
    createAccountReceiveUseCase = new CriarContaReceberUseCase(
      accountReceiveRepositoryInMemory
    );
  });

  it("deve ser capaz de criar uma nova conta receber", async () => {
    const accounteReceive = {
      numero_documento: "123456",
      codigo_lancamento_omie: 1245,
      ID_Empresa: 13,
    } as IContaReceberDTO;

    const contaReceber = await createAccountReceiveUseCase.execute(
      accounteReceive
    );

    // const accountReceiveCreated =
    //   await accountReceiveRepositoryInMemory.findByCodigoLancamento(
    //     accounteReceive.codigo_lancamento_omie
    //   );

    expect(contaReceber).toHaveProperty("codigo_lancamento_omie");
  });

  it("não deve ser capaz de criar uma nova conta receber com codigo existe", async () => {
    expect(async () => {
      const accounteReceive = {
        numero_documento: "123456",
        codigo_lancamento_omie: 1245,
        ID_Empresa: 13,
      } as IContaReceberDTO;

      await createAccountReceiveUseCase.execute(accounteReceive);

      await createAccountReceiveUseCase.execute(accounteReceive);
    }).rejects.toBeInstanceOf(AppError);
  });
});

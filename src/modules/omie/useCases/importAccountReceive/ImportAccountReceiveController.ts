import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportAccountReceiveUseCase } from "./ImportAccountReceiveUseCase";

class ImportAccountReceiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importAccountReceiveUseCase = container.resolve(
      ImportAccountReceiveUseCase
    );

    await importAccountReceiveUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportAccountReceiveController };

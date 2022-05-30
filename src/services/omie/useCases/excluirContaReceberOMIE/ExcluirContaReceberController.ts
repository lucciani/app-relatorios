import { Request, Response } from "express";
import { container } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";

import { ExcluirContaReceberService } from "./ExcluirContaReceberService";

class ExcluirContaReceberController {
  async handleRemove(request: Request, response: Response): Promise<Response> {
    const excluirContaReceberService = container.resolve(
      ExcluirContaReceberService
    );

    const { body, params } = request;
    const { chave_lancamento } = body;
    const { id_empresa } = params;

    const req: IContaReceberDTO = {
      chave_lancamento,
      ID_Empresa: parseInt(id_empresa, 10),
    };

    const resp = await excluirContaReceberService.executeExclusao(req);
    const { code } = resp;
    if (code === 500) {
      console.log(`ERROR: ${JSON.stringify(resp)}`);
      return response.status(500).json(resp);
    }

    console.log(`OK: ${JSON.stringify(resp)}`);
    return response.status(200).json(resp);
  }
}

export { ExcluirContaReceberController };

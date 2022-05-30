import { Request, Response } from "express";
import { container } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";

import { AlterarContaReceberService } from "./AlterarContaReceberService";

class AlterarContaReceberController {
  async handleUpdate(request: Request, response: Response): Promise<Response> {
    const alterarContaReceberService = container.resolve(
      AlterarContaReceberService
    );

    const { body, params } = request;
    const { codigo_lancamento_omie, data_vencimento, valor_documento } = body;
    const { id_empresa } = params;

    const req: IContaReceberDTO = {
      codigo_lancamento_omie,
      data_vencimento,
      valor_documento,
      ID_Empresa: parseInt(id_empresa, 10),
    };

    const resp = await alterarContaReceberService.executeAlteracao(req);
    const { code } = resp;
    if (code === 500) {
      console.log(`ERROR: ${JSON.stringify(resp)}`);
      return response.status(500).json(resp);
    }

    console.log(`OK: ${JSON.stringify(resp)}`);
    return response.status(200).json(resp);
  }
}

export { AlterarContaReceberController };

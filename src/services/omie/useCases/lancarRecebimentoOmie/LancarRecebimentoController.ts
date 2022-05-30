import { Request, Response } from "express";
import { container } from "tsyringe";

import { IContaReceberLancarRecebimentoDTO } from "@services/omie/dtos/IContaReceberLancarRecebimentoDTO";

import { LancarRecebimentoService } from "./LancarRecebimentoService";

class LancarRecebimentooController {
  async handleSisParceria(
    request: Request,
    response: Response
  ): Promise<Response> {
    const lancarRecebimentoService = container.resolve(
      LancarRecebimentoService
    );

    const { body, params } = request;
    const {
      codigo_lancamento,
      codigo_conta_corrente,
      valor,
      data,
      juros,
      desconto,
      multa,
      nsu,
      observacao,
    } = body;
    const { id_empresa } = params;

    const req: IContaReceberLancarRecebimentoDTO = {
      codigo_lancamento,
      codigo_conta_corrente,
      valor,
      data,
      juros,
      desconto,
      multa,
      nsu,
      observacao,
      id_empresa: parseInt(id_empresa, 10),
    };

    const resp = await lancarRecebimentoService.executeSisParceria(req);
    const { code } = resp;
    if (code === 500) {
      console.log(`ERROR: ${JSON.stringify(resp)}`);
      return response.status(500).json(resp);
    }

    console.log(`OK: ${JSON.stringify(resp)}`);
    return response.status(200).json(resp);
  }
}

export { LancarRecebimentooController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListarTagsClienteOmieService } from "./ListarTagsClienteOmieService";

class ListarTagsClienteOmieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const tagsClienteService = container.resolve(ListarTagsClienteOmieService);

    await tagsClienteService.execute();
    return response.send();
  }
}

export { ListarTagsClienteOmieController };

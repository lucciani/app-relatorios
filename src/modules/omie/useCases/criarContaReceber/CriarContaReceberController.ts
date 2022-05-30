/* eslint-disable no-restricted-syntax */
import camelcaseKeys from "camelcase-keys";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
// import { ApiReport } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";

import { CriarContaReceberUseCase } from "./CriarContaReceberUseCase";
// import { ApiReport } from "../../../../services/ApiReport";

class CriarContaReceberController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { documentNumber } = request.body;

    // const apiOmie = new ApiReport("https://app.omie.com.br/api/v1/");

    // const params = {
    //   pagina: 1,
    //   registros_por_pagina: 3,
    //   apenas_importado_api: "N",
    // };

    // const body = {
    //   call: "ListarContasReceber",
    //   app_key: "2200829465835",
    //   app_secret: "14360e86acb6c37aab0b2120d795f5e6",
    //   param: [params],
    // };
    // const responseOmie = await apiOmie.handlePostOmie(
    //   "financas/contareceber/",
    //   body
    // );

    // const { data } = responseOmie;

    // for (const account of contaReceberCadastro) {
    //   (`${account.codigo_lancamento_omie}`);
    // }
    // (conta_receber_cadastro);

    const criarContaReceberUseCase = container.resolve(
      CriarContaReceberUseCase
    );

    // const contas = [];

    // data.conta_receber_cadastro.forEach(
    //   async (contaReceber: IContaReceberDTO) => {
    //     (contaReceber);
    //     const { codigo_lancamento_omie, numero_documento } = contaReceber;
    //     const conta = {
    //       codigo_lancamento_omie,
    //       numero_documento,
    //     };
    //     await criarContaReceberUseCase.execute(conta);
    //   }
    // );

    return response.status(201).send();
  }
}

export { CriarContaReceberController };

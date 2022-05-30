/* eslint-disable consistent-return */
import { AxiosError, AxiosResponse } from "axios";
import { container, injectable } from "tsyringe";

import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { IContaReceberLancarRecebimentoDTO } from "@services/omie/dtos/IContaReceberLancarRecebimentoDTO";
import { IResponseEnelDTO } from "@services/omie/dtos/IResponseEnelDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class LancarRecebimentoService {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private tokenEmpresaRepository: TokenEmpresaRepository;
  private dateProvider: DayjsDateProvider;
  private token: TokenEmpresa;
  private bodys: ITokensEmpresaDTO[] = [];
  private pagina = 1;
  private total_de_paginas: number;
  private responseOmie: AxiosResponse<any, any>;
  private responseError: IResponseEnelDTO;

  constructor() {
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);
  }

  async executeSisParceria({
    codigo_lancamento,
    codigo_conta_corrente,
    valor,
    data,
    juros,
    desconto,
    multa,
    nsu,
    observacao,
    id_empresa,
  }: IContaReceberLancarRecebimentoDTO): Promise<IResponseEnelDTO> {
    if (!codigo_conta_corrente) {
      throw new AppError("Código conta corrente inválido.");
    }

    if (!codigo_lancamento) {
      throw new AppError("Código lançamento inválido.");
    }

    this.token = await this.tokenEmpresaRepository.findByCompanyId(id_empresa);

    if (!this.token) {
      throw new AppError(
        `Não existe um cadastro de empresa com o código ${id_empresa}.`
      );
    }

    const auth = {
      appKey: this.token.appkey,
      appSecret: this.token.appsecret,
    } as ITokensEmpresaDTO;

    const { appKey: app_key, appSecret: app_secret } = auth;

    const param = this.getParams({
      codigo_lancamento,
      codigo_conta_corrente,
      valor,
      data,
      juros,
      desconto,
      multa,
      nsu,
      observacao,
    });

    const bodyRequest = {
      call: OmieCall.LancarRecebimento,
      app_key,
      app_secret,
      param,
    } as IBodyOmieDTO;

    try {
      const resp = await this.requestOmie(bodyRequest);
      console.log(resp.data);
      const { status } = resp;
      const { descricao_status, codigo_status } = resp.data;

      const responseSucesso: IResponseEnelDTO = {
        retorno: codigo_status,
        mensagem: descricao_status,
        code: status,
      };
      return responseSucesso;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const { faultstring } = err.response.data;
        const { statusText, status } = err.response;
        this.responseError = {
          retorno: 1,
          mensagem: faultstring == null ? statusText : faultstring,
          code: status,
        };
        return this.responseError;
      }
      if (err.request) {
        this.responseError = {
          retorno: 1,
          mensagem: err.request.data,
          code: 500,
        };
        console.error(err.request.data);
        return this.responseError;
      }
      this.responseError = {
        retorno: 1,
        mensagem: err.request.data,
        code: 500,
      };
      console.error(err.request.data);
      return this.responseError;
    }
  }

  async requestOmie(dobyRequest: IBodyOmieDTO) {
    const responseOmie = await this.apiOmie.handlePost(
      OmieEndPoints.ContaReceber,
      dobyRequest
    );

    return responseOmie;
  }

  getParams(lancamentoBaixa: IContaReceberLancarRecebimentoDTO): any {
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
    } = lancamentoBaixa;
    const param = [
      {
        codigo_lancamento,
        codigo_conta_corrente,
        valor,
        data,
        juros,
        desconto,
        multa,
        nsu,
        observacao,
      },
    ];

    return param;
  }
}

export { LancarRecebimentoService };

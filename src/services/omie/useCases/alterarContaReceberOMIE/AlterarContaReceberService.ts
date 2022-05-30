/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import { AxiosError, AxiosResponse } from "axios";
import { container, injectable } from "tsyringe";

import { IContaReceberDTO } from "@modules/omie/dtos/IContaReceberDTO";
import { IDistriuicaoContaReceberDTO } from "@modules/omie/dtos/IDistribuicaoContaReceberDTO";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { IResponseEnelDTO } from "@services/omie/dtos/IResponseEnelDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class AlterarContaReceberService {
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

  async executeAlteracao({
    codigo_lancamento_omie,
    data_vencimento,
    valor_documento,
    ID_Empresa,
  }: IContaReceberDTO): Promise<IResponseEnelDTO> {
    if (!codigo_lancamento_omie) {
      throw new AppError("Código lançamento omie inválido.");
    }

    if (!valor_documento) {
      throw new AppError("Valor documento inválido.");
    }

    this.token = await this.tokenEmpresaRepository.findByCompanyId(ID_Empresa);

    if (!this.token) {
      throw new AppError(
        `Não existe um cadastro de empresa com o código ${ID_Empresa}.`
      );
    }

    const auth = {
      appKey: this.token.appkey,
      appSecret: this.token.appsecret,
    } as ITokensEmpresaDTO;

    const { appKey: app_key, appSecret: app_secret } = auth;

    const distribuicao = await this.mapContaReceberDepartamento(
      codigo_lancamento_omie,
      app_key,
      app_secret
    );

    const param = this.getParams({
      codigo_lancamento_omie,
      data_vencimento,
      valor_documento,
      distribuicao,
    });

    const bodyRequest = {
      call: OmieCall.AlterarContaReceber,
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

  getParams(contaReceber: IContaReceberDTO): any {
    const {
      codigo_lancamento_omie,
      data_vencimento,
      valor_documento,
      distribuicao,
    } = contaReceber;

    const param = [
      {
        codigo_lancamento_omie,
        data_vencimento,
        valor_documento,
        distribuicao,
      },
    ];

    return param;
  }

  async mapContaReceberDepartamento(
    codigo_lancamento_omie: number,
    app_key: string,
    app_secret: string
  ): Promise<IDistriuicaoContaReceberDTO[]> {
    const bodyRequest = {
      call: OmieCall.ConsultarContaReceber,
      app_key,
      app_secret,
      param: [{ codigo_lancamento_omie }],
    } as IBodyOmieDTO;

    const objRateio = [];

    const resp = await this.requestOmie(bodyRequest);

    if (resp) {
      const { data } = resp;
      const { distribuicao } = data;

      if (distribuicao) {
        for (const dist of distribuicao) {
          const { cCodDep, nPerDep } = dist as IDistriuicaoContaReceberDTO;
          objRateio.push({ cCodDep, nPerDep });
        }
      }
    }

    return objRateio;
  }
}

export { AlterarContaReceberService };

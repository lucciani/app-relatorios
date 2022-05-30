/* eslint-disable no-promise-executor-return */
import { AxiosError } from "axios";
import objectKeys from "object-keys-modifier";
import { container, injectable } from "tsyringe";

import { ITagDTO } from "@modules/omie/dtos/ITagDTO";
import { ClienteFornecedor } from "@modules/omie/infra/typeorm/entities/ClienteFornecedor";
import { TagClienteFornecedor } from "@modules/omie/infra/typeorm/entities/TagClienteFornecedor";
import { Tags } from "@modules/omie/infra/typeorm/entities/Tags";
import { TokenEmpresa } from "@modules/omie/infra/typeorm/entities/TokenEmpresa";
import { ClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/ClienteFornecedorRepository";
import { TagClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/TagClienteFornecedorRepository";
import { TagRepository } from "@modules/omie/infra/typeorm/repositories/TagRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { IBodyOmieDTO } from "@services/omie/dtos/IBodyOmieDTO";
import { ITokensEmpresaDTO } from "@services/omie/dtos/ITokensEmpresaDTO";
import { OmieCall } from "@services/omie/enums/OmieCall";
import { OmieEndPoints } from "@services/omie/enums/OmieEndPoints";
import { ApiProvider } from "@shared/container/providers/ApiProvider/implementations/ApiProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

@injectable()
class ListarTagsClienteOmieService {
  private apiOmie = new ApiProvider(process.env.URL_API_OMIE);

  private clienteFornecedorRepository: ClienteFornecedorRepository;
  private tokenEmpresaRepository: TokenEmpresaRepository;
  private tagClienteFornecedorRepository: TagClienteFornecedorRepository;
  private ultimaExecucao: UltimaExecucaoRepository;
  private dateProvider: DayjsDateProvider;
  private tagRepository: TagRepository;
  private tokens: TokenEmpresa[] = [];
  private bodys: ITokensEmpresaDTO[] = [];
  private appKey: string;
  private appSecret: string;

  async execute() {
    this.dateProvider = container.resolve(DayjsDateProvider);
    this.clienteFornecedorRepository = container.resolve(
      ClienteFornecedorRepository
    );
    this.tagRepository = container.resolve(TagRepository);
    this.tagClienteFornecedorRepository = container.resolve(
      TagClienteFornecedorRepository
    );
    this.ultimaExecucao = container.resolve(UltimaExecucaoRepository);

    this.tokenEmpresaRepository = container.resolve(TokenEmpresaRepository);

    this.tokens = await this.tokenEmpresaRepository.findAll(true);

    this.tokens.forEach(async (token) => {
      this.appKey = token.appkey;
      this.appSecret = token.appsecret;
      const body = {
        ID_Empresa: token.empresaid,
        appKey: this.appKey,
        appSecret: this.appSecret,
      } as ITokensEmpresaDTO;
      this.bodys.push(body);
    });

    this.bodys.forEach(async (body) => {
      const {
        ID_Empresa: id_empresa,
        appKey: app_key,
        appSecret: app_secret,
      } = body;

      const ultimaExecucao = await this.ultimaExecucao.findByEmpresa(
        id_empresa
      );

      console.log(
        `EMPRESA: ${id_empresa} | EXECUCAO: ${JSON.stringify(ultimaExecucao)}`
      );

      // const dataFormatada = this.dateProvider.dateTime(ultimaExecucao.data);
      const { data } = ultimaExecucao;

      const dataFormatada = this.dateProvider.filtroDate(data);

      console.log(dataFormatada[0]);
      console.log(dataFormatada[1]);
      console.log(dataFormatada[2]);

      const clientes = await this.clienteFornecedorRepository.findByEmpresa(
        id_empresa
      );

      if (clientes) {
        (async () => {
          // eslint-disable-next-line no-restricted-syntax
          for (const cliente of clientes) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, 1000));
            this.criartagsClientes(cliente, app_key, app_secret, id_empresa);
          }
        })();
      }
    });
  }

  async requestOmie(dobyRequest: IBodyOmieDTO, endPoint: OmieEndPoints) {
    const responseOmie = await this.apiOmie.handlePost(endPoint, dobyRequest);

    return responseOmie;
  }

  criartagsClientes(
    cliente: ClienteFornecedor,
    app_key: string,
    app_secret: string,
    id_empresa: number
  ) {
    const { codigo_cliente_omie: nCodCliente } = cliente;
    const bodyRequest = {
      call: OmieCall.ListarTags,
      app_key,
      app_secret,
      param: [{ nCodCliente }],
    } as IBodyOmieDTO;
    this.requestOmie(bodyRequest, OmieEndPoints.GetClienteTags)
      .then((resp) => {
        const { nCodCliente, tagsLista } = resp.data;
        const newTags = [] as ITagDTO[];
        if (tagsLista) {
          const tagsCliente = tagsLista as ITagDTO[];
          console.log(`TAGSLISTA: ${JSON.stringify(tagsCliente)}`);
          const listaTags = tagsCliente
            .map((tagCliente: ITagDTO) => {
              const { nCodTag, tag } = tagCliente;
              const ID_Empresa = id_empresa;
              const tagDTO = {
                ID_Empresa,
                nCodTag,
                tag,
                nCodCliente,
              } as ITagDTO;
              return tagDTO;
            })
            .filter((tagCliente) => {
              const exists = newTags.filter(
                (t) =>
                  t.ID_Empresa === tagCliente.ID_Empresa &&
                  t.nCodTag === tagCliente.nCodTag
              );
              if (!exists) {
                console.log(
                  `NOVA TAG: EMPRESA: ${tagCliente.ID_Empresa} | TAG: ${tagCliente.nCodTag}`
                );
                newTags.push(tagCliente);
              }
              console.log(
                `EMPRESA: ${tagCliente.ID_Empresa} | TAG: ${tagCliente.nCodTag}`
              );
              return newTags;
            });
          console.log(`NEWTAGS: ${JSON.stringify(listaTags)}`);
          listaTags.forEach(async (t: ITagDTO) => {
            const { ID_Empresa, nCodTag, tag } = t;
            const tagFornecedor = new TagClienteFornecedor();
            tagFornecedor.id_empresa = ID_Empresa;
            tagFornecedor.codigo_cliente_omie = nCodCliente;
            tagFornecedor.ncodtag = nCodTag;
            objectKeys({ mode: "lowecase" })({
              tagFornecedor,
            });
            await this.tagClienteFornecedorRepository.create(tagFornecedor);
            const tagAtual = t as Tags;
            tagAtual.tag = tag;
            objectKeys({ mode: "lowecase" })({
              tagAtual,
            });
            await this.tagRepository.create(tagAtual);
          });
        }
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response) {
          const { faultstring } = err.response.data;
          const { status, statusText } = err.response;
          console.error({
            code: status,
            message: faultstring == null ? statusText : faultstring,
            id_empresa,
          });
        } else if (err.request) {
          console.error(err.request.data);
        } else {
          console.error("Error", err.message);
        }
      });
  }
}

export { ListarTagsClienteOmieService };

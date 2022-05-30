import { getRepository, Repository } from "typeorm";

import { ITagRepository } from "@modules/omie/repositories/ITagRepository";

import { Tags } from "../entities/Tags";

class TagRepository implements ITagRepository {
  private repository: Repository<Tags>;

  constructor() {
    this.repository = getRepository<Tags>(Tags);
  }

  async create(tags: Tags): Promise<Tags> {
    const tag = this.repository.create(tags);
    const { ncodtag, id_empresa } = tag;

    const tagAtual = await this.findByEmpresaIdAndCodTag(tag);

    if (!tagAtual) {
      this.repository
        .save(tag)
        .then((t) => {
          return t;
        })
        .catch((err) => {
          console.log(
            `CODE: ${err.code} | table: ${err.table} | messge: ${err.detail} | parameters: ${err.parameters} `
          );
        });
    } else {
      const objAtualizado = await this.repository
        .createQueryBuilder()
        .update()
        .set(tagAtual)
        .returning("*")
        .where("id_empresa = :id_empresa", {
          id_empresa,
        })
        .andWhere("ncodtag = :ncodtag", {
          ncodtag,
        })
        .execute();
      return objAtualizado.raw[0];
    }

    return tagAtual;
  }

  async findByEmpresaIdAndCodTag(tags: Tags): Promise<Tags> {
    const { id_empresa, ncodtag } = tags;
    const tagAtual = await this.repository.findOne({ id_empresa, ncodtag });
    return tagAtual;
  }
}

export { TagRepository };

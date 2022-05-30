import { Tags } from "../infra/typeorm/entities/Tags";

interface ITagRepository {
  create(tags: Tags): Promise<Tags>;
  findByEmpresaIdAndCodTag(tags: Tags): Promise<Tags>;
}

export { ITagRepository };

import { ICategoriaDTO } from "../dtos/ICategoriaDTO";
import { Categoria } from "../infra/typeorm/entities/Categoria";

interface ICategoriaRepository {
  create({ descricao }: ICategoriaDTO): Promise<Categoria>;
}

export { ICategoriaRepository };

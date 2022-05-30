import { ICategoriaDTO } from "@modules/omie/dtos/ICategoriaDTO";
import { Categoria } from "@modules/omie/infra/typeorm/entities/Categoria";

import { ICategoriaRepository } from "../ICategoriaRepository";

class CategoriaRepositoryInMemory implements ICategoriaRepository {
  categorias: Categoria[] = [];

  async create({ descricao }: ICategoriaDTO): Promise<Categoria> {
    const categoria = new Categoria();

    Object.assign(categoria, {
      descricao,
    });

    this.categorias.push(categoria);
    return categoria;
  }
}

export { CategoriaRepositoryInMemory };

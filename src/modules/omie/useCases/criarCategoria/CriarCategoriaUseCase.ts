import { inject, injectable } from "tsyringe";

import { Categoria } from "@modules/omie/infra/typeorm/entities/Categoria";
import { ICategoriaRepository } from "@modules/omie/repositories/ICategoriaRepository";

interface IRequest {
  descricao: string;
}

@injectable()
class CriarCategoriaUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriaRepository
  ) {}
  async execute({ descricao }: IRequest): Promise<Categoria> {
    const categoria = await this.categoriesRepository.create({
      descricao,
    });
    return categoria;
  }
}

export { CriarCategoriaUseCase };

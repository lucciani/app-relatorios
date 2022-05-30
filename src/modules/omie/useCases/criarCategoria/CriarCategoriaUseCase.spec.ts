import { CategoriaRepositoryInMemory } from "@modules/omie/repositories/in-memory/CategoriaRepositoryInMemory";

import { CriarCategoriaUseCase } from "./CriarCategoriaUseCase";

let createCategoryUseCase: CriarCategoriaUseCase;
let categoriesRepository: CategoriaRepositoryInMemory;

describe("Criar categoria", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriaRepositoryInMemory();
    createCategoryUseCase = new CriarCategoriaUseCase(categoriesRepository);
  });

  it("deve ser capaz de criar uma nova categoria", async () => {
    await createCategoryUseCase.execute({ descricao: "categoria test" });
  });
});

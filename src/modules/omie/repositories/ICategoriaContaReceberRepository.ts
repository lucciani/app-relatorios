import { CategoriaContaReceber } from "@modules/omie/infra/typeorm/entities/CategoriaContaReceber";

interface ICategoriaContaReceberRepository {
  create(categoria: CategoriaContaReceber): Promise<CategoriaContaReceber>;
  findByEmpresaIdAndCodigoOmieAndCodigoCategoria(
    categoria: CategoriaContaReceber
  ): Promise<CategoriaContaReceber>;
}

export { ICategoriaContaReceberRepository };

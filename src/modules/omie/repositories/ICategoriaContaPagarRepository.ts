import { CategoriaContaPagar } from "../infra/typeorm/entities/CategoriaContaPagar";

interface ICategoriaContaPagarRepository {
  create(categoria: CategoriaContaPagar): Promise<CategoriaContaPagar>;
  findByEmpresaIdAndCodigoOmieAndCodigoCategoria(
    categoria: CategoriaContaPagar
  ): Promise<CategoriaContaPagar>;
}

export { ICategoriaContaPagarRepository };

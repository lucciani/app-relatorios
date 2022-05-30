import { Produto } from "../infra/typeorm/entities/Produto";

interface IProdutoRepository {
  create(produto: Produto): Promise<Produto>;
  findByCodigoProdutoAndEmpresaId(produto: Produto): Promise<Produto>;
}

export { IProdutoRepository };

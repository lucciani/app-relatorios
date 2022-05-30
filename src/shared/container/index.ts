import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CaracteristicaClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/CaracteristicaClienteFornecedorRepository";
import { CategoriaContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/CategoriaContaPagarRepository";
import { CategoriaContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/CategoriaContaReceberRepository";
import { ClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/ClienteFornecedorRepository";
import { ContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/ContaPagarRepository";
import { ContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/ContaReceberRepository";
import { DistribuicaoContaPagarRepository } from "@modules/omie/infra/typeorm/repositories/DistribuicaoContaPagarRepository";
import { DistribuicaoContaReceberRepository } from "@modules/omie/infra/typeorm/repositories/DistribuicaoContaReceberRepository";
import { EmpresaRepository } from "@modules/omie/infra/typeorm/repositories/EmpresaRepository";
import { ItemPedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/ItemPedidoCompraRepository";
import { LancamentoDetalheRepository } from "@modules/omie/infra/typeorm/repositories/LancamentoDetalheRepository";
import { MovimentoFinanceiroCategoriaRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroCategoriaRepository";
import { MovimentoFinanceiroDepartamentoRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroDepartamentoRepository";
import { MovimentoFinanceiroRepository } from "@modules/omie/infra/typeorm/repositories/MovimentoFinanceiroRepository";
import { ParcelaPedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/ParcelaPedidoCompraRepository";
import { PedidoCompraDepartamentoRepository } from "@modules/omie/infra/typeorm/repositories/PedidoCompraDepartamentoRepository";
import { PedidoCompraRepository } from "@modules/omie/infra/typeorm/repositories/PedidoCompraRepository";
import { ProdutoRepository } from "@modules/omie/infra/typeorm/repositories/ProdutoRepository";
import { TagClienteFornecedorRepository } from "@modules/omie/infra/typeorm/repositories/TagClienteFornecedorRepository";
import { TagRepository } from "@modules/omie/infra/typeorm/repositories/TagRepository";
import { TokenEmpresaRepository } from "@modules/omie/infra/typeorm/repositories/TokenEmpresaRepository";
import { UltimaExecucaoRepository } from "@modules/omie/infra/typeorm/repositories/UltimaExecucaoRepository";
import { ICaracteristicaClienteFornecedorRepository } from "@modules/omie/repositories/ICaracteristicaClienteFornecedorRepository";
import { ICategoriaContaPagarRepository } from "@modules/omie/repositories/ICategoriaContaPagarRepository";
import { ICategoriaContaReceberRepository } from "@modules/omie/repositories/ICategoriaContaReceberRepository";
import { IClienteFornecedorRepository } from "@modules/omie/repositories/IClienteFornecedorRepository";
import { IContaPagarRepository } from "@modules/omie/repositories/IContaPagarRepository";
import { IContaReceberRepository } from "@modules/omie/repositories/IContaReceberRepository";
import { IDistribuicaoContaPagarRepository } from "@modules/omie/repositories/IDistribuicaoContaPagarRepository";
import { IDistribuicaoContaReceberRepository } from "@modules/omie/repositories/IDistribuicaoContaReceberRepository";
import { IEmpresaRepository } from "@modules/omie/repositories/IEmpresaRepository";
import { IItemPedidoCompraRepository } from "@modules/omie/repositories/IItemPedidoCompraRepository";
import { ILancamentoDetalheRepository } from "@modules/omie/repositories/ILancamentoDetalheRepository";
import { IMovimentoFinanceiroCategoriaRepository } from "@modules/omie/repositories/IMovimentoFinanceiroCategoriaRepository";
import { IMovimentoFinanceiroDepartamentoRepository } from "@modules/omie/repositories/IMovimentoFinanceiroDepartamentoRepository";
import { IMovimentoFinanceiroRepository } from "@modules/omie/repositories/IMovimentoFinanceiroRepository";
import { IParcelaPedidoCompraRepository } from "@modules/omie/repositories/IParcelaPedidoCompraRepository";
import { IPedidoCompraDepartamentoRepository } from "@modules/omie/repositories/IPedidoCompraDepartamentoRepository";
import { IPedidoCompraRepository } from "@modules/omie/repositories/IPedidoCompraRepository";
import { IProdutoRepository } from "@modules/omie/repositories/IProdutoRepository";
import { ITagClienteFornecedorRepository } from "@modules/omie/repositories/ITagClienteFornecedorRepository";
import { ITagRepository } from "@modules/omie/repositories/ITagRepository";
import { ITokenEmpresaRepository } from "@modules/omie/repositories/ITokenEmpresaRepository";
import { IUltimaExecucaoRepository } from "@modules/omie/repositories/IUltimaExecucaoRepository";

container.registerSingleton<IContaReceberRepository>(
  "ContaReceberRepository",
  ContaReceberRepository
);

container.registerSingleton<IContaPagarRepository>(
  "ContaPagarRepository",
  ContaPagarRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IEmpresaRepository>(
  "EmpresaRepository",
  EmpresaRepository
);

container.registerSingleton<ITokenEmpresaRepository>(
  "TokenEmpresaRepository",
  TokenEmpresaRepository
);

container.registerSingleton<IDistribuicaoContaReceberRepository>(
  "DistribuicaoContaReceberRepository",
  DistribuicaoContaReceberRepository
);

container.registerSingleton<IDistribuicaoContaPagarRepository>(
  "DistribuicaoContaPagarRepository",
  DistribuicaoContaPagarRepository
);

container.registerSingleton<ICategoriaContaReceberRepository>(
  "CategoriaContaReceberRepository",
  CategoriaContaReceberRepository
);

container.registerSingleton<ICategoriaContaPagarRepository>(
  "CategoriaContaPagarRepository",
  CategoriaContaPagarRepository
);

container.registerSingleton<ILancamentoDetalheRepository>(
  "LancamentoDetalheRepository",
  LancamentoDetalheRepository
);

container.registerSingleton<IClienteFornecedorRepository>(
  "ClienteFornecedorRepository",
  ClienteFornecedorRepository
);

container.registerSingleton<ITagClienteFornecedorRepository>(
  "TagClienteFornecedorRepository",
  TagClienteFornecedorRepository
);

container.registerSingleton<ICaracteristicaClienteFornecedorRepository>(
  "CaracteristicaClienteFornecedorRepository",
  CaracteristicaClienteFornecedorRepository
);

container.registerSingleton<ITagRepository>("TagRepository", TagRepository);
container.registerSingleton<IPedidoCompraRepository>(
  "PedidoCompraRepository",
  PedidoCompraRepository
);

container.registerSingleton<IItemPedidoCompraRepository>(
  "ItemPedidoCompraRepository",
  ItemPedidoCompraRepository
);

container.registerSingleton<IParcelaPedidoCompraRepository>(
  "ParcelaPedidoCompraRepository",
  ParcelaPedidoCompraRepository
);

container.registerSingleton<IPedidoCompraDepartamentoRepository>(
  "PedidoCompraDepartamentoRepository",
  PedidoCompraDepartamentoRepository
);

container.registerSingleton<IProdutoRepository>(
  "ProdutoRepository",
  ProdutoRepository
);

container.registerSingleton<IMovimentoFinanceiroRepository>(
  "MovimentoFinanceiroRepository",
  MovimentoFinanceiroRepository
);

container.registerSingleton<IMovimentoFinanceiroDepartamentoRepository>(
  "MovimentoFinanceiroDepartamentoRepository",
  MovimentoFinanceiroDepartamentoRepository
);

container.registerSingleton<IMovimentoFinanceiroCategoriaRepository>(
  "MovimentoFinanceiroCategoriaRepository",
  MovimentoFinanceiroCategoriaRepository
);

container.registerSingleton<IUltimaExecucaoRepository>(
  "UltimaExecucaoRepository",
  UltimaExecucaoRepository
);

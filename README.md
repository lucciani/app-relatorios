# Cadastro de empresas

**RF**

- Deve ser possível cadastrar uma nova empresa

**RNF**

- Usar o schema no banco postgresql com o nome "omie"

**RN**

- O usuário precisa estar logado no sistema e ser administrador.
- Não deve ser possível cadastrar uma empresa já existente.
- Cadastrar empresa somente com cnpj válido.

# Listagem de empresas

**RF**

- Deve ser possível listar todas as empresas
- Deve ser possível listar todas as empresas pelo - status ativo

**RNF**

- Usar o schema no banco postgresql com o nome "omie"

**RN**

- O usuário precsa estar logado no sistema

# Cadastro de Contas a receber - Lançamentos

**RF**

- Deve ser possível cadastrar uma nova contas a receber

**RNF**

- Criar o schema no banco postgresql com o nome "omie" com a tabela CONTA_RECEBER.
- Criar as tabelas DISTRIBUICAO_CONTA_RECEBER, LANCAMENTO_DETALHE e CATEGORIA_CONTA_RECEBER.

**RN**

- Não deve ser possível cadastrar uma conta a receber com o codigo lançamento, empresa e codigo cliente fornecedor já existente.
- Deve ser possivel inserir os dados de distribuição do conta a receber na tabela DISTRIBUICAO_CONTA_RECEBER.
- Deve ser possivel inserir os dados de lançamento detalhe na tabela LANCAMENTO_DETALHE.
- Deve ser possivel inserir os dados na tabela categoria conta a receber na tabela CATEGORIA_CONTA_RECEBER.

# Cadastro de Contas a pagar - Lançamentos

**RF**

- Deve ser possível cadastrar uma nova contas a pagar

**RNF**

- Criar o schema no banco postgresql com o nome "omie" com a tabela CONTA_PAGAR.
- Criar as tabelas DISTRIBUICAO_CONTA_PAGAR, LANCAMENTO_DETALHE e CATEGORIA_CONTA_PAGAR.

**RN**

- Não deve ser possível cadastrar uma conta a pagar com o codigo lançamento, empresa e codigo cliente fornecedor já existente.
- Deve ser possivel inserir os dados de distribuição do conta a pagar na tabela DISTRIBUICAO_CONTA_PAGAR .
- Deve ser possivel inserir os dados de lançamento detalhe na tabela LANCAMENTO_DETALHE .
- Deve ser possivel inserir os dados na categoria conta a pagar na tabela CATEGORIA_CONTA_PAGAR.

# Cadastro de cliente fornecedor

**RF**

- Deve ser possível cadastrar um novo cliente fornecedor.

**RNF**

- Criar o schema no banco postgresql com o nome "omie" e tabela CLIENTE_FORNECEDOR.
- Criar as tabelas TAG, CARACTERISTICA_CLIENTE_FORNECEDOR e TAG_CLIENTE_FORNECEDOR.

**RN**

- Não deve ser possível cadastrar um cliente fornecedor sem o codigo do cliente e a empresa.
- Deve ser possivel inserir os dados das tags dos clientes na tabela TAG .
- Deve ser possivel inserir os dados de caracteristica do cliente fornecedor na tabela CARACTERISTICA_CLIENTE_FORNECEDOR.
- Criar uma relação muitos pra muitos de tag e cliente fornecedor na tabela TAG_CLIENTE_FORNECEDOR.

# Cadastro de pedido compras

**RF**

- Deve ser possível cadastrar um novo peiddo de compra.

**RNF**

- Criar o schema no banco postgresql com o nome "omie" e tabela PEDIDO_COMPRA.
- Criar as tabelas ITEM_PEDIDO_COMPRA, PARCELA_PEDIDO_COMPRA e PEDIDO_COMPRA_DEPARTAMENTO e .

**RN**

- Não deve ser possível cadastrar um pedido de compra sem o codigo de pedido e a empresa.
- Deve ser possivel inserir os dados dos items de pedido de compra na tabela ITEM_PEDIDO_COMPRA .
- Deve ser possivel inserir os dados das parcelas de pedido na tabela PARCELA_PEDIDO_COMPRA.
- Deve ser possível inserir os dados de pedido de compra por departamento na tabela PEDIDO_COMPRA_DEPARTAMENTO.

# Cadastro de produtos

**RF**

- Deve ser possível cadastrar um novo produto.

**RNF**

- Criar o schema no banco postgresql com o nome "omie" e tabela PRODUTO.
- Criar as tabelas CARACTERISTICA_PRODUTO, IMAGEM_PRODUTO, KIT_PRODUTO, VIDEO_PRODUTO e TABELA_PRECO_PRODUTO .

**RN**

- Não deve ser possível cadastrar um pedido de compra sem o codigo do produto e a empresa.
- Deve ser possivel inserir os dados das caracteristicas do produto na tabela CARACTERISTICA_PRODUTO.
- Deve ser possivel inserir os dados das imagens dos produtos na tabela IMAGEM_PRODUTO.
- Deve ser possível inserir os dados dos kits do produto na tabela KIT_PRODUTO.
- Deve ser possível inserir os dados dos videos do produto na tabela VIDEO_PRODUTO.
- Criar uma relação muitos pra muitos de preco e produto na tabela PRECO_PRODUTO.



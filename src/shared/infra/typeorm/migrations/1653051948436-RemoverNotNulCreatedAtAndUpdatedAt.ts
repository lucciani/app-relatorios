import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoverNotNulCreatedAtAndUpdatedAt1653051948436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE omie.caracteristica_cliente_fornecedor  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.caracteristica_cliente_fornecedor  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.categoria_conta_pagar  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.categoria_conta_pagar  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.categoria_conta_receber  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.categoria_conta_receber  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.cliente_fornecedor  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.cliente_fornecedor  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.conta_pagar  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.conta_pagar  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.conta_receber  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.conta_receber  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.distribuicao_conta_pagar  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.distribuicao_conta_pagar  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.distribuicao_conta_receber  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.distribuicao_conta_receber  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.empresa  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.empresa_token  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.item_pedido_compra  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.item_pedido_compra  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.lancamento_detalhe  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.lancamento_detalhe  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro_categoria  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro_categoria  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro_departamento  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.movimento_financeiro_departamento  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.parcela_pedido_compra  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.parcela_pedido_compra  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.pedido_compra  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.pedido_compra  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.pedido_compra_departamento  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.pedido_compra_departamento  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.produto  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.produto  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.tag  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.tag  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.tag_cliente_fornecedor  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.tag_cliente_fornecedor  ALTER COLUMN updated_at DROP NOT NULL;
        ALTER TABLE omie.usuario  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.usuario_token  ALTER COLUMN created_at DROP NOT NULL;
        ALTER TABLE omie.usuario_token  ALTER COLUMN updated_at DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE omie.caracteristica_cliente_fornecedor ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.caracteristica_cliente_fornecedor ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.categoria_conta_pagar ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.categoria_conta_pagar ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.categoria_conta_receber ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.categoria_conta_receber ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.cliente_fornecedor ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.cliente_fornecedor ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.conta_pagar ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.conta_pagar ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.conta_receber ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.conta_receber ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.distribuicao_conta_pagar ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.distribuicao_conta_pagar ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.distribuicao_conta_receber ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.distribuicao_conta_receber ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.empresa ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.empresa_token ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.item_pedido_compra ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.item_pedido_compra ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.lancamento_detalhe ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.lancamento_detalhe ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro_categoria ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro_categoria ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro_departamento ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.movimento_financeiro_departamento ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.parcela_pedido_compra ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.parcela_pedido_compra ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.pedido_compra ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.pedido_compra ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.pedido_compra_departamento ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.pedido_compra_departamento ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.produto ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.produto ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.tag ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.tag ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.tag_cliente_fornecedor ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.tag_cliente_fornecedor ALTER COLUMN updated_at SET NOT NULL;
        ALTER TABLE omie.usuario ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.usuario_token ALTER COLUMN created_at SET NOT NULL;
        ALTER TABLE omie.usuario_token ALTER COLUMN updated_at SET NOT NULL;
    `);
  }
}

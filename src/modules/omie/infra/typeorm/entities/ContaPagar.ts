import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  dateOnlyTransformer,
  timestampOnlyTransformer,
} from "@utils/date-utils";

@Entity({ schema: "omie", name: "conta_pagar" })
class ContaPagar {
  @PrimaryColumn()
  codigo_lancamento_omie?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  codigo_cliente_fornecedor?: number;

  @Column()
  codigo_lancamento_integracao?: string;

  @Column()
  codigo_cliente_fornecedor_integracao?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_vencimento?: string;

  @Column()
  valor_documento?: number;

  @Column()
  codigo_categoria?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_previsao?: string;

  @Column()
  id_conta_corrente?: number;

  @Column()
  numero_documento_fiscal?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_emissao?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_entrada?: string;

  @Column()
  codigo_projeto?: number;

  @Column()
  observacao?: string;

  @Column()
  valor_pis?: number;

  @Column()
  retem_pis?: string;

  @Column()
  valor_cofins?: number;

  @Column()
  retem_cofins?: string;

  @Column()
  valor_csll?: number;

  @Column()
  retem_csll?: string;

  @Column()
  valor_ir?: number;

  @Column()
  retem_ir?: string;

  @Column()
  valor_iss?: number;

  @Column()
  retem_iss?: string;

  @Column()
  valor_inss?: number;

  @Column()
  retem_inss?: string;

  @Column()
  numero_pedido?: string;

  @Column()
  codigo_tipo_documento?: string;

  @Column()
  numero_documento?: string;

  @Column()
  numero_parcela?: string;

  @Column()
  chave_nfe?: string;

  @Column()
  codigo_barras_ficha_compensacao?: string;

  @Column()
  codigo_vendedor?: number;

  @Column()
  id_origem?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_data_inclusao?: string;

  @Column()
  info_usuario_inclusao?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_data_alteracao?: string;

  @Column()
  info_usuario_alteracao?: string;

  @Column()
  info_importado_api?: string;

  @Column()
  operacao?: string;

  @Column()
  status_titulo?: string;

  @Column()
  nsu?: string;

  @Column()
  acao?: string;

  @Column()
  id_conta_corrente_integracao?: string;

  @Column()
  bloqueado?: string;

  @Column()
  baixa_bloqueada?: string;

  @Column()
  codigo_cmc7_cheque?: string;

  @Column()
  importado_api?: string;

  @Column()
  bloquear_exclusao?: string;

  @Column()
  codigo_forma_pagamento?: string;

  @Column()
  banco_transferencia?: string;

  @Column()
  agencia_transferencia?: string;

  @Column()
  conta_corrente_transferencia?: string;

  @Column()
  finalidade_transferencia?: string;

  @Column()
  cpf_cnpj_transferencia?: string;

  @Column()
  nome_transferencia?: string;

  @Column()
  codigo_barras_boleto?: string;

  @Column()
  juros_boleto?: number;

  @Column()
  multa_boleto?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @BeforeInsert()
  setCreateDate(): void {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updated_at = new Date();
  }
}

export { ContaPagar };

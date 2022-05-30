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
} from "../../../../../utils/date-utils";

@Entity({ schema: "omie", name: "conta_receber" })
class ContaReceber {
  @PrimaryColumn()
  codigo_lancamento_omie: number;

  @Column()
  id_empresa: number;

  @Column()
  codigo_lancamento_integracao?: string;

  @Column()
  codigo_cliente_fornecedor?: number;

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
  numero_documento?: string;

  @Column()
  numero_parcela?: string;

  @Column()
  codigo_tipo_documento?: string;

  @Column()
  numero_documento_fiscal?: string;

  @Column()
  numero_pedido?: string;

  @Column()
  chave_nfe?: string;

  @Column()
  observacao?: string;

  @Column()
  codigo_barras_ficha_compensacao?: string;

  @Column()
  codigo_cmc7_cheque?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_emissao?: string;

  @Column()
  id_origem?: string;

  @Column()
  operacao?: string;

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
  bloqueado?: string;

  @Column()
  bloquear_baixa?: string;

  @Column()
  importado_api?: string;

  @Column()
  baixar_documento?: string;

  @Column()
  conciliar_documento?: string;

  @Column()
  acao?: string;

  // @Column()
  // lancamento_detalhe?: string;

  // @Column()
  // distribuicao?: string;

  @Column()
  status_titulo?: string;

  @Column()
  codigo_vendedor?: number;

  @Column()
  codigo_projeto?: number;

  @Column()
  nsu?: string;

  @Column({
    type: "date",
    transformer: dateOnlyTransformer,
    nullable: true,
  })
  data_registro?: string;

  @Column()
  tipo_agrupamento?: string;

  // @Column()
  // info?: string;
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

  // @Column()
  // boleto?: string;
  @Column()
  cgerado?: string;
  @Column()
  ddtembol?: string;
  @Column()
  cnumboleto?: string;
  @Column()
  cnumbancario?: string;
  @Column()
  nperjuros?: number;
  @Column()
  npermulta?: number;

  @Column()
  ncodpedido?: number;

  @Column()
  bloquear_exclusao?: string;

  @Column()
  ncodos?: number;

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

export { ContaReceber };

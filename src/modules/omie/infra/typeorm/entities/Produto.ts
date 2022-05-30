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

@Entity({ schema: "omie", name: "produto" })
class Produto {
  @PrimaryColumn()
  codigo_produto?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  codigo_produto_integracao?: string;

  @Column()
  descricao?: string;

  @Column()
  codigo?: string;

  @Column()
  unidade?: string;

  @Column()
  ncm?: string;

  @Column()
  ean?: string;

  @Column()
  valor_unitario?: number;

  @Column()
  codigo_familia?: number;

  @Column()
  tipoitem?: string;

  @Column()
  origem_mercadoria?: string;

  @Column()
  id_preco_tabelado?: number;

  @Column()
  id_cest?: string;

  @Column()
  cupom_fiscal?: string;

  @Column()
  market_place?: string;

  @Column()
  indicador_escala?: string;

  @Column()
  cnpj_fabricante?: string;

  @Column()
  peso_liq?: number;

  @Column()
  peso_bruto?: number;

  @Column()
  altura?: number;

  @Column()
  largura?: number;

  @Column()
  profundidade?: number;

  @Column()
  marca?: string;

  @Column()
  modelo?: string;

  @Column()
  dias_garantia?: number;

  @Column()
  dias_crossdocking?: number;

  @Column()
  descr_detalhada?: string;

  @Column()
  obs_internas?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_dinc?: string;

  @Column()
  info_uinc?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_dalt?: string;

  @Column()
  info_ualt?: string;

  @Column()
  cimpapi?: string;

  @Column()
  exibir_descricao_nfe?: string;

  @Column()
  exibir_descricao_pedido?: string;

  @Column()
  cst_icms?: string;

  @Column()
  modalidade_icms?: string;

  @Column()
  csosn_icms?: string;

  @Column()
  aliquota_icms?: number;

  @Column()
  red_base_icms?: number;

  @Column()
  motivo_deson_icms?: string;

  @Column()
  per_icms_fcp?: number;

  @Column()
  codigo_beneficio?: string;

  @Column()
  cst_pis?: string;

  @Column()
  aliquota_pis?: number;

  @Column()
  cst_cofins?: string;

  @Column()
  aliquota_cofins?: number;

  @Column()
  cfop?: string;

  @Column()
  dadosibpt_aliqfederal?: number;

  @Column()
  dadosibpt_aliqestadual?: number;

  @Column()
  dadosibpt_aliqmunicipal?: number;

  @Column()
  dadosibpt_fonte?: string;

  @Column()
  dadosibpt_chave?: string;

  @Column()
  dadosibpt_versao?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  dadosibpt_valido_de?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  dadosibpt_valido_ate?: string;

  @Column()
  codint_familia?: string;

  @Column()
  descricao_familia?: string;

  @Column()
  bloqueado?: string;

  @Column()
  bloquear_exclusao?: string;

  @Column()
  importado_api?: string;

  @Column()
  inativo?: string;

  @Column()
  lead_time?: number;

  @Column()
  aliquota_ibpt?: number;

  @Column()
  cest?: string;

  @Column()
  quantidade_estoque?: number;

  @Column()
  estoque_minimo?: number;

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

export { Produto };

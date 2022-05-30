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

@Entity({ schema: "omie", name: "movimento_financeiro" })
class MovimentoFinanceiro {
  @PrimaryColumn()
  ncodtitulo?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  ncodcliente?: number;

  @Column()
  cgrupo?: string;

  @Column()
  corigem?: string;

  @Column()
  ccodprojeto?: number;

  @Column()
  ccodinttitulo?: string;

  @Column()
  cnumtitulo?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtemissao?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtvenc?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtprevisao?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtpagamento?: string;

  @Column()
  ccpfcnpjcliente?: string;

  @Column()
  ncodctr?: number;

  @Column()
  cnumctr?: string;

  @Column()
  ncodos?: number;

  @Column()
  cnumos?: string;

  @Column()
  ncodcc?: number;

  @Column()
  cstatus?: string;

  @Column()
  cnatureza?: string;

  @Column()
  ctipo?: string;

  @Column()
  coperacao?: string;

  @Column()
  cnumdocfiscal?: string;

  @Column()
  ccodcateg?: string;

  @Column()
  cnumparcela?: string;

  @Column()
  nvalortitulo?: number;

  @Column()
  nvalorpis?: number;

  @Column()
  cretpis?: string;

  @Column()
  nvalorcofins?: number;

  @Column()
  cretcofins?: string;

  @Column()
  nvalorcsll?: number;

  @Column()
  cretcsll?: string;

  @Column()
  nvalorir?: number;

  @Column()
  cretir?: string;

  @Column()
  nvaloriss?: number;

  @Column()
  cretiss?: string;

  @Column()
  nvalorinss?: number;

  @Column()
  cretinss?: string;

  @Column()
  observacao?: string;

  @Column()
  ccodvendedor?: number;

  @Column()
  ncodcomprador?: number;

  @Column()
  ccodigobarras?: string;

  @Column()
  cnsu?: string;

  @Column()
  ncodnf?: number;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtregistro?: string;

  @Column()
  cnumboleto?: string;

  @Column()
  cchavenfe?: string;

  @Column()
  ncodtitrepet?: number;

  @Column()
  ncodmovcc?: number;

  @Column()
  nvalormovcc?: number;

  @Column()
  ncodmovccrepet?: number;

  @Column()
  ndesconto?: number;

  @Column()
  njuros?: number;

  @Column()
  nmulta?: number;

  @Column()
  ncodbaixa?: number;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtcredito?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  ddtconcilia?: string;

  @Column()
  cusconcilia?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  ddtinc?: string;

  @Column()
  cusinc?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  ddtalt?: string;

  @Column()
  cusalt?: string;

  @Column()
  resumo_cliquidado?: string;

  @Column()
  resumo_nvalpago?: number;

  @Column()
  resumo_nvalaberto?: number;

  @Column()
  resumo_ndesconto?: number;

  @Column()
  resumo_njuros?: number;

  @Column()
  resumo_nmulta?: string;

  @Column()
  resumo_nvalliquido?: string;

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

export { MovimentoFinanceiro };

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

@Entity({ schema: "omie", name: "pedido_compra" })
class PedidoCompra {
  @PrimaryColumn()
  ncodped?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  ccodintped?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  dincdata?: string;

  @Column()
  cetapa?: string;

  @Column()
  cnumero?: string;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  ddtprevisao?: string;

  @Column()
  ccodparc?: string;

  @Column()
  nqtdeparc?: string;

  @Column()
  ncodfor?: number;

  @Column()
  ccodintfor?: string;

  @Column()
  ccodcateg?: string;

  @Column()
  ncodcompr?: number;

  @Column()
  ccontato?: string;

  @Column()
  ncodcc?: number;

  @Column()
  ncodintcc?: string;

  @Column()
  ncodproj?: number;

  @Column()
  cnumpedido?: string;

  @Column()
  cobs?: string;

  @Column()
  cobsint?: string;

  @Column()
  frete_ncodtransp?: number;

  @Column()
  frete_ccodinttransp?: string;

  @Column()
  frete_ctpfrete?: string;

  @Column()
  frete_cplaca?: string;

  @Column()
  frete_cuf?: string;

  @Column()
  frete_nqtdvol?: number;

  @Column()
  frete_cespvol?: string;

  @Column()
  frete_cmarvol?: string;

  @Column()
  frete_cnumvol?: string;

  @Column()
  frete_npesoliq?: number;

  @Column()
  frete_npesobruto?: number;

  @Column()
  frete_nvalfrete?: number;

  @Column()
  frete_nvalseguro?: number;

  @Column()
  frete_clacre?: string;

  @Column()
  frete_valoutras?: number;

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

export { PedidoCompra };

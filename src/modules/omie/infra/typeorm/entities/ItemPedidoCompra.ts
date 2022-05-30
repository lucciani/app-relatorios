import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "item_pedido_compra" })
class ItemPedidoCompra {
  @PrimaryColumn()
  ncodped?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  ccodintitem?: string;

  @PrimaryColumn()
  ncoditem?: number;

  @Column()
  ccodintprod?: string;

  @Column()
  ncodprod?: number;

  @Column()
  cproduto?: string;

  @Column()
  cdescricao?: string;

  @Column()
  cncm?: string;

  @Column()
  cean?: string;

  @Column()
  cunidade?: string;

  @Column()
  npesoliq?: number;

  @Column()
  npesobruto?: number;

  @Column()
  nqtde?: number;

  @Column()
  nvalunit?: number;

  @Column()
  nvalmerc?: number;

  @Column()
  ndesconto?: number;

  @Column()
  nvaloricms?: number;

  @Column()
  nvalorst?: number;

  @Column()
  nvaloripi?: number;

  @Column()
  nvalorpis?: number;

  @Column()
  nvalorcofins?: number;

  @Column()
  nfrete?: number;

  @Column()
  nseguro?: number;

  @Column()
  ndespesas?: number;

  @Column()
  nvaltot?: number;

  @Column()
  cobs?: string;

  @Column()
  cmkpatupv?: string;

  @Column()
  cmkpatusm?: string;

  @Column()
  nmkpperc?: number;

  @Column()
  codigo_local_estoque?: number;

  @Column()
  ccodcateg?: string;

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

export { ItemPedidoCompra };

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { dateOnlyTransformer } from "@utils/date-utils";

@Entity({ schema: "omie", name: "parcela_pedido_compra" })
class ParcelaPedidoCompra {
  @PrimaryColumn()
  ncodped?: number;

  @PrimaryColumn()
  nparcela?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column({ type: "date", transformer: dateOnlyTransformer, nullable: true })
  dvencto?: string;

  @Column()
  nvalor?: number;

  @Column()
  ndias?: number;

  @Column()
  npercent?: number;

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

export { ParcelaPedidoCompra };

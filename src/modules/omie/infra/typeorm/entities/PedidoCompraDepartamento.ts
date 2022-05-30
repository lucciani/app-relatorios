import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "pedido_compra_departamento" })
class PedidoCompraDepartamento {
  @PrimaryColumn()
  ncodped?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  ccoddepto?: string;

  @Column()
  nperc?: number;

  @Column()
  nvalor?: number;

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

export { PedidoCompraDepartamento };

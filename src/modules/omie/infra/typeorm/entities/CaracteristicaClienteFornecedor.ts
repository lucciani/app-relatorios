import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "caracteristica_cliente_fornecedor" })
class CaracteristicaClienteFornecedor {
  @PrimaryColumn()
  codigo_cliente_omie?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  campo?: string;

  @Column()
  conteudo?: string;

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

export { CaracteristicaClienteFornecedor };

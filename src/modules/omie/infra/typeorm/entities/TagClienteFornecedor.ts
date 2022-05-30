import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "tag_cliente_fornecedor" })
class TagClienteFornecedor {
  @PrimaryColumn()
  codigo_cliente_omie?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  ncodtag?: number;

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

export { TagClienteFornecedor };

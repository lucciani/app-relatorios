import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "categoria_conta_receber" })
class CategoriaContaReceber {
  @PrimaryColumn()
  codigo_lancamento_omie?: number;

  @PrimaryColumn()
  codigo_categoria?: string;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  valor?: number;

  @Column()
  percentual?: number;

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

export { CategoriaContaReceber };

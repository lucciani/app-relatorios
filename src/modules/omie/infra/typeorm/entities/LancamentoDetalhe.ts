import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "lancamento_detalhe" })
class LancamentoDetalhe {
  @PrimaryColumn()
  codigo_lancamento?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @Column()
  ncodint?: string;

  @Column()
  coo?: string;

  @Column()
  ccf?: string;

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

export { LancamentoDetalhe };

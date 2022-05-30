import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "movimento_financeiro_departamento" })
class MovimentoFinanceiroDepartamento {
  @PrimaryColumn()
  ncodtitulo?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  codigo?: string;

  @Column()
  ndistrpercentual?: number;

  @Column()
  ndistrvalor?: number;

  @Column()
  nvalorfixo?: string;

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

export { MovimentoFinanceiroDepartamento };

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "omie", name: "distribuicao_conta_pagar" })
class DistribuicaoContaPagar {
  @PrimaryColumn()
  codigo_lancamento_omie?: number;

  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  ccoddep?: number;

  @Column()
  cdesdep?: string;

  @Column()
  nvaldep?: number;

  @Column()
  nperdep?: number;

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

export { DistribuicaoContaPagar };

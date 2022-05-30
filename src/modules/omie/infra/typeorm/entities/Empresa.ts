import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { v4 as uuidV4 } from "uuid";

@Entity({ schema: "omie", name: "empresa" })
class Empresa {
  @PrimaryGeneratedColumn({ name: "id" })
  id?: number;

  @Column({ name: "razao_social" })
  razaosocial: string;

  @Column({ name: "nome_fantasia" })
  nomefantasia: string;

  @Column({ name: "cnpj" })
  cnpj: string;

  @Column({ name: "ie" })
  ie: string;

  @Column({ name: "apelido" })
  apelido: string;

  @Column({ name: "ativo" })
  ativo: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @BeforeInsert()
  setCreateDate(): void {
    this.created_at = new Date();
  }
}

export { Empresa };

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Empresa } from "./Empresa";

@Entity({ schema: "omie", name: "empresa_token" })
class TokenEmpresa {
  @OneToOne(() => Empresa)
  @JoinColumn({ name: "id_empresa" })
  company: Empresa;

  @PrimaryColumn({ name: "id_empresa" })
  empresaid: number;

  @Column({ name: "app_key" })
  appkey: string;

  @Column({ name: "app_secret" })
  appsecret: string;

  @CreateDateColumn()
  created_at?: Date;

  @BeforeInsert()
  setCreateDate(): void {
    this.created_at = new Date();
  }
}

export { TokenEmpresa };

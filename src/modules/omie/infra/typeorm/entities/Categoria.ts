import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity({ schema: "omie", name: "CATEGORIA" })
class Categoria {
  @PrimaryColumn({ name: "codigo" })
  codigo?: string;

  @Column({ name: "descricao" })
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.codigo) {
      this.codigo = uuidV4();
    }
  }
}

export { Categoria };

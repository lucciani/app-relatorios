import { Column, Entity, PrimaryColumn } from "typeorm";

import { timestampOnlyTransformer } from "@utils/date-utils";

@Entity({ schema: "omie", name: "ultima_execucao" })
class UltimaExecucao {
  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  nome_api?: string;

  @PrimaryColumn()
  objeto?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  data?: string;
}

export { UltimaExecucao };

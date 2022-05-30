import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { timestampOnlyTransformer } from "@utils/date-utils";

@Entity({ schema: "omie", name: "cliente_fornecedor" })
class ClienteFornecedor {
  @PrimaryColumn()
  id_empresa?: number;

  @PrimaryColumn()
  codigo_cliente_omie?: number;

  @Column()
  codigo_cliente_integracao?: string;

  @Column()
  razao_social?: string;

  @Column()
  cnpj_cpf?: string;

  @Column()
  nome_fantasia?: string;

  @Column()
  telefone1_ddd?: string;

  @Column()
  telefone1_numero?: string;

  @Column()
  contato?: string;

  @Column()
  endereco?: string;

  @Column()
  endereco_numero?: string;

  @Column()
  bairro?: string;

  @Column()
  complemento?: string;

  @Column()
  estado?: string;

  @Column()
  cidade?: string;

  @Column()
  cep?: string;

  @Column()
  codigo_pais?: string;

  @Column()
  separar_endereco?: string;

  @Column()
  telefone2_ddd?: string;

  @Column()
  telefone2_numero?: string;

  @Column()
  fax_ddd?: string;

  @Column()
  fax_numero?: string;

  @Column()
  email?: string;

  @Column()
  homepage?: string;

  @Column()
  inscricao_estadual?: string;

  @Column()
  inscricao_municipal?: string;

  @Column()
  inscricao_suframa?: string;

  @Column()
  optante_simples_nacional?: string;

  @Column()
  tipo_atividade?: string;

  @Column()
  cnae?: string;

  @Column()
  produtor_rural?: string;

  @Column()
  contribuinte?: string;

  @Column()
  observacao?: string;

  @Column()
  obs_detalhadas?: string;

  @Column()
  recomendacao_atraso?: string;

  @Column()
  pessoa_fisica?: string;

  @Column()
  exterior?: string;

  @Column()
  logradouro?: string;

  @Column()
  importado_api?: string;

  @Column()
  bloqueado?: string;

  @Column()
  cidade_ibge?: string;

  @Column()
  valor_limite_credito?: number;

  @Column()
  bloquear_faturamento?: string;

  @Column()
  recomendacoes_numero_parcelas?: string;

  @Column()
  recomendacoes_codigo_vendedor?: number;

  @Column()
  recomnedacoes_email_fatura?: string;

  @Column()
  recomendacoes_gerar_boletos?: string;

  @Column()
  recomendacoes_codigo_transportadora?: number;

  @Column()
  enderentrega_entrazaosocial?: string;

  @Column()
  enderentrega_entcnpjcpf?: string;

  @Column()
  enderentrega_entendereco?: string;

  @Column()
  enderentrega_entnumero?: string;

  @Column()
  enderentrega_entcomplemento?: string;

  @Column()
  enderentrega_entbairro?: string;

  @Column()
  enderentrega_entcep?: string;

  @Column()
  enderentrega_entestado?: string;

  @Column()
  enderentrega_entcidade?: string;

  @Column()
  enderentrega_entsepararendereco?: string;

  @Column()
  enderentrega_enttelefone?: string;

  @Column()
  enderentrega_entie?: string;

  @Column()
  nif?: string;

  @Column()
  documento_exterior?: string;

  @Column()
  inativo?: string;

  @Column()
  dadosbancarios_codigo_banco?: string;

  @Column()
  dadosbancarios_agencia?: string;

  @Column()
  dadosbancarios_conta_corrente?: string;

  @Column()
  dadosbancarios_doc_titular?: string;

  @Column()
  dadosbancarios_nome_titular?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_data_inclusao?: string;

  @Column()
  info_usuario_inclusao?: string;

  @Column({
    type: "timestamp",
    transformer: timestampOnlyTransformer,
    nullable: true,
  })
  info_data_alteracao?: string;

  @Column()
  info_usuario_alteracao?: string;

  @Column()
  info_importado_api?: string;

  @Column()
  bloquear_exclusao?: string;

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

export { ClienteFornecedor };

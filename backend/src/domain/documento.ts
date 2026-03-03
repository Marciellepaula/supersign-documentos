export type DocumentoStatus = "pendente" | "assinado";

export interface Documento {
  id: string;
  titulo: string;
  descricao: string | null;
  status: DocumentoStatus;
  criado_em: Date;
}

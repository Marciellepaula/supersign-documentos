import type { Documento } from "./documento.js";

export interface CreateDocumentoInput {
  titulo: string;
  descricao?: string | null;
  status?: "pendente" | "assinado";
}

export interface UpdateStatusInput {
  status: "pendente" | "assinado";
}
export interface DocumentoRepository {
  create(data: CreateDocumentoInput): Promise<Documento>;
  findAll(): Promise<Documento[]>;
  findById(id: string): Promise<Documento | null>;
  updateStatus(id: string, status: "pendente" | "assinado"): Promise<Documento | null>;
  delete(id: string): Promise<boolean>;
}

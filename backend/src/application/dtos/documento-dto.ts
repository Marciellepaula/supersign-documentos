export interface CreateDocumentoDTO {
  titulo: string;
  descricao?: string | null;
  status?: "pendente" | "assinado";
}

export interface UpdateStatusDocumentoDTO {
  status: "pendente" | "assinado";
}

export interface DocumentoResponseDTO {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string;
  criado_em: string; 
}

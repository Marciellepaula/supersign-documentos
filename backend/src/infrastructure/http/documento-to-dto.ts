import type { Documento } from "../../domain/documento.js";
import type { DocumentoResponseDTO } from "../../application/dtos/documento-dto.js";

export function documentoToResponseDTO(doc: Documento): DocumentoResponseDTO {
  return {
    id: doc.id,
    titulo: doc.titulo,
    descricao: doc.descricao,
    status: doc.status,
    criado_em: doc.criado_em.toISOString(),
  };
}

import type { DocumentoRepository } from "../../domain/documento-repository.js";
import type { CreateDocumentoDTO } from "../dtos/documento-dto.js";

export class CriarDocumentoUseCase {
  constructor(private readonly repo: DocumentoRepository) {}

  async execute(dto: CreateDocumentoDTO) {
    const titulo = (dto.titulo ?? "").trim();
    if (!titulo) {
      throw new Error("titulo é obrigatório");
    }
    return this.repo.create({
      titulo,
      descricao: dto.descricao ?? null,
      status: dto.status ?? "pendente",
    });
  }
}

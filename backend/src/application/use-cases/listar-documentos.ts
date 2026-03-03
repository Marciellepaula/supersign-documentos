import type { DocumentoRepository } from "../../domain/documento-repository.js";

export class ListarDocumentosUseCase {
  constructor(private readonly repo: DocumentoRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}

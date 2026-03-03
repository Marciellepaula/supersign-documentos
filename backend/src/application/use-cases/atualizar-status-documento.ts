import type { DocumentoRepository } from "../../domain/documento-repository.js";

export class AtualizarStatusDocumentoUseCase {
  constructor(private readonly repo: DocumentoRepository) {}

  async execute(id: string, status: "pendente" | "assinado") {
    if (!id?.trim()) throw new Error("id é obrigatório");
    if (!["pendente", "assinado"].includes(status)) {
      throw new Error("status deve ser 'pendente' ou 'assinado'");
    }
    const atualizado = await this.repo.updateStatus(id, status);
    if (!atualizado) throw new Error("Documento não encontrado");
    return atualizado;
  }
}

import type { DocumentoRepository } from "../../domain/documento-repository.js";

export class DeletarDocumentoUseCase {
  constructor(private readonly repo: DocumentoRepository) {}

  async execute(id: string) {
    if (!id?.trim()) throw new Error("id é obrigatório");
    const deletado = await this.repo.delete(id);
    if (!deletado) throw new Error("Documento não encontrado");
    return true;
  }
}

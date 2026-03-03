import { describe, it, expect, vi } from "vitest";
import { DeletarDocumentoUseCase } from "./deletar-documento.js";

describe("DeletarDocumentoUseCase", () => {
  it("deve deletar documento e retornar true", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn().mockResolvedValue(true),
    };
    const useCase = new DeletarDocumentoUseCase(repo);
    const result = await useCase.execute("doc-123");
    expect(result).toBe(true);
    expect(repo.delete).toHaveBeenCalledWith("doc-123");
  });

  it("deve lançar erro se id estiver vazio", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new DeletarDocumentoUseCase(repo);
    await expect(useCase.execute("   ")).rejects.toThrow("id é obrigatório");
    expect(repo.delete).not.toHaveBeenCalled();
  });

  it("deve lançar erro se documento não for encontrado", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn().mockResolvedValue(false),
    };
    const useCase = new DeletarDocumentoUseCase(repo);
    await expect(useCase.execute("id-inexistente")).rejects.toThrow("Documento não encontrado");
    expect(repo.delete).toHaveBeenCalledWith("id-inexistente");
  });
});

import { describe, it, expect, vi } from "vitest";
import { CriarDocumentoUseCase } from "./criar-documento.js";

describe("CriarDocumentoUseCase", () => {
  it("deve criar documento com titulo e status padrão pendente", async () => {
    const doc = {
      id: "1",
      titulo: "Contrato X",
      descricao: null,
      status: "pendente" as const,
      criado_em: new Date(),
    };
    const repo = {
      create: vi.fn().mockResolvedValue(doc),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new CriarDocumentoUseCase(repo);
    const result = await useCase.execute({ titulo: "Contrato X" });
    expect(result.titulo).toBe("Contrato X");
    expect(result.status).toBe("pendente");
    expect(repo.create).toHaveBeenCalledWith({
      titulo: "Contrato X",
      descricao: null,
      status: "pendente",
    });
  });

  it("deve lançar erro se titulo estiver vazio", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new CriarDocumentoUseCase(repo);
    await expect(useCase.execute({ titulo: "   " })).rejects.toThrow("titulo é obrigatório");
    expect(repo.create).not.toHaveBeenCalled();
  });
});

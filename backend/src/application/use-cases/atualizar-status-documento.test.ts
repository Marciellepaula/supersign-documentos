import { describe, it, expect, vi } from "vitest";
import { AtualizarStatusDocumentoUseCase } from "./atualizar-status-documento.js";

describe("AtualizarStatusDocumentoUseCase", () => {
  it("deve atualizar status para assinado", async () => {
    const doc = {
      id: "abc-123",
      titulo: "Contrato",
      descricao: null,
      status: "assinado" as const,
      criado_em: new Date(),
    };
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn().mockResolvedValue(doc),
      delete: vi.fn(),
    };
    const useCase = new AtualizarStatusDocumentoUseCase(repo);
    const result = await useCase.execute("abc-123", "assinado");
    expect(result.status).toBe("assinado");
    expect(repo.updateStatus).toHaveBeenCalledWith("abc-123", "assinado");
  });

  it("deve atualizar status para pendente", async () => {
    const doc = {
      id: "xyz",
      titulo: "Doc",
      descricao: null,
      status: "pendente" as const,
      criado_em: new Date(),
    };
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn().mockResolvedValue(doc),
      delete: vi.fn(),
    };
    const useCase = new AtualizarStatusDocumentoUseCase(repo);
    const result = await useCase.execute("xyz", "pendente");
    expect(result.status).toBe("pendente");
    expect(repo.updateStatus).toHaveBeenCalledWith("xyz", "pendente");
  });

  it("deve lançar erro se id estiver vazio", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new AtualizarStatusDocumentoUseCase(repo);
    await expect(useCase.execute("   ", "assinado")).rejects.toThrow("id é obrigatório");
    expect(repo.updateStatus).not.toHaveBeenCalled();
  });

  it("deve lançar erro se status for inválido", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new AtualizarStatusDocumentoUseCase(repo);
    await expect(useCase.execute("abc", "invalido" as "pendente")).rejects.toThrow(
      "status deve ser 'pendente' ou 'assinado'"
    );
    expect(repo.updateStatus).not.toHaveBeenCalled();
  });

  it("deve lançar erro se documento não for encontrado", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      updateStatus: vi.fn().mockResolvedValue(null),
      delete: vi.fn(),
    };
    const useCase = new AtualizarStatusDocumentoUseCase(repo);
    await expect(useCase.execute("id-inexistente", "assinado")).rejects.toThrow(
      "Documento não encontrado"
    );
  });
});

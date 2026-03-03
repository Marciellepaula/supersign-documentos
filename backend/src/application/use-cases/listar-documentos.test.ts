import { describe, it, expect, vi } from "vitest";
import { ListarDocumentosUseCase } from "./listar-documentos.js";

describe("ListarDocumentosUseCase", () => {
  it("deve retornar lista de documentos do repositório", async () => {
    const docs = [
      {
        id: "1",
        titulo: "Doc A",
        descricao: null,
        status: "pendente" as const,
        criado_em: new Date(),
      },
      {
        id: "2",
        titulo: "Doc B",
        descricao: "Desc",
        status: "assinado" as const,
        criado_em: new Date(),
      },
    ];
    const repo = {
      create: vi.fn(),
      findAll: vi.fn().mockResolvedValue(docs),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new ListarDocumentosUseCase(repo);
    const result = await useCase.execute();
    expect(result).toHaveLength(2);
    expect(result[0].titulo).toBe("Doc A");
    expect(result[1].titulo).toBe("Doc B");
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar array vazio quando não há documentos", async () => {
    const repo = {
      create: vi.fn(),
      findAll: vi.fn().mockResolvedValue([]),
      findById: vi.fn(),
      updateStatus: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new ListarDocumentosUseCase(repo);
    const result = await useCase.execute();
    expect(result).toEqual([]);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });
});

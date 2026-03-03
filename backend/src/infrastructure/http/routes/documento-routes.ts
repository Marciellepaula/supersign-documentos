import type { FastifyInstance } from "fastify";
import { CriarDocumentoUseCase } from "../../../application/use-cases/criar-documento.js";
import { ListarDocumentosUseCase } from "../../../application/use-cases/listar-documentos.js";
import { AtualizarStatusDocumentoUseCase } from "../../../application/use-cases/atualizar-status-documento.js";
import { DeletarDocumentoUseCase } from "../../../application/use-cases/deletar-documento.js";
import type { DocumentoRepository } from "../../../domain/documento-repository.js";
import { documentoToResponseDTO } from "../documento-to-dto.js";
import type { CreateDocumentoDTO } from "../../../application/dtos/documento-dto.js";

interface DocumentoRoutesOptions {
  documentoRepository: DocumentoRepository;
}

export async function registerDocumentoRoutes(
  app: FastifyInstance,
  opts: DocumentoRoutesOptions
) {
  const { documentoRepository } = opts;

  const criarDocumento = new CriarDocumentoUseCase(documentoRepository);
  const listarDocumentos = new ListarDocumentosUseCase(documentoRepository);
  const atualizarStatus = new AtualizarStatusDocumentoUseCase(documentoRepository);
  const deletarDocumento = new DeletarDocumentoUseCase(documentoRepository);


  app.post<{
    Body: CreateDocumentoDTO;
  }>("/documentos", async (request, reply) => {
    try {
      const body = request.body;
      if (!body || typeof body.titulo !== "string") {
        return reply.status(400).send({
          error: "Bad Request",
          message: "Corpo inválido. 'titulo' (string) é obrigatório.",
        });
      }
      const doc = await criarDocumento.execute({
        titulo: body.titulo,
        descricao: body.descricao ?? null,
        status: body.status,
      });
      return reply.status(201).send(documentoToResponseDTO(doc));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar documento";
      return reply.status(400).send({ error: "Bad Request", message });
    }
  });


  app.get("/documentos", async (_request, reply) => {
    try {
      const docs = await listarDocumentos.execute();
      return reply.send(docs.map(documentoToResponseDTO));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao listar documentos";
      return reply.status(500).send({ error: "Internal Server Error", message });
    }
  });

  app.patch<{
    Params: { id: string };
    Body: { status?: string };
  }>("/documentos/:id/status", async (request, reply) => {
    try {
      const { id } = request.params;
      const body = request.body ?? {};
      const status = body.status;
      if (status !== "pendente" && status !== "assinado") {
        return reply.status(400).send({
          error: "Bad Request",
          message: "Campo 'status' deve ser 'pendente' ou 'assinado'.",
        });
      }
      const doc = await atualizarStatus.execute(id, status);
      return reply.send(documentoToResponseDTO(doc));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar status";
      if (message.includes("não encontrado")) {
        return reply.status(404).send({ error: "Not Found", message });
      }
      return reply.status(400).send({ error: "Bad Request", message });
    }
  });

  app.delete<{ Params: { id: string } }>("/documentos/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      await deletarDocumento.execute(id);
      return reply.status(204).send();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao deletar documento";
      if (message.includes("não encontrado")) {
        return reply.status(404).send({ error: "Not Found", message });
      }
      return reply.status(400).send({ error: "Bad Request", message });
    }
  });
}

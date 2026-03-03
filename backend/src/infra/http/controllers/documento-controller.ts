import type { FastifyRequest, FastifyReply } from "fastify";
import type { CriarDocumentoUseCase } from "../../../application/use-cases/criar-documento.js";
import type { ListarDocumentosUseCase } from "../../../application/use-cases/listar-documentos.js";
import type { AtualizarStatusDocumentoUseCase } from "../../../application/use-cases/atualizar-status-documento.js";
import type { DeletarDocumentoUseCase } from "../../../application/use-cases/deletar-documento.js";
import { documentoToResponseDTO } from "../documento-to-dto.js";
import type { CreateDocumentoDTO } from "../../../application/dtos/documento-dto.js";

export class DocumentoController {
  constructor(
    private readonly criarDocumentoUseCase: CriarDocumentoUseCase,
    private readonly listarDocumentosUseCase: ListarDocumentosUseCase,
    private readonly atualizarStatusUseCase: AtualizarStatusDocumentoUseCase,
    private readonly deletarDocumentoUseCase: DeletarDocumentoUseCase
  ) {}

  async listar(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const docs = await this.listarDocumentosUseCase.execute();
      return reply.send(docs.map(documentoToResponseDTO));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao listar documentos";
      return reply.status(500).send({ error: "Internal Server Error", message });
    }
  }

  async criar(
    request: FastifyRequest<{ Body: CreateDocumentoDTO }>,
    reply: FastifyReply
  ) {
    try {
      const body = request.body as CreateDocumentoDTO | undefined;
      if (!body || typeof body.titulo !== "string") {
        return reply.status(400).send({
          error: "Bad Request",
          message: "Corpo inválido. 'titulo' (string) é obrigatório.",
        });
      }
      const doc = await this.criarDocumentoUseCase.execute({
        titulo: body.titulo,
        descricao: body.descricao ?? null,
        status: body.status,
      });
      return reply.status(201).send(documentoToResponseDTO(doc));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar documento";
      return reply.status(400).send({ error: "Bad Request", message });
    }
  }

  async atualizarStatus(
    request: FastifyRequest<{ Params: { id: string }; Body: { status?: string } }>,
    reply: FastifyReply
  ) {
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
      const doc = await this.atualizarStatusUseCase.execute(id, status);
      return reply.send(documentoToResponseDTO(doc));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar status";
      if (message.includes("não encontrado")) {
        return reply.status(404).send({ error: "Not Found", message });
      }
      return reply.status(400).send({ error: "Bad Request", message });
    }
  }

  async deletar(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      await this.deletarDocumentoUseCase.execute(id);
      return reply.status(204).send();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao deletar documento";
      if (message.includes("não encontrado")) {
        return reply.status(404).send({ error: "Not Found", message });
      }
      return reply.status(400).send({ error: "Bad Request", message });
    }
  }
}

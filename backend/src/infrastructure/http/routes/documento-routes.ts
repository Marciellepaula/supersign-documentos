import type { FastifyInstance } from "fastify";
import { CriarDocumentoUseCase } from "../../../application/use-cases/criar-documento.js";
import { ListarDocumentosUseCase } from "../../../application/use-cases/listar-documentos.js";
import { AtualizarStatusDocumentoUseCase } from "../../../application/use-cases/atualizar-status-documento.js";
import { DeletarDocumentoUseCase } from "../../../application/use-cases/deletar-documento.js";
import type { DocumentoRepository } from "../../../domain/documento-repository.js";
import type { CreateDocumentoDTO } from "../../../application/dtos/documento-dto.js";
import { DocumentoController } from "../controllers/documento-controller.js";

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

  const controller = new DocumentoController(
    criarDocumento,
    listarDocumentos,
    atualizarStatus,
    deletarDocumento
  );


  app.post<{ Body: CreateDocumentoDTO }>("/documentos", (req, reply) =>
    controller.criar(req, reply)
  );

  app.get("/documentos", (req, reply) => controller.listar(req, reply));

  app.patch<{
    Params: { id: string };
    Body: { status?: string };
  }>("/documentos/:id/status", (req, reply) =>
    controller.atualizarStatus(req, reply)
  );

  app.delete<{ Params: { id: string } }>("/documentos/:id", (req, reply) =>
    controller.deletar(req, reply)
  );
}

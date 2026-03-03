import type { Documento } from "../../domain/documento.js";
import type {
  DocumentoRepository,
  CreateDocumentoInput,
} from "../../domain/documento-repository.js";
import { prisma } from "../database/prisma.js";

export class PrismaDocumentoRepository implements DocumentoRepository {
  async create(data: CreateDocumentoInput): Promise<Documento> {
    const row = await prisma.documento.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao ?? null,
        status: data.status ?? "pendente",
      },
    });
    return this.toDomain(row);
  }

  async findAll(): Promise<Documento[]> {
    const rows = await prisma.documento.findMany({
      orderBy: { criado_em: "desc" },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findById(id: string): Promise<Documento | null> {
    const row = await prisma.documento.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async updateStatus(
    id: string,
    status: "pendente" | "assinado"
  ): Promise<Documento | null> {
    const row = await prisma.documento.update({
      where: { id },
      data: { status },
    }).catch(() => null);
    return row ? this.toDomain(row) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.documento.deleteMany({ where: { id } });
    return result.count > 0;
  }

  private toDomain(row: {
    id: string;
    titulo: string;
    descricao: string | null;
    status: string;
    criado_em: Date;
  }): Documento {
    return {
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      status: row.status as "pendente" | "assinado",
      criado_em: row.criado_em,
    };
  }
}

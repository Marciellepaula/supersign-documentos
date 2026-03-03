import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { PrismaDocumentoRepository } from "./infrastructure/prisma/prisma-documento-repository.js";
import { registerDocumentoRoutes } from "./infrastructure/http/routes/documento-routes.js";

const prisma = new PrismaClient();
const documentoRepository = new PrismaDocumentoRepository(prisma);

async function build() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  await app.register(registerDocumentoRoutes, { prefix: "/api", documentoRepository });

  console.log(app.printRoutes());

  return app;
}

async function main() {
  const app = await build();
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
    console.log(`API rodando em http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();

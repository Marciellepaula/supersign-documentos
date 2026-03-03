# API Documentos – Backend

API REST com Fastify, Prisma e PostgreSQL.

## Configuração

1. `cp .env.example .env`
2. Ajuste `DATABASE_URL` para seu PostgreSQL, por exemplo:
   `postgresql://usuario:senha@localhost:5432/supersign_documentos`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma db push`

## Scripts

- `npm run dev` – Desenvolvimento com hot reload (tsx watch)
- `npm run build` – Compila TypeScript para `dist/`
- `npm start` – Roda `dist/server.js`
- `npm test` – Roda testes (Vitest)
- `npm run db:studio` – Abre Prisma Studio

## Arquitetura

- **domain/** – Entidade Documento e interface do repositório
- **application/** – DTOs e use cases (criar, listar, atualizar status, deletar)
- **infrastructure/** – Implementação Prisma do repositório e rotas HTTP (Fastify)

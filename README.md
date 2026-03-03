# SuperSign  Gerenciamento de Documentos

Teste tecnico Full Stack: API (Node.js + Fastify + Prisma) e interface (Next.js) para CRUD de documentos.

## Estrutura do repositorio

- **backend/**  API REST (Fastify, PostgreSQL, Prisma)
- **frontend/** Interface web (Next.js 15)

## Pre-requisitos

- Node.js 18+
- PostgreSQL rodando localmente ou via Docker (`docker compose up -d` na raiz do projeto)

## Backend

```bash
cd backend
cp .env.example .env

npm install
npm run db:generate
npm run db:migrate

npm run dev
```

API disponvel em `http://localhost:3001` (porta configur�vel via `PORT` no `.env`).

### Endpoints

Todos os endpoints estao sob o prefixo `/api`:


| Metodo | URL                        | Descricão                                       |
| ------ | -------------------------- | ----------------------------------------------- |
| POST   | /api/documentos            | Criar documento                                 |
| GET    | /api/documentos            | Listar documentos                               |
| PATCH  | /api/documentos/:id/status | Atualizar status (body: `{ "status": "pendente" |
| DELETE | /api/documentos/:id        | Deletar documento                               |


### Testes

```bash
cd backend
npm test
```

## Frontend

```bash
cd frontend
cp .env.example .env.local

npm install
npm run dev
```

Interface em `http://localhost:3000`.
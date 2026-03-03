# SuperSign – Documentos

API + frontend para criar, listar, atualizar status e excluir documentos. Backend em Node (Fastify + Prisma), front em Next.js.

**Requisitos:** Node 18+.

**Docker (PostgreSQL)**

Na raiz do projeto tem um `docker-compose.yml` com Postgres 16. Sobe o banco assim:

```bash
docker compose up -d
```

- Container: `supersign-documentos-db`
- Porta: `5434` (host) → 5432 (container)
- Banco: `supersign_documentos`, usuário/senha: `postgres`/`postgres`

O `.env.example` do backend já vem com uma URL para esse cenário. Se usar outro Postgres, ajuste o `DATABASE_URL`.

**Backend**

```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

API em `http://localhost:3001`. Porta e banco via `.env`.

**Frontend**

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App em `http://localhost:3000`.

**API – prefixo `/api`**

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | /api/documentos | Criar documento |
| GET | /api/documentos | Listar documentos |
| PATCH | /api/documentos/:id/status | Atualizar status (`"pendente"` ou `"assinado"`) |
| DELETE | /api/documentos/:id | Deletar documento |

**Testes (backend)**

```bash
cd backend
npm test
```

**Estrutura**

- `backend/` – API (domain, application, infrastructure com Prisma e Fastify).
- `frontend/` – Next.js 15.

# SuperSign – Documentos

API + frontend para criar, listar, atualizar status e excluir documentos. Backend em Node (Fastify + Prisma), front em Next.js.

**Como rodar**

- Postgres em pé (na raiz: `docker compose up -d`).
- Node 18+.

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

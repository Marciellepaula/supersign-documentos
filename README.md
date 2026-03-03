# SuperSign – Gerenciamento de Documentos

Teste técnico Full Stack: API (Node.js + Fastify + Prisma) e interface (Next.js) para CRUD de documentos.

## Estrutura do repositório

- **backend/** – API REST (Fastify, PostgreSQL, Prisma)
- **frontend/** – Interface web (Next.js 15)

## Pré-requisitos

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

API disponível em `http://localhost:3001` (porta configurável via `PORT` no `.env`).

### Endpoints

Todos os endpoints estão sob o prefixo `/api`:

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | /api/documentos | Criar documento |
| GET | /api/documentos | Listar documentos |
| PATCH | /api/documentos/:id/status | Atualizar status (body: `{ "status": "pendente" \| "assinado" }`) |
| DELETE | /api/documentos/:id | Deletar documento |

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

## Critérios atendidos

- Organização de pastas e separação de responsabilidades
- Uso do Prisma (ORM) com PostgreSQL
- Tratamento básico de erros (400, 404, 500)
- **Diferenciais:** Arquitetura em camadas (domain / application / infrastructure), DTOs, testes automatizados, boas práticas REST

## O que não está incluso

- Deploy
- Autenticação
- Design avançado da interface

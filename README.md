# SuperSign – Gerenciamento de Documentos

Teste técnico Full Stack: API (Node.js + Fastify + Prisma) e interface (Next.js) para CRUD de documentos.

## Estrutura do repositório

- **backend/** – API REST (Fastify, PostgreSQL, Prisma)
- **frontend/** – Interface web (Next.js 15)

## Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente (ou via Docker)

## Backend

```bash
cd backend
cp .env.example .env
# Edite .env e configure DATABASE_URL (PostgreSQL)

npm install
npx prisma generate
npx prisma db push

npm run dev
```

API disponível em `http://localhost:3001`.

### Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | /documentos | Criar documento |
| GET | /documentos | Listar documentos |
| PATCH | /documentos/:id/status | Atualizar status (body: `{ "status": "pendente" \| "assinado" }`) |
| DELETE | /documentos/:id | Deletar documento |

### Testes

```bash
cd backend
npm test
```

## Frontend

```bash
cd frontend
cp .env.example .env.local
# Opcional: defina NEXT_PUBLIC_API_URL se a API não estiver em localhost:3001

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

# API de Notas Fiscais

API RESTful para gerenciamento de solicitações e emissão de notas fiscais, desenvolvida em Node.js, Express, TypeScript, Prisma e PostgreSQL. Inclui documentação Swagger, testes automatizados e suporte a Docker.

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Rodando com Docker](#rodando-com-docker)
- [Rodando localmente (sem Docker)](#rodando-localmente-sem-docker)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Migrations e Banco de Dados](#migrations-e-banco-de-dados)
- [Testes Automatizados](#testes-automatizados)
- [Documentação da API (Swagger)](#documentação-da-api-swagger)
- [Especificação das Rotas](#especificação-das-rotas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (opcional, mas recomendado)

---

## Rodando com Docker

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Configure o arquivo `.env`:**
   ```env
   DATABASE_URL="postgresql://apinf_user:senha_segura@db:5432/apinf"
   ```

3. **Suba os containers:**
   ```bash
   docker compose up -d
   ```

4. **Acesse o container da aplicação (se desejar rodar comandos npm/prisma):**
   ```bash
   docker exec -it <nome-do-container-app> bash
   ```

5. **Rode as migrations (caso necessário):**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Acesse a API:**
   - API: [http://localhost:3000/api/notas-fiscais](http://localhost:3000/api/notas-fiscais)
   - Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## Rodando localmente (sem Docker)

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`:**
   ```env
   DATABASE_URL="postgresql://apinf_user:senha_segura@localhost:5432/apinf"
   ```

3. **Suba o PostgreSQL localmente (ou use Docker apenas para o banco):**

4. **Rode as migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie a aplicação:**
   ```bash
   npm run dev
   ```

---

## Variáveis de Ambiente

- `DATABASE_URL`: string de conexão do PostgreSQL.

Exemplo:
```
DATABASE_URL="postgresql://apinf_user:senha_segura@localhost:5432/apinf"
```

---

## Migrations e Banco de Dados

- As migrations do Prisma estão em `/prisma/migrations`.
- Para rodar as migrations:
  ```bash
  npx prisma migrate dev --name init
  ```
- Para acessar o banco, use ferramentas como [DBeaver](https://dbeaver.io/) ou `psql`.

---

## Testes Automatizados

- Os testes utilizam [Jest](https://jestjs.io/) e [Supertest](https://github.com/visionmedia/supertest).
- Para rodar os testes:
  ```bash
  npm test
  ```
- Os testes são mockados, não acessam o banco real.

---

## Documentação da API (Swagger)

Acesse [http://localhost:3000/api/docs](http://localhost:3000/api/docs) para a documentação interativa.

---

## Especificação das Rotas

### Criar uma solicitação de nota fiscal

- **POST** `/api/notas-fiscais`
- **Body:**
  ```json
  {
    "cnpj": "12345678000195",
    "municipio": "Maceió",
    "estado": "AL",
    "valor": 1000.50,
    "dataDesejada": "2024-06-01T12:00:00.000Z",
    "descricao": "Serviço de consultoria"
  }
  ```
- **Resposta:** `201 Created`
  ```json
  {
    "id": "string",
    "cnpj": "string",
    "municipio": "string",
    "estado": "string",
    "valor": 1000.5,
    "dataDesejada": "string (date-time)",
    "descricao": "string",
    "dataCriacao": "string (date-time)",
    "dataAtualizacao": "string (date-time)",
    "status": "PENDENTE_EMISSAO",
    "numeroNF": null,
    "dataEmissao": null
  }
  ```

---

### Listar todas as solicitações

- **GET** `/api/notas-fiscais`
- **Resposta:** `200 OK`
  ```json
  [
    {
      "id": "string",
      "cnpj": "string",
      "municipio": "string",
      "estado": "string",
      "valor": 1000.5,
      "dataDesejada": "string (date-time)",
      "descricao": "string",
      "dataCriacao": "string (date-time)",
      "dataAtualizacao": "string (date-time)",
      "status": "PENDENTE_EMISSAO",
      "numeroNF": null,
      "dataEmissao": null
    }
  ]
  ```

---

### Buscar uma solicitação por ID

- **GET** `/api/notas-fiscais/{id}`
- **Resposta:** `200 OK`
  ```json
  {
    "id": "string",
    "cnpj": "string",
    "municipio": "string",
    "estado": "string",
    "valor": 1000.5,
    "dataDesejada": "string (date-time)",
    "descricao": "string",
    "dataCriacao": "string (date-time)",
    "dataAtualizacao": "string (date-time)",
    "status": "PENDENTE_EMISSAO",
    "numeroNF": null,
    "dataEmissao": null
  }
  ```

---

### Emitir uma nota fiscal

- **POST** `/api/notas-fiscais/{id}/emitir`
- **Resposta:** `200 OK` (ou erro)
  ```json
  {
    "id": "string",
    "status": "EMITIDA",
    "numeroNF": "NF123",
    "dataEmissao": "string (date-time)"
    // ...demais campos
  }
  ```

---

## Estrutura do Projeto

```
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── tests/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── swagger.json
├── docker-compose.yml
├── .env
└── README.md
```

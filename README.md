Projeto Full Stack - Webapp

Este é um projeto full stack desenvolvido para gerenciar transações financeiras, com autenticação de usuário, criação e visualização de transações, confirmação de sucesso e tratamento de erros, incluindo página para rotas inexistentes.

---

## Visão Geral

A aplicação permite que usuários:

* Façam login e cadastro
* Criem transações
* Recebam confirmação de transação bem-sucedida
* Sejam informados sobre rotas inexistentes

---

## Tecnologias Utilizadas

### Frontend (React + Vite)

* **React**
* **React Router DOM** (useNavigate, useParams, useLocation, useActionState)
* **Zod** (validação de dados)
* **Axios** (requisições HTTP)
* **TailwindCSS** (estilização)
* **TypeScript**

### Backend (Node.js + Express)

* **Prisma** (ORM)
* **JWT / jsonwebtoken** (autenticação via token)
* **bcrypt** (hash de senhas)
* **Express** + **TypeScript**

---

## Por que usar cada tecnologia

* **React:** Biblioteca moderna e reativa para interfaces.
* **React Router DOM:** Controle de rotas com navegação programática e parâmetros.
* **Zod:** Validação de dados segura e tipada.
* **Axios:** Requisições HTTP simples e com suporte a interceptadores.
* **TailwindCSS:** Estilização rápida com classes utilitárias.
* **Prisma:** ORM com suporte a migrações e tipagem.
* **JWT:** Autenticação com tokens portáteis.
* **bcrypt:** Proteção de senhas com hash seguro.

---

## Estrutura Geral

### Frontend

* `/signUp`: Autenticação
* `/LoginAccount`: Cadastro
* `/dashboard`: Lista de transações
* `/transaction`: Nova transação
* `/transaction/:id`: Detalhes
* `/confirm`: Confirmação de sucesso
* `*`: Página 404

### Backend

* `POST /auth/login`
* `POST /auth/register`
* `GET /transactions`
* `POST /transactions`
* `GET /transactions/:id`
* Middleware de autenticação JWT

---

## Autenticação com JWT

1. Usuário fornece e-mail/senha
2. A senha é validada com `bcrypt`
3. Um token JWT é gerado e retornado
4. O frontend armazena esse token e o envia nas próximas requisições
5. Middleware do backend valida o token e identifica o usuário

---

## Fluxo de Criação de Transação

1. Usuário preenche nome, tipo e valor
2. Validação com `Zod`
3. Requisição com `axios`
4. Backend salva com `Prisma` e atualiza contas
5. Frontend redireciona para `/confirm`

---

## Validação e Tratamento de Erros

* **Zod** garante entrada correta de dados
* **Axios** captura e trata erros HTTP
* **Backend** retorna erros padronizados

---

## Página de Rota Inexistente

Se uma rota não for reconhecida, o frontend exibe uma página 404 amigável, garantindo uma boa experiência para o usuário.

---

## Como está estruturado o projeto

> Projeto criado com foco em praticar tecnologias modernas de desenvolvimento web full stack. A aplicação é modular, segura e extensível.

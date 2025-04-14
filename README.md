# 💰 Fincheck API

API de gerenciamento de finanças pessoais construída com **Node.js**, **TypeScript**, **NestJS** e **Prisma ORM**.  
Este projeto tem como objetivo explorar e praticar conceitos com NestJS e Prisma, oferecendo um CRUD simples de contas financeiras.

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📌 Funcionalidades

- ✅ Cadastro de contas financeiras
- ✅ Edição e remoção de contas
- ✅ Listagem e visualização de contas
- ✅ Autenticação protegida por `AuthGuard` (detalhes serão melhorados futuramente)

---

## 🧪 Objetivo do Projeto

Este projeto está em fase inicial e tem foco em aprendizado e testes com o ecossistema NestJS + Prisma.  
Futuramente, novas funcionalidades como categorias, filtros e relatórios financeiros serão adicionadas.

---

## 🚧 Status

🔧 **Em desenvolvimento** – estrutura inicial com funcionalidades básicas de contas e autenticação implementadas.

---
## 📁 Organização do Projeto

```bash
src/
├── accounts/      # CRUD de contas financeiras
├── auth/          # Lógica de autenticação (AuthGuard)
├── database/      # Configuração do Prisma e conexão com PostgreSQL
└── main.ts        # Arquivo principal da aplicação
```


---

## 📝 Observações

- O controle de banco de dados (migrations) está sendo feito com o **Prisma Migrate**.
- Autenticação básica já implementada, com planos de melhoria futura.
- Este README será expandido conforme o projeto evolui.

---


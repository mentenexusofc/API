# Mente Nexus - API de Gesto de Clnicas

Esta  a API central do ecossistema Mente Nexus, projetada para gerenciar clnicas, mdicos (profissionais), pacientes e agendamentos. Ela fornece a base de dados necessria para as automaes de WhatsApp no n8n.

## ✨ Funcionalidades

- **Gesto de Clnicas**: Cadastro e listagem de clnicas.
- **Profissionais (Mdicos)**: Armazenamento de credenciais de plataformas externas e especialidades.
- **Pacientes**: Gerenciamento de dados de contato e pronturios.
- **Agendamentos**: Controle de horrios e status de consultas.
- **Autenticao**: Sistema seguro com JWT e bcrypt.

## 🚀 Tecnologias

- Node.js & TypeScript
- Express
- Prisma ORM (PostgreSQL)
- Docker (Pronto para Coolify)
- Zod (Validao de Dados)

## 🛠️ Como rodar localmente

1. Tenha o Node.js 20+ instalado.
2. Clone o repositrio.
3. Instale as dependncias:
   ```bash
   npm install
   ```
4. Configure o arquivo `.env` com a sua URL do banco PostgreSQL.
5. Sincronize o banco de dados:
   ```bash
   npx prisma db push
   ```
6. Inicie em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🐳 Deploy no Coolify

Este projeto j inclui um `Dockerfile`. No painel do Coolify:
1. Crie uma nova Aplicao.
2. Aponte para este repositrio Git.
3. Defina as Variveis de Ambiente (`DATABASE_URL`, `JWT_SECRET`, etc).
4. O Coolify reconhecer o Dockerfile e far o deploy automaticamente.

## 📡 Endpoints da API

- `POST /api/register` - Criar novo usurio administrativo
- `POST /api/login` - Login e obteno de Token JWT
- `POST /api/clinics` - Cadastrar clnica
- `GET /api/professionals/clinic/:id` - Listar mdicos de uma clnica
- `POST /api/appointments` - Criar agendamento
- ... e muito mais!

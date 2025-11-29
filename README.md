# Sistema de Cadastro de Usuários

Sistema completo de gerenciamento de usuários com operações CRUD (Create, Read, Update, Delete), desenvolvido com as melhores práticas de arquitetura de software.

## Tecnologias Utilizadas

### Backend
- **Node.js** + **TypeScript** - Ambiente de execução JavaScript com tipagem estática
- **Express.js** - Framework web minimalista e flexível
- **SQLite** - Banco de dados relacional leve e embutido
- **Zod** - Biblioteca de validação de schemas com TypeScript
- **Jest** - Framework de testes unitários

### Frontend
- **React** + **TypeScript** - Biblioteca para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização moderna e responsiva

## Arquitetura

O projeto segue os princípios da **Clean Architecture** com separação em camadas:

```
src/
├── domain/              # Camada de Domínio (Entidades e Contratos)
│   ├── entities/        # Modelos de dados
│   └── repositories/    # Interfaces de repositórios
├── application/         # Camada de Aplicação (Regras de Negócio)
│   ├── services/        # Casos de uso
│   ├── validators/      # Validações de entrada
│   └── errors/          # Erros customizados
├── infrastructure/      # Camada de Infraestrutura (Implementações)
│   ├── database/        # Conexão e migrations
│   └── repositories/    # Implementação dos repositórios
└── presentation/        # Camada de Apresentação (API)
    ├── controllers/     # Controladores HTTP
    └── routes/          # Definição de rotas
```

### Princípios Aplicados

- **SOLID** - Princípios de design orientado a objetos
- **DRY** (Don't Repeat Yourself) - Reutilização de código
- **Separation of Concerns** - Separação de responsabilidades
- **Dependency Injection** - Inversão de dependências
- **Repository Pattern** - Abstração da camada de dados
- **Service Layer Pattern** - Lógica de negócio isolada

## Funcionalidades

### CRUD Completo
-  **Create** - Cadastrar novos usuários
-  **Read** - Listar todos os usuários e buscar por ID
-  **Update** - Atualizar dados de usuários existentes
-  **Delete** - Remover usuários do sistema

### Validações
- Validação de email (formato válido)
- Validação de CPF (formato XXX.XXX.XXX-XX)
- Validação de telefone (formato (XX) XXXXX-XXXX)
- Validação de data de nascimento
- Verificação de duplicidade de email e CPF
- Validação de tamanho de campos

### Recursos Adicionais
- Formatação automática de CPF e telefone
- Máscaras de entrada no frontend
- Mensagens de erro amigáveis
- Interface responsiva
- Loading states
- Confirmação antes de deletar

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
cd user-management-system
```

2. **Instale as dependências do backend**
```bash
npm install
```

3. **Execute as migrations do banco de dados**
```bash
npm run migrate
```

4. **Inicie o servidor backend**
```bash
npm run dev
```
O servidor estará rodando em `http://localhost:3000`

5. **Em outro terminal, instale as dependências do frontend**
```bash
cd frontend
npm install
```

6. **Inicie o servidor frontend**
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

## API Endpoints

### Base URL: `http://localhost:3000/api`

#### Listar todos os usuários
```http
GET /users
```

**Resposta de sucesso (200)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com",
      "cpf": "123.456.789-00",
      "birthDate": "1990-01-01T00:00:00.000Z",
      "phone": "(11) 98765-4321",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Buscar usuário por ID
```http
GET /users/:id
```

#### Criar novo usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "cpf": "123.456.789-00",
  "birthDate": "1990-01-01",
  "phone": "(11) 98765-4321"
}
```

**Resposta de sucesso (201)**
```json
{
  "success": true,
  "data": { ... },
  "message": "Usuário criado com sucesso"
}
```

**Resposta de erro (400)**
```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

#### Atualizar usuário
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "João Santos",
  "email": "joao.santos@example.com",
  "phone": "(11) 91234-5678"
}
```

#### Deletar usuário
```http
DELETE /users/:id
```

## Testes

### Executar testes unitários
```bash
npm test
```

### Executar testes com coverage
```bash
npm test -- --coverage
```

## Estrutura do Banco de Dados

### Tabela: users

| Campo       | Tipo | Descrição                    |
|-------------|------|------------------------------|
| id          | TEXT | UUID (chave primária)        |
| name        | TEXT | Nome completo                |
| email       | TEXT | Email (único)                |
| cpf         | TEXT | CPF formatado (único)        |
| birth_date  | TEXT | Data de nascimento (ISO)     |
| phone       | TEXT | Telefone formatado           |
| created_at  | TEXT | Data de criação (ISO)        |
| updated_at  | TEXT | Data de atualização (ISO)    |

## Boas Práticas Implementadas

### Backend
- ✅ Arquitetura em camadas (Clean Architecture)
- ✅ Validação de dados com Zod
- ✅ Tratamento de erros centralizado
- ✅ Tipagem forte com TypeScript
- ✅ Testes unitários
- ✅ Padrão Repository
- ✅ Injeção de dependências
- ✅ Código modular e reutilizável

### Frontend
- ✅ Componentização
- ✅ Hooks personalizados
- ✅ Gerenciamento de estado local
- ✅ Formatação automática de inputs
- ✅ Feedback visual para o usuário
- ✅ Design responsivo
- ✅ Tratamento de erros

## Melhorias Futuras

- [ ] Autenticação e autorização (JWT)
- [ ] Paginação de resultados
- [ ] Busca e filtros
- [ ] Upload de foto de perfil
- [ ] Logs de auditoria
- [ ] Cache com Redis
- [ ] Documentação Swagger/OpenAPI
- [ ] CI/CD com GitHub Actions
- [ ] Docker e Docker Compose
- [ ] Deploy em produção

## Autor

Desenvolvido como projeto de portfólio demonstrando conhecimentos em:
- Arquitetura de software
- TypeScript
- Node.js & React
- Padrões de projeto
- Testes automatizados
- Boas práticas de código

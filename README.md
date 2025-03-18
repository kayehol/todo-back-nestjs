# To-do List

Back-end do Gerenciador de tarefas: crie,edite e remova tarefas.

## Como executar

### Requisitos:
- MySQL 8.4.4
- Node v23

- Download do MySQL Community [https://dev.mysql.com/downloads/]

- Criar um banco de dados de nome `test`
```mysql
CREATE DATABASE test;
```

### 1. Instale as dependências
```bash
npm install
```

### 2. Adicione as variáveis de ambiente
Crie um arquivo `.env` no diretório raiz do projeto com as informações do arquivo `.env.example`

### 3. Rode as migrations
Crie as tabelas do banco de dados
```bash
npm run typeorm:migrate
```

### 4. Execute o projeto

```bash
npm run start
```

### 5. Acesse a documentação via swagger
Acesse em `http://localhost:3000/api`

### 6. Execute os testes
```bash
npm run test
```


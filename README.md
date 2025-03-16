# To-do List

Back-end do Gerenciador de tarefas: crie,edite e remova tarefas.

## Como executar

### Requisitos:
- MySQL

### Instale as dependências
```bash
npm install
```

### Adicione as variáveis de ambiente
Crie um arquivo `.env` no diretório raiz do projeto com as informações do arquivo `.env.example`

### Rode as migrations
Crie as tabelas do banco de dados
```bash
npm run typeorm:migrate
```

### Execute o projeto

```bash
npm run start
```

### Acesse a documentação via swagger
Acesse em `http://localhost:3000/api`

### Execute os testes
```bash
npm run test
```


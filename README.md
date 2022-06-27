# API Sales NodeJs

## Aplicação Node.js com Typescript

<p>
Preparação da aplicação backend que será desenvolvida uma API de Vendas com Node.js, Typescript, TypeORM, Docker.
</p>

## Configurações do projeto

### Iniciar a aplicação Node.js com Typescript

* Criar o `package.json` com o comando

 > Nesse caso estarei usando o `yarn` como o gerenciador de pacotes

```bash
yarn init -y
```

* Fazer a instalação do Typescript

```bash
yarn add typescript ts-node-dev @types/node tsconfig-paths -D
```

> Foi adicionado o pacote `tsconfig-paths` para também ser instalado. Esse pacote servirá para criação de atalhos para os paths de arquivos ao usar o `import`.

* Criar o arquivo `tsconfig.json` que conterá as configurações do Typescript, com o comando:

```bash
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```


* Criar o arquivo `.gitignore`

```bash
touch .gitignore
```

```bash
.idea/
.vscode/
node_modules/
build/
temp/
.env
coverage
ormconfig.json
dist

uploads/*
!uploads/.gitkeep
```

* Criar a pasta **uploads** com o arquivo `.gitkeep` dentro para que os arquivos carregados nessa pasta não sejam incluídos no controle de versão do Git.

* Criar a pasta src e o primeiro arquivo:

```bash
mkdir src

touch src/server.ts
```

* Para compilar nosso código, precisaremos executar o comando `tsc`, que irá ler o arquivo `tsconfig.json` no diretório atual e aplicará a configuração ao compilador TypeScript para gerar o código JavaScript compilado.

```bash
yarn tsc
```

#### Executando o programa

```bash
node build/server.js
```

Será exibido no terminal a mensagem:


<img src="https://user-images.githubusercontent.com/68359459/175779882-c0c0fb54-4ea9-4a53-9b65-dad9f1959a39.png" alt="Console log">


Mas o **build** só será feito no final do projeto, podendo assim remover a pasta `build`

#### Executar o servidor em desenvolvimento

Usaremos a biblioteca `ts-node-dev` para execução da aplicação em desenvolvimento.

* Incluir o script para rodar o `ts-node-dev` no arquivo `package.json`.

```js
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
}
```

* Executar o servidor:

```bash
yarn dev
```
<img src="https://user-images.githubusercontent.com/68359459/175779915-bb230878-247b-4641-8b05-7c649a75fe7c.png" alt="Servidor rodando">

### EditorConfig

> O Editor Config é uma ferramenta que auxilia na padronização da configuração para vários desenvolvedores trabalhando em um mesmo projeto, mas em diferentes editores de código ou IDE's.

<h2>Instalar no VSCode a extensão EditorConfig for VS Code.</h2>

Depois de instalada, ao clicar com o botão direito sobre o explorador de arquivos do projeto vamos selecionar a opção `Generate .editorconfig`.

E a execução dessa opção deve gerar um arquivo `.editorconfig` com o seguinte conteúdo:

```js
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```


### ESLint

> ESLint é um linter JavaScript que permite que você aplique um conjunto de padrões de estilo, formatação e codificação para sua base de código. Ele examina seu código e avisa quando você não está seguindo o padrão que definiu.

<h2>Instalação e Configuração do ESLint</h2>

```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

* Na raiz do seu projeto crie um arquivo `.eslintrc` com uma configuração inicial do ESLint:

```bash
touch .eslintrc
```

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```


* Criar o arquivo `.eslintignore`:

```bash
touch .eslintignore
```


```js
node_modules
dist
build
/*.js
```

* Adicionar um script no arquivo `package.json` para executar o lint, editado o que existe para:

```js
"scripts": {
  "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "lint": "eslint . --ext .ts"
}
```

Esse comando faz basicamente com que o ESLint analise todos os arquivos dentro do projeto, indicando erros detectados de acordo com a configuração.

Execute o script e verifique que nenhum erro deve ser retornado.

```bash
yarn lint
```

#### Adicionando regras ESLint

No arquivo `.eslintrc`, podemos adicionar o atributo rules ao objeto json para definição de regras.

Para cada regra podemos atribuir os seguintes valores: `"off"`, `"warn"` ou `"error"`.

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": { 
    "no-console": "warn"
  }
}
```

A regra `no-console` irá indicar se há algum `console.log()` perdido pelo código.

#### Correção automática ESLint

O `ESLint` pode receber um parâmetro `--fix` para que tente corrigir automaticamente os problemas encontrados.

Vamos configurar outro script com a opção `--fix`.

```js
"scripts": {
  "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "lint": "eslint . --ext .ts",
  "lint-fix": "eslint . --ext .ts --fix"
}
```

### Prettier

> Prettier é um formatador de código opinativo e, em conjunto com o `ESLint`, forma uma parceria perfeita.

* `ESLint`: define as convenções do código
* `Prettier`: realiza a formatação automática com base nas regras `ESLint`

#### Instalação do Prettier

```bash
yarn add prettier -D
```

* Criar o arquivo `.prettierrc` com a configuração básica do `Prettier`

```bash
touch .prettierrc
```

```js
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

> É fundamental que a extensão `Prettier - Code Formater` esteja instalada no `VS Code`

### Configurando o Prettier para trabalhar com ESLint

```bash
yarn add eslint-config-prettier eslint-plugin-prettier -D
```

* Ajustar o arquivo `eslintrc`

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "prettier/prettier": "error"
  }
}
```


## Estrutura do projeto

```bash
mkdir -p src/config
mkdir -p src/modules
mkdir -p src/shared/http

mv src/server.ts src/shared/http/server.ts

mkdir -p src/shared/http/routes
touch src/shared/http/routes/index.ts
```

### Configurando as importações

```js
"baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    "paths": {
      "@config/*": [
        "src/config/*"
      ],
      "@modules/*": [
        "src/modules/*"
      ],
      "@shared/*": [
        "src/shared/*"
      ]
    },  
```

## Instalação de bibliotecas

```bash
# Bibliotegas
yarn add express cors express-async-errors

# Tipagens
yarn add -D @types/express @types/cors
```

## Tratamento de erros

```bash
mkdir -p src/shared/erros

touch src/shared/errors/AppErro.ts
```


# Configuração com o banco de dados

## Configurando o TypeORM

```bash
yarn add typeorm reflect-metadata pg
```

> Observação a biblioteca do `TypeORM` recebeu uma nova versão, para não gerar incompatibilidade com gestão de versão troca no `package.json` a versão do `TypeORM`

```bash
"typeorm": "^0.3x"
# Por:
"typeorm": "^0.2.9"
```

* Criar na raiz do projeto o arquivo `ormconfig.json`

```bash
touch ormconfig.json
```

```js
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "apisales"
}
```

* Em `shared` criar uma pasta `typeorm`

```bash
mkdir -p src/shared/typeorm

touch src/shared/typeorm/index.ts
```

* Criar o contêiner no Docker

```bash
docker run --name apisales -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

# Modulo de Produtos

## Configurando o Migration

```src
mkdir -p src/shared/typeorm/migrations
```

* Adicionar no `ormconfig` o caminho da `migration` e a `CLI`

```bash
{
  "entities": ["./src/modules/**/typeorm/entities/*.ts"],
  "migrations": [
    "./src/shared/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/typeorm/migrations"
  }
}
```

* Alterar o script do `package.json`

```bash
"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
```

* Verificar se o script está funcionando

```bash
yarn typeorm
```

## Migrations Products

* Criando a migrations products

```bash
yarn typeorm migration:create -n CreateProducts
```


* Rotando o migrations

```bash
yarn typeorm migration:run
```

### Criando a entidade Products

```bash
mkdir -p src/modules/produts/typeorm/entities

touch src/modules/produts/typeorm/entities/Product.ts
```


## Repository

### Repository Product
 
```bash
mkdir -p src/modules/produts/typeorm/repositories

touch src/modules/produts/typeorm/repositories/ProductRepository.ts
```


### Services

```bash
mkdir -p src/modules/products/services

touch src/modules/services/products/CreateProductService.ts

touch src/modules/services/products/ListProductService.ts

touch src/modules/services/products/ShowProductService.ts

touch src/modules/services/products/UpdateProductService.ts
```

###  Controller

```bash
mkdir -p src/modules/products/controller  

touch src/modules/products/controller/ProductService.ts
```

### Routes

```bash
mkdir -p src/modules/products/routes

touch src/modules/products/routes/product.routes.ts
```

## Celebrate

```bash
yarn add celebrate

yarn add -D @types/joi
```

# Modulo de Usuário

## Migrations Users

* Criando a migrations users

```bash
yarn typeorm migration:create -n CreateUsers
```

## Entity Users

```bash
mkdir -p src/modules/users

mkdir -p src/modules/users/typeorm

mkdir -p src/modules/users/typeorm/entities

touch src/modules/users/typeorm/entities/User.ts
```

## Repository User

```bash
mkdir -p src/modules/users/typeorm/repositories

touch src/modules/users/typeorm/repositories/UserRepository.ts
```

## Service User

```bash
mkdir -p src/modules/users/services

touch src/modules/users/services/CreateUserService.ts

touch src/modules/users/services/ListUserService.ts

touch src/modules/users/services/ShowUserService.ts

touch src/modules/users/services/UpdateUserService.ts

touch src/modules/users/services/DeleteUserService.ts
```

## Controller User

```bash
mkdir -p src/modules/users/controllers

touch src/modules/users/controllers/UsersController.ts
```

## Routes

```bash
mkdir -p src/modules/users/routes

touch src/modules/users/routes/users.routes.ts
```

# Criptografar password

* Instalar a biblioteca `bcryptjs`

```bash
yarn add bcryptjs

yarn add -D @types/bcryptjs
```

# Serviço de autenticação

```bash
mkdir -p src/modules/users/services/AuthSessions

touch src/modules/users/services/CreateSessionsService.ts
```

## Controller de sessão de autenticação

```bash
mkdir -p src/modules/users/controllers/authSessionsController

touch src/modules/users/controllers/SessionsController/SessionsController.ts
```

## Rota de sessão de autenticação

```bash
mkdir -p src/modules/users/routes/authSessionsRoutes

touch src/modules/users/routes/authSessionsRoutes/sessions.router.ts
```
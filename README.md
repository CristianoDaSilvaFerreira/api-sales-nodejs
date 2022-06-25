# API Sales NodeJs

<h1>Aplicação Node.js com Typescript</h1>

<p>
Preparação da aplicação backend que será desenvolvida uma API de Vendas com Node.js, Typescript, TypeORM, Docker.
</p>


## Iniciar a aplicação Node.js com Typescript

* Criar o `package.json` com o comando

 > Nesse caso estarei usando o `yarn` como o gerenciador de pacotes

```bash
npm init -y

# ou

yarn init -y
```

* Fazer a instalação do Typescript

```bash
npm install typescript ts-node-dev @types/node tsconfig-paths -D

# ou

yarn add typescript ts-node-dev @types/node tsconfig-paths -D
```

> Foi adicionado o pacote `tsconfig-paths` para também ser instalado. Esse pacote servirá para criação de atalhos para os paths de arquivos ao usar o `import`.

* Criar o arquivo `tsconfig.json` que conterá as configurações do Typescript, com o comando:

```bash
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

Em resumo, os parâmetros passados são:

`rootDir`: É aqui que o **TypeScript** procura nosso código.

`outDir`: Onde o **TypeScript** coloca nosso código compilado.

`esModuleInterop`: Se estiver usando **commonjs** como sistema de módulo (recomendado para aplicativos Node), então esse parâmetro deve ser definido como _true_.

`resolveJsonModule`: Se usarmos **JSON** neste projeto, esta opção permite que o TypeScript o use.

`lib`: Esta opção adiciona tipos de ambiente ao nosso projeto, permitindo-nos contar com recursos de diferentes versões do Ecmascript, bibliotecas de teste e até mesmo a API DOM do navegador. Usaremos recursos es6 da linguagem.

`module`: commonjs é o sistema de módulo Node padrão.

`allowJs`: Se você estiver convertendo um projeto **JavaScript** antigo em **TypeScript**, esta opção permitirá que você inclua arquivos **.js** no projeto.

`noImplicitAny`: Em arquivos TypeScript, não permita que um tipo seja especificado inexplicitamente. Cada tipo precisa ter um tipo específico ou ser declarado explicitamente any.


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

### Executando o programa

```bash
node build/server.js
```

Será exibido no terminal a mensagem:

![01.png](/home/cristiano/Imagens/Pirnts/Projetos/api-sales-node/01.png)

Mas o **build** só será feito no final do projeto, podendo assim remover a pasta `build`

### Executar o servidor em desenvolvimento

Usaremos a biblioteca `ts-node-dev` para execução da aplicação em desenvolvimento.

* Incluir o script para rodar o `ts-node-dev` no arquivo `package.json`.

```js
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
}
```

* Executar o servidor:

```bash
npm run dev

# ou

yarn dev
```

![02.png](/home/cristiano/Imagens/Pirnts/Projetos/api-sales-node/02.png)
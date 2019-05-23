# VUTTR Client (React.js)
Aplicação  **front-end** para gerenciar ferramentas feita para o desafio **Bossabox**.

## Sumário
 - [Requisitos](https://github.com/mrvinicius/vuttr-client#requisitos)
 - [Instalação](https://github.com/mrvinicius/vuttr-client#instalacao)
 - [Executando a aplicação](https://github.com/mrvinicius/vuttr-client#instalacao)
 - [Testes](https://github.com/mrvinicius/vuttr-client#instalacao)

## Requisitos

 - **Node** (v8.10.0 ou superior)
 - **npm** ou **Yarn**
 - **Fake-api** rodando na porta 3000 [(veja o passo a passo)](https://github.com/mrvinicius/vuttr-fake-api)

## Instalação
Faça o clone deste repositório e acesse o diretório:
```
git clone https://github.com/mrvinicius/vuttr-client.git vuttr-client

cd vuttr-client
```

Instale as dependências:
```
yarn || npm install
```
## Execução
Embora a CLI pergunte se você quer rodar em uma porta diferente sempre que houver conflito de porta já em uso, você também pode adicionar um arquivo `.env` assim como o `.env.example` disponibilizado nos arquivos clonados para configurar uma porta padrão para o client.
```
yarn start || npm start
```

## Testes
Testes feitos com as bibliotecas **Jest** e **Enzyme**.
```
yarn test || npm run test
```

# rest-tracking

[![Build Status](https://travis-ci.org/gabrielboliveira/rest-tracking.svg?branch=master)](https://travis-ci.org/gabrielboliveira/rest-tracking)

API REST para abstrair o método `track` do pacote [tracking-correios](https://github.com/gabrielboliveira/tracking-correios).

## Pré-requisitos

- Node.js (versão 0.12 a latest)
- npm

## Instalação

```sh
# ssh
$ git clone git@github.com:gabrielboliveira/rest-tracking.git

# https
$ git clone https://github.com/gabrielboliveira/rest-tracking.git

$ cd rest-tracking
$ npm install
$ node start
```

A configuração da porta padrão (3000) é feita no arquivo [env.json](src/env.json).

## Uso

A API expõe o endpoint `/track` para obter os dados de rastreio dos pacotes. Recebe um objeto com atributo `codes` e um array de códigos:

```json
{
    "codes": ["DU123123123BR"]
}
```

Exemplo:

```sh
$ curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"codes": ["DU123123123BR"]}' http://localhost:3000/track

> HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 101
Date: Tue, 03 Jan 2017 12:29:09 GMT
Connection: keep-alive

{"data":[{"numero":"DU123123123BR","erro":"Objeto não encontrado na base de dados dos Correios."}]}
```

## Produção

Para executar a API em produção é recomendado um _process manager_ como por exemplo [PM2](https://github.com/Unitech/pm2) ou [forever](https://github.com/foreverjs/forever).

```sh'
$ npm run build-prod
$ pm2 start prod/track.js --name="rest-tracking"
```

## Testes

Para desenvolvimento, foram desenvolvidos testes unitários e E2E. Para executá-los, deve rodar o seguinte script:

```sh
$ npm test
```

## Licença

[MIT](LICENSE.md).


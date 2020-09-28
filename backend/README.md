# webservice

## Install
```
$ yarn install
```

## Run
### Develop
```
$ yarn dev
```

### Production
```
$ yarn start
```

## Using

```shell
http://localhost:8081/zipcode/29163561
```
```json
{
  "cep": "29163-561",
  "logradouro": "Rua dos Esquimós",
  "complemento": "(Setor América)",
  "bairro": "Cidade Continental",
  "localidade": "Serra",
  "uf": "ES",
  "ibge": "3205002",
  "gia": "",
  "ddd": "27",
  "siafi": "5699"
}
```

Crie uma tabela chamada `webservice_busca_cep` no `mysql`.

Para criar um nova migration use: 
```
npx sequelize migration:create --name=create-users
```
**obs: substitura o `create-users` com o nome da migration**

Para executar a migração ao banco de dados:
```
npx sequelize db:migrate
```

Para executar rallback no banco:
```
npx sequelize db:migrate:undo
```

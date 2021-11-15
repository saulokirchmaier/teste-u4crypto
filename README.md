# TESTE U4CRYPTO

## Descrição
1. Modele um domínio para o seguinte problema:
  - Modele um sistema para uma empresa de proteção veicular.
  - Nesse sistema existem clientes e terceiros.
    - Os clientes podem criar uma conta inserindo informações básicas de cadastro.
    - Os clientes podem editar alguns dados cadastrados.
    - Os clientes podem criar um evento de acidente, onde será possível informar o veículo envolvido no acidente e o(s) terceiro(s).
    - Os terceiros são cadastrados quando é criado um acidente, se não houver um registro prévio na base de dados.
    - Todos os usuários(clientes e terceiros) precisam ter documentos associados as suas contas.
    - Quando um houve o cadastro de um cliente que já foi envolvido como terceiro em um acidente, é   preciso migrar o usuário para cliente sem perder o vínculo criado no acidente.

2. Crie uma API RESTful em NodeJS com as seguintes tecnologias:
  - Typescript.
  - HapiJS.
  - TypeORM.
  - PostgresSQL.
  - Jest

## Iniciando a aplicação
1. Faça um clone deste repositório;
2. Certifique que tenha o postgres e o node instalado em sua máquina; 
3. Crie um arquivo `.env` na pasta raiz com as seguintes configurações, ou adicione as configurações que desejar: 
    ```
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=1234
    DB_DATABASE=u4c

    API_PORT=3000
    API_HOST=localhost
    ```
4. Instale as dependencias com o comando `npm i`;
5. Inicia a aplicação `npm run dev index`, a seguinte mensagem deve aparecer em seu terminal:
    `Server start at http://localhost:3000`.

## Utilização
Sugestão, utilize o insomnia ou curl.

### Rotas
- "/": verifica se a aplicação está rodando, resposta:
  * Hello

#### Usuários
- "/user": method "GET", busca todos os usuários no banco.
  * response:
  ```javascript
    [
      [
        {
          "fullName": "saulo",
          "email": "b@a.com",
          "document": 35,
          "address": "a a  fv f ",
          "role": "client",
          "vehiclePlate": "3854",
          "vehicleModel": "van",
          "id": 1
        }
      ]
    ]
  ```
- "/user": method "POST", insere um novo usuário no banco: 
  * body: 
  ```javascript
    {
      "fullName": "saulo",
      "email": "b@a.com",
      "document": "35",
      "address": "a a  fv f ",
      "vehiclePlate": "3854",
      "vehicleModel": "van"
    }
  ```
  * response:
  ```
    {
      "fullName": "saulo",
      "email": "b@a.com",
      "document": "35",
      "address": "a a  fv f ",
      "role": "client",
      "vehiclePlate": "3854",
      "vehicleModel": "van",
      "active": true,
      "updatedAt": "2021-11-15T23:06:37.600Z",
      "deletedAt": null,
      "id": 1,
      "createdAt": "2021-11-15T23:06:37.600Z"
    }
  ```
- "/user/{id}": method "GET", busca um usuário pelo id informado:
  * response:
  ```
    {
      "fullName": "saulo",
      "email": "b@a.com",
      "document": 35,
      "address": "a a  fv f ",
      "role": "client",
      "vehiclePlate": "3854",
      "vehicleModel": "van",
      "id": 1
    }
  ```
- "/user/{id}": method "PATCH", atualiza os dados de um usuário pelo id informado:
  * body:
  ```
    {
      "fullName": "saulo",
      "email": "b@a.com",
      "document": "35",
      "address": "Av. conde",
      "vehiclePlate": "3854",
      "vehicleModel": "van"
    }
  ```
  * response: 
  ```
    {
      "fullName": "saulo",
      "email": "b@a.com",
      "document": "35",
      "address": "Av. conde",
      "role": "client",
      "vehiclePlate": "3854",
      "vehicleModel": "van",
      "active": true,
      "updatedAt": "2021-11-15T23:06:37.600Z",
      "deletedAt": null,
      "id": 1,
      "createdAt": "2021-11-15T23:06:37.600Z"
    }
  ```
- "/user/{id}": method: "DELETE", delete um usuário do banco de dados, obs: apenas desativa do sistema.

#### Acidentes
- "/accident": methos "GET", busca todos os acidentes cadastrados no sistema.
  * response: 
- "/accident": method "POST", insere um novo acidente no bando:
  * body:
  ```
    {
      "user": {
        "email": "c@a.com"
      },
      "engageds": [
        {
          "fullName": "saulo",
          "email": "b@a.com",
          "document": "35",
          "address": "Rua Pilot",
          "vehiclePlate": "3854",
          "vehicleModel": "Gol"
        },
        {
          "fullName": "saulo",
          "email": "a@a.com",
          "document": "356",
          "address": "Rua Afonso",
          "vehiclePlate": "88546",
          "vehicleModel": "Voyage"
        }
      ],
      "description": "asda sdasd asd"
    }
  ```
  * response:
  ```
    {
      "accident": {
        "description": "asda sdasd asd",
        "updatedAt": "2021-11-15T23:25:31.846Z",
        "deletedAt": null,
        "id": 1,
        "createdAt": "2021-11-15T23:25:31.846Z"
      },
      "user": {
        "fullName": "saulo",
        "email": "c@a.com",
        "document": 5,
        "address": "a a  fv f ",
        "role": "client",
        "vehiclePlate": "38854",
        "vehicleModel": "van",
        "active": true,
        "updatedAt": "2021-11-15T23:25:29.726Z",
        "deletedAt": null,
        "id": 1,
        "createdAt": "2021-11-15T23:25:29.726Z"
      },
      "engageds": [
        {
          "fullName": "saulo",
          "email": "b@a.com",
          "document": "35",
          "address": "Rua Pilot",
          "role": "engaded",
          "vehiclePlate": "3854",
          "vehicleModel": "Gol",
          "active": true,
          "updatedAt": "2021-11-15T23:25:31.811Z",
          "deletedAt": null,
          "id": 2,
          "createdAt": "2021-11-15T23:25:31.811Z"
        },
        {
          "fullName": "saulo",
          "email": "a@a.com",
          "document": "356",
          "address": "Rua Afonso",
          "role": "engaded",
          "vehiclePlate": "88546",
          "vehicleModel": "Voyage",
          "active": true,
          "updatedAt": "2021-11-15T23:25:31.830Z",
          "deletedAt": null,
          "id": 3,
          "createdAt": "2021-11-15T23:25:31.830Z"
        }
      ]
    }
  ```
  - "/accident/{id}": methos "GET", busca um acidente a partir de um id informado.
  * response: 
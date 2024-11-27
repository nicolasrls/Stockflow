# Stockflow
Projeto da cadeira de Programação com frameworks Web do prof. Jeofton Costa.

### V1.0 - versão inicial

Começando pelo começo, estudei a respeito do token JWT, suas funcionalidades e aprendi acerca da geração. Também estudando sobre o 2FA, consegui implementar a geração do QR Code para ser utilizado com uma outra solução de autenticação(Authy ou Google Authenticator por ex.) e também obtive sucesso na validação do segredo gerado. Seguirei aprimorando a interface inicial de login/cadastro para garantir pleno funcionamento de uma das partes fundamentais do nosso projeto. A expectativa é que na versão 1.05 eu traga a tela de cadastro já funcional e capaz de armazenar os dados de autenticação no banco MongoDB(requisito para entrega do projeto.) - Nícolas R.

### V1.05 - 

##### correção de bugs da V1.0 em relação ao 2FA
Backend de registro e login com integração a banco de dados NoSQL realizada utilizando o mongoose. Implementação de 2FA realizada com sucesso onde é possível registrar a semente em um aplicativo autenticador e a cada login, fazer a validação; Por ora, esperamos implementar as telas principais do nosso projeto para em seguida darmos continuidade. - Nícolas R.

### V1.10 - 

##### Integração API + React

Feito integração da API de Login e Registro com o front-end desenvolvido pelo colega Gabriel Moura. Algumas correções e melhorias de código precisam ser feitas para corrigir alguns eventuais bugs, apesar disso o projeto segue funcional e integrado ao banco MongoDB. Parte de 2FA funcionando perfeitamente integrado ao Authy. Versões seguintes devem ser registradas nesse README, pelos colegas que estão presentes no trabalho, relatando o incremento de funções do projeto. - Nícolas R. 

## 🚀 Tecnologias Utilizadas

- Create React App
- React Icons
- React Router Dom
- React Json Server
- React Datepicker
- TypeScript
- Axios
- CSS

## 💻 Rodando Localmente

Clone o projeto

```bash
  git clone https://github.com/nicolasrls/Stockflow.git
```

Entre no diretório do projeto

```bash
  cd Stockflow
```
```bash
  cd client
```

Instale as dependências

```bash
  npm i
```

Rode os códigos do site utilizando o seguinte comando

```bash
  npm start
```

Vá a um navegador e digite na barra de pesquisa de URL

```bash
  http://localhost:3000
```
Ou [clique aqui](http://localhost:3000) por mais praticidade para entrar na primeira página do site

## 🪄 Funcionalidades

- Entrar no sistema com email/nome e senha
- Validação de campos de preenchimento
- Cadastrar vendas no estoque

## 📁 Documentação Da API

#### Base da URL

```http
  http://localhost:5000
```

#### Retorna todas as vendas

```http
  GET ${baseURL}/sales/${sale}/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `sale`      | `string`   | **Obrigatório**. O parâmetro da sua API |

#### Retorna uma venda

```http
  GET ${baseURL}/sales/${sale.id}/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `sale.id`   | `string`   | **Obrigatório**. O ID da venda que você quer |

#### Deleta uma venda

```http
  DELETE ${baseURL}/sales/${id}/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`        | `string`   | **Obrigatório**. O ID da venda que você quer |

#### Edita uma venda

```http
  PATCH ${baseURL}/sales/${sale.id}/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `sale.id`   | `string`   | **Obrigatório**. O ID da venda que você quer |

#### Posta todas as vendas

```http
  POST ${baseURL}/sales/
```

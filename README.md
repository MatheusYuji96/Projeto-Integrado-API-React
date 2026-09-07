# Projeto-Integrado-API-React

Este projeto tem por objetivo demonstrar as competências na ligação entre o **Front-End rodando com React**, com o **Back-End em Java**, que utiliza uma **API REST**.

A temática definida foi **Música**. Portanto, os campos simulam o cadastramento de uma pessoa e sua música favorita, assim como o álbum ao qual ela pertence, quem canta e o ano de lançamento de tal canção. Além disso, há também uma página dedicada à demonstração dos cadastros realizados, assim como outra para apagar algum cadastro de acordo com seu número "id".

Portanto, três verbos aparecem neste projeto: GET, POST e DELETE.

## Tecnologias Utilizadas

*Front-End:*React, Vite, Node.js/npm

*Back-End:*Java 21, Spring Boot, Spring JDBC

*Banco de Dados:* MySQL

*Comunicação:* API REST

## Banco de Dados

O Banco de Dados utilizado é o **MySQL**, que roda na porta **3306**.
Existe uma instrução, no arquivo schema.sql, que cria uma tabela no banco chamada "musicas" e os campos id, nome, apelido, musica, autor, album e anoLanc (correspondente aos campos de input presentes na tela de Cadastro). O comando está a seguir:

```sql
CREATE TABLE IF NOT EXISTS musicas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    apelido VARCHAR(120) NOT NULL,
    musica VARCHAR(250) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    album VARCHAR(150) NOT NULL,
    anoLanc CHAR(4) NOT NULL
    );
```

## Conexão com o Banco

Para conexão com o Banco de Dados, faz-se uso do JDBC (Java Database Connectivity), API do Java que permite conectar uma aplicação com o banco e enviar comandos SQL.

Por padrão, o nome de usuário do banco está como "root", e a senha "1234". Estas informações podem ser alteradas em: `src/main/resources/application.properties`. Neste mesmo arquivo estão as credencias de acesso ao banco:

```properties
spring.application.name=projeto-integrado
spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=none

spring.datasource.url=jdbc:mysql://localhost:3306/projeto_integrado
spring.datasource.username=root
spring.datasource.password=1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

## Execução

Para executar o projeto, são necessários algumas etapas:

* em API-Rest, deve-se fazer o seguinte caminho: `src/main/java/school/sptech/projetointegrado/ProjetoIntegradoApplication.java` e clicar no botão de execução (play verde), ou executar o comando **mvn spring-boot:run** O projeto deve abrir em "http://localhost:8080".

* simultaneamente, em React, deve-se rodar o comando **npm install** e, em seguida, o comando **npm run dev**. O front-end deve abrir em "http://localhost:5173"

## Exemplos de Requisições

Como citado anteriormente, são três os verbos utilizados nesta aplicação: GET, POST e DELETE.

### GET/musicas/listagem
    * Response Body (200 OK):

```JSON
[
    {
    "id": 1,
    "nome": "José da Silva",
    "apelido": "zezé",
    "musica": "Livin' On A Prayer",
    "autor": "Bon Jovi",
    "album": "Slippery When Wet",
    "anoLanc": 1986
    }
]
```

### POST/musicas/cadastro
    * Request Body (JSON):

```JSON
{
  "nome": "José da Silva",
  "apelido": "zezé",
  "musica": "Livin' On A Prayer",
  "autor": "Bon Jovi",
  "album": "Slippery When Wet",
  "anoLanc": 1986
}
```

    * Response Body (201 Created):

```JSON
{
  "id": 1,
  "nome": "José da Silva",
  "apelido": "zezé",
  "musica": "Livin' On A Prayer",
  "autor": "Bon Jovi",
  "album": "Slippery When Wet",
  "anoLanc": 1986
}
```

### DELETE/musicas/exclusao/{id}

    * Response Body (204 No Content)
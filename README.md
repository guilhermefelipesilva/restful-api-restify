# restful-api-restify

## API RESTFUL COM RESTIFY

Para rodar banco de dados MySQL instalar Docker

Comando para criar banco de dados: docker run --name restful-ws -p 3306:3306 -e MYSQL_DATABASE=restful-ws -e MYSQL_ROOT_PASSWORD=restful-ws -d mysql

Para se conectar usar, database: restful-ws, user: root, senha: restful-ws

Para criar tabela categories:

create table categories (
id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(255),
PRIMARY KEY(id)
);
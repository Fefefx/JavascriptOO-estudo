
//Carrega o módulo do express invocando internamente o http
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

/*Exporta o arquivo index dentro da pasta routes
  Como referencio uma pasta do meu projeto preciso
  iniciar a referêcia com ./.*/
//let routesIndex = require('./routes/index');
//let routesUsers = require('./routes/users');

//Invoca o método do express 
let app = express();
/*Configura o módulo para poder ler o dado proveniente
  de uma solicitação, independente da codificação da
  página.*/
app.use(bodyParser.urlencoded({ extended: false }));
/*Adiciona o módulo de interpretação de solições
  POST ao express, indicando que as respostas 
  devem ser do tipo JSON.*/
app.use(bodyParser.json());

/*Inclua todas as rotas da pasta routes em
  app, responsável por representar o servidor.*/
consign().include('routes').into(app);

//Especifica que o servidor deve usar as seguintes rotas
//app.use(routesIndex);
//Diz que todas as rotas desse arquivo começam com /users
//app.use('/users',routesUsers);

/*Especifica que o servidor deve lidar com as 
  solicitções que venham da porta 3000 com o IP 
  127.0.0.1 (no caso local), executando uma função
  para cada escuta.*/
app.listen(3000,'127.0.0.1',()=>{
	console.log('Servidor rodando !');
});


//Carrega o módulo do express invocando internamente o http
const express = require('express');

/*Exporta o arquivo index dentro da pasta routes
  Como referencio uma pasta do meu projeto preciso
  iniciar a referêcia com ./.*/
let routesIndex = require('./routes/index');
let routesUsers = require('./routes/users');

//Invoca o método do express 
let app = express();

//Especifica que o servidor deve usar as seguintes rotas
app.use(routesIndex);
//Diz que todas as rotas desse arquivo começam com /users
app.use('/users',routesUsers);

/*Especifica que o servidor deve lidar com as 
  solicitções que venham da porta 3000 com o IP 
  127.0.0.1 (no caso local), executando uma função
  para cada escuta.*/
app.listen(3000,'127.0.0.1',()=>{
	console.log('Servidor rodando !');
});

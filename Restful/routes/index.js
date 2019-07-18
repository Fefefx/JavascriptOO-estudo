//let express = require('express');
//Carrega o recurso de rotas do express
//let routes = express.Router();
//Define a resposta para a rota /


//Retorna o módulo para quem o tiver chamando.
module.exports = app =>{
	app.get('/',(req,res)=>{
		/*Define o status da conexão http como 200,
		  indicando que ela foi bem sucedida.*/
		res.statusCode = 200;
		/*Especifica que a resposta será do tipo HTML,
		  para que a mesma possa ser processada pelo
		  navegador.*/
		res.setHeader('Content-type','text-html');
		res.end('<h1>Olá mundo!</h1>');
	});
}
let express = require('express');
let routes = express.Router();

//Resposta para a rota /users
routes.get('/',(req,res)=>{
	res.statusCode = 200;
	//Define o tipo da resposta como sendo um json.
	res.setHeader('Content-type','application/json');
	/*O módulo Express adiciona a função de resposta json.
	  Ela permite converter diretamente a resposta para string json,
	  tornando dispensável a utilização do método stringify. */
	res.json({
		users:[{
				name: 'Hcode',
				email: 'contato@hcode.com.br',
				id: 1
			}]
	});
});

routes.get('/admin',(req,res)=>{
	res.statusCode = 200;
	res.setHeader('Content-type','application/json');
	res.json({
		users:[]
	});
});

module.exports = routes;
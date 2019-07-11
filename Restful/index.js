//Carrega o módulo http
const http = require('http');

let server = http.createServer((req,res)=>{
	//Mostra a URL  do site que enviou a requisição
	console.log('URL: '+req.url);
	//Mostra o método da requisição
	console.log('METHOD: '+req.method);
	//Devolve a resposta Ok
	//res.end('Ok');
	switch(req.url){
		case '/':
			/*Define o status da conexão http como 200,
			  indicando que ela foi bem sucedida.*/
			res.statusCode = 200;
			/*Especifica que a resposta será do tipo HTML,
			  para que a mesma possa ser processada pelo
			  navegador.*/
			res.setHeader('Content-type','text-html');
			res.end('<h1>Olá mundo!</h1>');
		break;
		case '/users':
			res.statusCode = 200;
			//Define o tipo da resposta como sendo um json.
			res.setHeader('Content-type','application/json');
			res.end(JSON.stringify({
				users:[{
					name: 'Hcode',
					email: 'contato@hcode.com.br',
					id: 1
				}]
			}));
		break;

	}
});
/*Especifica que o servidor deve lidar com as 
  solicitções que venham da porta 3000 com o IP 
  127.0.0.1 (no caso local), executando uma função
  para cada escuta.*/
server.listen(3000,'127.0.0.1',()=>{
	console.log('Servidor rodando !');
});
//let express = require('express');
//let routes = express.Router();

//Carrega o módulo do banco NeDb
let NeDB = require('nedb');

/*Especifica que as informações devem ser salvas no
  arquivo users.db. O segundo parâmetro define a criação
  automática desse arquivo, caso ele não exista.*/
let db = new NeDB({
	filename: 'users.db',
	autoload: true
});

module.exports = app =>{
	//Define a rota como /users
	let route = app.route('/users');
	//Resposta para a rota /users usando do método get
	route.get((req,res)=>{
		/*Find pesquisa objetos no banco. Quando vazio retorna 
		  todos os dados armazenados.Sort define por qual chave
		  os mesmos serão ordenados, para ordenar de maneira
		  crescente use o parâmetro 1 e decrescente -1.Exec
		  define uma função para ser executada a cada
		  solicitação.*/
		db.find({}).sort({name:1}).exec((err,users)=>{
			if(err){
				app.utils.error.send(err,req,res);
			}else{
				res.statusCode = 200;
				//Define o tipo da resposta como sendo um json.
				res.setHeader('Content-type','application/json');
				/*O módulo Express adiciona a função de resposta json.
				  Ela permite converter diretamente a resposta para string json,
				  tornando dispensável a utilização do método stringify. */
				res.json({
					/*No ACMA 6 quando uma chave possui o mesmo nome
					  de uma variável basta declarar apenas a chave 
					  que o interpretador entendente que a variável
					  é o valor daquela chave.*/
					users
				});
			}
		});

	});
	//Resposta para a rota /users usando do método post
	route.post((req,res)=>{
		if(!app.utils.validator.user(app,req,res)) return false;
		/*A propriedade body armazena os campos que
		  foram enviados na requisição.*/
		//res.json(req.body);
		//insere um dado no banco de dados e executa uma função.
		//A função recebe um possível erro na inserção e os dados.
		db.insert(req.body,(err,user)=>{
			//Verifica a existência do erro
			if(err){
				app.utils.error.send(err,req,res);
			}else{
				res.status(200).json(user);
			}
		});
	});
	//Define a rota para quando o arquivo receber um parâmetro id
	let routeID = app.route('/users/:id');
	routeID.get((req,res)=>{
		/*Localiza o primeiro registro que tenha o id igual
		  ao parâmetro recebido.*/
		db.findOne({_id:req.params.id}).exec((err,user)=>{
			if(err){
				app.utils.error.send(err,req,res);
			}else{
				res.status(200).json(user);
			}
		});
	});
	//O método Put é usado para atualizar um objeto
	routeID.put((req,res)=>{
		if(!app.utils.validator.user(app,req,res)) return false;
		/*Localiza o primeiro registro que tenha o id igual
		  ao parâmetro recebido e atualiza os seus dados*/
		db.update({_id:req.params.id},req.body,err=>{
			if(err){
				app.utils.error.send(err,req,res);
			}else{
				res.status(200).json(Object.assign(req.params,req.body));
			}
		});
	});
	routeID.delete((req,res)=>{
		//Remove registros do banco de dados
		//2ºParâmetro define se a exclusão será de um ou mais registros
		db.remove({_id:req.params.id},{},err=>{
			if(err){
				app.utils.error.send(err,req,res);
			}else{
				res.status(200).json(req.params.id);
			}
		});
	});	
}
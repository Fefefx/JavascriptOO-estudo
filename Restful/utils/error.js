module.exports = {
	/*Retorna a função send que trata de um erro.
	  Define o status padrão da conexão como 400.*/
	send: (err, req, res, code = 400) =>{
		console.log(`error: ${err}`);
		//Indica que houve erro ao processar a solicitação e devolve um JSON.
		res.status(code).json({
			error: err
		});
	}
}
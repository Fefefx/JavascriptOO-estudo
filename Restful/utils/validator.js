module.exports = {
	user: (app,req,res) =>{
		/*Adiciona a validação para caso o parâmetro 
		  name seja vazio.*/
		req.assert('name','O nome é obrigatório').notEmpty();
		req.assert('email','O e-mail está inválido').notEmpty().isEmail();
		let errors = req.validationErrors();
		if(errors){
			app.utils.error.send(errors,req,res);
			return false;
		}else{
			return true;
		}
	}
}
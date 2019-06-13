/*var name = document.querySelector("#exampleInputName");
//Traga todos os elementos do formulário que tenham nome igual a gender e estejam checados.
var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");
var birth = document.querySelector("#exampleInputBirth");
var country = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var password = document.querySelector("#exampleInputPassword");
var photo = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin");
*/
//Seleciona todos os campos do formulário que possuem atributo name
var fields = document.querySelectorAll("#form-user-create [name]");

var user = {};

/*document.querySelectorAll("button").forEach(function(){
	this.addEventListener("click",function(){
		console.log("Clicou !");
	});
});*/

document.getElementById("form-user-create").addEventListener("submit",function(event){
	//Cancela o evento pdrão do elemento no caso o submit
	//Ideal para Single Page Aplication (SPA)
	event.preventDefault();
	fields.forEach(function(field, index){
		if(field.name == "gender"){
			if(field.checked)
				user[field.name] = field.value;
		}else{
				/*Define a chave do objeto user como sendo o nome do campo
				 e atribui o valor como propriedade da chave. */
				user[field.name] = field.value;
		}
	});
	console.log(user);
});

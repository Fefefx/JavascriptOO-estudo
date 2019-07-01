class UserController{

	constructor(formId,tableId){
		this.formEl = document.getElementById(formId);
		this.tableEl = document.getElementById(tableId);
		this.onSubmit();
	}

	onSubmit(){
		this.formEl.addEventListener("submit",event=>{
			//Cancela o evento padrão do elemento no caso o submit
			//Ideal para Single Page Aplication (SPA)
			event.preventDefault();
			//Pesquisa pelo botão submit dentro do formulário
			let btn = this.formEl.querySelector("[type=submit]");
			//Desabilita o botão
			btn.disabled = true;
			let values = this.getValues();
			/*Invoca a promise */
			this.getPhoto().then(
				//Parâmetro resolve
				/*Sempre que usar this evitar criar funções com function, 
				  pois elas mudam o escopo.*/
				(content)=>{
					values.photo = content;
					this.addLine(values);
					//Limpa os campos do formulário
					this.formEl.reset();
					//Habilita o botão novamente
					btn.disabled = false;
				},
				//Parâmentro reject
				(e)=>{
					//Exibe o erro no console do navegador
					console.error(e);
				}
			);	
		});
	}

	getPhoto(){
		/*Define uma promessa para uma ação assíncrona (no caso o carregamento da imagem). 
		  Se a tudo der certo, executa a ação especificada pelo parâmetro resolve, senão 
		  executa a ação do parâmetro reject.*/
		return new Promise((resolve,reject)=>{
			let fileReader = new FileReader();
			let elements = [...this.formEl.elements].filter(item=>{
				if(item.name === 'photo'){
					return item;
				}
			});
			let file = elements[0].files[0];
			//Callback a ser executado quando a imagem terminar de ser carregada. 
			fileReader.onload = () =>{
				//Retorna a imagem no formato Base64
				resolve(fileReader.result);
			};
			//Callback que é disparado quando ocorre um erro no processo de leitura do arquivo.
			fileReader.onError = () =>{
				reject(e);
			};
			if(file)
				fileReader.readAsDataURL(file);
			else
				resolve("dist/img/boxed-bg.jpg");
		});
	}

	getValues(){		
		let user = {};
		/*Os cochetes definem o elemento como um Array e a reticências (Spread) 
		  define que sejam pegos todos os elementos sem que precise especificar
		  o índice.*/ 
		[...this.formEl.elements].forEach(function(field, index){
			if(field.name == "gender"){
				if(field.checked)
					user[field.name] = field.value;
			}else if(field.name == "admin"){
				//Captura um booleano indicando se a checkbox está checada ou não
				user[field.name] = field.checked;
			}else{
					/*Define a chave do objeto user como sendo o nome do campo
					e atribui o valor como propriedade da chave. */
					user[field.name] = field.value;
			}
		});
		return new User(user.name,
			user.gender,
			user.birth,
			user.country,
			user.email,
			user.password,
			user.photo,
			user.admin);
	}

	addLine(dataUser){
		let tr = document.createElement("tr");
		tr.innerHTML = `<tr>
                    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin)?'Sim':'Não'}</td>
                    <td>${Utils.dateFormat(dataUser.register)}</td>
                    <td>
                      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                  </tr>`;
        //Adiciona um elemento filho a outro sem substituir o conteúdo já existente.
        this.tableEl.appendChild(tr);
	}

}

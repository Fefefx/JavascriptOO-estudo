class HttpRequest {

    static get(url,params = {}){
        return HttpRequest.request('GET',url,params);
    }

    static post(url,params = {}){
        return HttpRequest.request('POST',url,params);
    }

    static put(url,params = {}){
        return HttpRequest.request('PUT',url,params);
    }

    static delete(url,params = {}){
        return HttpRequest.request('DELETE',url,params);
    }

    static request(method,url,params = {}){

        return new Promise((resolve,reject)=>{

            let ajax = new XMLHttpRequest();
            //Configura o uso da rota
            ajax.open(method.toUpperCase(),url);
            let obj = {};
            ajax.onerror = event =>{
                reject(event);
            }
            /*Quando terminar de obter os dados da rota,
              executa a function.*/
            ajax.onload = event =>{
                try{
                    obj = JSON.parse(ajax.responseText);
                }catch(e){
                    reject(e);
                    console.error(e);
                }
                resolve(obj);
            };
            
            ajax.setRequestHeader('Content-type','application/json');

            //Invoca a solicitação AJAX
            ajax.send(JSON.stringify(params));

        });

    }
}
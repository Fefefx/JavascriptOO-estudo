class Fetch {

    static get(url,params = {}){
        return Fetch.request('GET',url,params);
    }

    static post(url,params = {}){
        return Fetch.request('POST',url,params);
    }

    static put(url,params = {}){
        return Fetch.request('PUT',url,params);
    }

    static delete(url,params = {}){
        return Fetch.request('DELETE',url,params);
    }

    static request(method,url,params = {}){

        return new Promise((resolve,reject)=>{

            let request;

            //Trata o erro da solicitação com/sem body
            switch(method.toLowerCase()){
                case 'get':
                    request = url;
                break;
                default:
                    request = new Request(url, {
                        method,
                        body: JSON.stringify(params),
                        headers: new Headers({
                            'Content-Type':'application/json'
                        }) 
                    });
            }

            /* A API Fetch visa substituir futuramente o 
               o AJAX, porém ainda não está implementada 
               em todos os navegadores e plataformas. */
            // Fetch retorna uma promessa
                fetch(request).then(response=>{
                    response.json().then(json=>{
                        resolve(json);
                    }).catch(e=>{
                        reject(e);
                    });
                }).catch(e=>{
                    reject(e);
                }); 
        });

    }
}
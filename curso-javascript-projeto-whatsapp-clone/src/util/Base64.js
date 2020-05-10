export class Base64 {
    static getMimetype(urlBase64) {
        //Cria uma expressão regular. Também pode ser criada por new RegExp(). Cuidado com espaços.
        /*
            ^ inicia com
            $ termina com
            (.*) Qualquer coisa com tamanho indefinido
            (.+) O que procuro
        */
        let regex = /^data:(.+);base64,(.*)$/;
        //Executa a expressão sobre a string
        let result = urlBase64.match(regex);
        return result[1];
    }
    static toFile(urlBase64){
        let mimeType = Base64.getMimetype(urlBase64);
        let ext = mimeType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;
        return fetch(urlBase64).then(res => {
            //Retorna uma promise
            return res.arrayBuffer();
        }).then(buffer => {
            return new File([buffer], filename, {
                type: mimeType
            });
        });
    }
}
export class ClassEvent{
    constructor(){
        this._events = {};
    }
    on(eventName, fn){
        if(!this._events[eventName]) 
            this._events[eventName] = new Array();
        this._events[eventName].push(fn);
    }
    trigger(){
        // A variável arguments contém todos os argumentos que foram passados
        let args = [...arguments];
        // Extrai o primeiro elemento do vetor e o armazena na variável
        let eventName = args.shift();
        args.push(new Event(eventName));
        //Verifica se a chave do objeto é um array com funções a serem executadas
        if(this._events[eventName] instanceof Array){
            this._events[eventName].forEach(fn => {
                //Executa o código armazenado na variável
                fn.apply(null,args);
            });
        }
    }
}
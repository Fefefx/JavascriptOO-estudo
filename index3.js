//Define uma função tradicional
function calc(x1,x2,operator){
    // executa a operação definida pela string
    return eval(`${x1} ${operator} ${x2}`);
}
let resultado=calc(1,2,"/");
console.log(resultado);
//Define uma função oculta que só pode ser executada uma vez após ser criada
console.log((function(x1,x2,operator){
    return eval(`${x1} ${operator} ${x2}`);
})(10,20,"*"));
//Define uma Arrow Function armazenando o resultado em uma variável
let calc2 =(x1,x2,operator) => {
    return eval(`${x1} ${operator} ${x2}`);
};
console.log(calc2(30,20,"/"));
/* Executa a arrow function quando ocorre o evento de perca de foco na janela do navegador
window.addEventListener('focus',event =>{
    console.log("focus");
});*/
// Window = Janela Document = Site
/*Executa a arrow function quando ocorre o evento de clique no site
document.addEventListener('click',event =>{
    console.log("Clique ocorreu");
}); */
//Exibe a quantidade de milissegundos desde 01/01/1970 
let agora1= Date.now();
console.log("Data em milissegundos: "+agora1);
agora1=new Date();
console.log(agora1);
//Retorna o dia 
console.log(agora1.getDate());
//Retorna o ano da data
console.log(agora1.getFullYear());
//Retorna o mês da data com valor númerico do mês -1 devido a ser um array que inicia de 0
console.log(agora1.getMonth());
//Exibe a data com o padrão do Brasil !
console.log(agora1.toLocaleString("pt-BR"));
//Define um vetor que pode armazenar qualquer tipo de variável
let carros=["palio 98","toro","uno",10,true, new Date(),function(){}];
//Exibe o conteúdo do vetor
console.log(carros);
//Exibe a quantidade de elementos do vetor 
console.log(carros.length);
//Captura o elemento da posição 5
console.log(carros[5]);
//Extrai o ano do elemento do vetor
console.log(carros[5].getFullYear());
carros.forEach(function(value,index){
    console.log(`Indíce: ${index} Elemento ${value}`);
});
let avioes=["TAM","GOL","America Aeirlines",true,10,function(){}];
avioes.forEach(function(index,value){
    console.log(`${index} - ${value}`)
});
//Define uma classe no javascript antigo
let celular=function(){
    //this promove a atributo a variável permmitindo sua visibilidade e acesso externo
    this.cor="prata";
    //Define o método ligar
    this.ligar=function(){
        console.log("Iniciando a ligação !");
        //Se não especificado o retorno imprime undefined no console do navegador !
        return "ligando";
    };
};
let objeto=new celular();
console.log(objeto.cor);
console.log(objeto.ligar());
//Define uma classe segundo o novo javascript
class celular2{
    //Define o que será feito quando o construtor ser invocado
    constructor(){
        this.cor="Vermelho";
    }
    //Define um método segundo o novo javascript !
    ligar(){
        console.log("Iniciando a ligação !");
        return "ligando";
    }
};
objeto=new celular2();
console.log(objeto.cor);
console.log(objeto.ligar());
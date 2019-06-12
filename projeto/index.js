/**
 * Meu primeiro código em javascript 
 */
//Esse código escreve no console do navegador 
console.log('Olá mundo !');

//alert('Olá mundo'); Exibe o alerta olá mundo
/*console.log('Olá mundo !');
console.log('Olá mundo !');*/

// Define uma variável fracamente tipada 
var olaMundo = "Hello world !";

console.log(olaMundo);
console.log(olaMundo);
console.log(olaMundo);
console.log(olaMundo);

// Define uma variável local 
let a = 10;

//Define uma constante 
const b = "10";

//Compara se as duas variáveis são iguais ignorando a tipagagem de ambas
console.log(a==b);

//Compara se as duas variáveis são iguais tanto em conteúdo quando tipo
console.log(a===b);

// !== compara se as variáveis são diferentes tanto em conteúdo quanto em tipo
// != compara se as variáveis são diferentes em conteúdo ignorando a tipagem

//Operador lógico e
console.log(a == b && typeof a == 'string');

//Operador lógico ou
console.log(a == b || typeof a == 'string');

let cor="amarelo";

if(cor==="verde"){
    console.log('Siga em frente !');
}else if(cor==="amarelo"){
    console.log('Atenção')
}
else{
    console.log('Pare')
}
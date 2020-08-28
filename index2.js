let color="azul";
switch(color){
    case "verde":
        console.log('Siga');
    break;
    case "amarelo":
        console.log('Atenção');
    break;
    case "vermelho":
        console.log('Pare');
    break;
    default:
        console.log('Não sei !')
}
let n=7;
for(let i=0;i<=10;i++){
    /* A crase especifica um template string permitindo que  o texto 
    tenha comandos junto ao texto além contar as quebras de linha */  
    console.log(`${i} X ${n} = ${i*n}`);
    /*Equivalente ao comando anterior
    console.log(i+"X"+n+"="+(i*n));
    */
}
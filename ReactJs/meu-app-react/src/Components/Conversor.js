import React from 'react';
import './Conversor.css';

var properties = {
    moedaA: '',
    moedaB: '',
    moedaA_valor: '',
    moedaB_valor: 0,
}

function setProperties(props){
    properties.moedaA = props.moedaA;
    properties.moedaB = props.moedaB;
}

function converter(){
    let de_para = `${properties.moedaA}_${properties.moedaB}`;
    let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=de487369f3ab43b61ee0`;
    fetch(url).then(res=>{
        return res.json();   
    }).then(json=>{
        let cotacao = json[de_para];
        console.log(url,cotacao);
        //Fixed arrendonda o valor para duas casas decimais
        properties.moedaB_valor = (parseFloat(properties.moedaA_valor) * cotacao).toFixed(2);
        document.getElementById('valor-convertido').innerHTML = properties.moedaB_valor;
    });
}

function Conversor(props){
    setProperties(props);
    return(
        <div className="Conversor">
            <h2> {props.moedaA} para {props.moedaB}: </h2>
            <input type="text" onChange={(event)=>properties.moedaA_valor=event.target.value}></input>
            <input type="button" value="Converter" onClick={converter}></input>
            <h2 id="valor-convertido">0</h2>
        </div>
    );
}

export default Conversor;
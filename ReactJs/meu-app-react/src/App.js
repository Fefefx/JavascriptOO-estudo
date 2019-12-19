import React from 'react';
import './App.css';
import Conversor from './Components/Conversor.js';

function App() {
  return (
    <div className="App">
      <Conversor moedaA="USD" moedaB="BRL"></Conversor>
      <Conversor moedaA="BRL" moedaB="USD"></Conversor>
    </div>
  );
}

export default App;

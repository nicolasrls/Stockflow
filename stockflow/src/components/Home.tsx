import React from 'react';
import '../styles/Home.css';


const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Stock Flow</h1>
      <div className="button-container">
        <button id="vendas" onClick={() => window.location.href = '/vendas'}>
          Vendas
        </button>
        <button id="Estoque" onClick={() => window.location.href = '/estoque'}>
          Estoque
        </button>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Stock Flow</h1>
      <div className="button-container">
        <button id="vendas" onClick={() => navigate('/vendas')}>
          Vendas
        </button>
        <button id="Estoque" onClick={() => navigate('/estoque')}>
          Estoque
        </button>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Vendas from './components/Vendas';
import Estoque from './components/Estoque';

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
};

export default Rotas;

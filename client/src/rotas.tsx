import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Vendas from './components/vendas/Vendas';
import Estoque from './components/estoque/Estoque';
import Registro from './components/Registro';
import Login from './components/Login';

const Rotas: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
};

export default Rotas;

// src/Router.jsx
import { Routes, Route } from 'react-router-dom';
import { Login, Cadastrar, Dashboard, Produtoscad, PagPerfil } from './pages';
import { PagIncial } from './pages/PagInicial/paginicial';
import { LayoutsPadrao } from './layouts/LayoutsPadrao/LayoutsPadrao';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutsPadrao />}>
        <Route index element={<PagIncial />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastra-se" element={<Cadastrar />} />
        <Route path="Perfil" element={<PagPerfil />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="produtos/:grupoId" element={<Produtoscad />} />
      </Route>
    </Routes>
  );
};

export { Router };
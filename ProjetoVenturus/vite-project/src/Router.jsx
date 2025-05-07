import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Cadastrar, Dashboard, Produtoscad } from './pages';
import { PagIncial } from "./pages/PagInicial/paginicial";
import { LayoutsPadrao } from "./layouts/LayoutsPadrao/LayoutsPadrao";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutsPadrao />}>
          <Route index element={<PagIncial />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastra-se" element={<Cadastrar />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="produtos/:grupoId" element={<Produtoscad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
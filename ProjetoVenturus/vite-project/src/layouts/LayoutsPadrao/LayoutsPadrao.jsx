import { Outlet } from "react-router-dom";
import { Cabecalho, PagIncial, FormLogin, FormCadastrar, Rodape } from "../../components";
import { AuthContext } from "../../Context";
import { UseAuthContext } from "../../hooks";
import style from './LayoutsPadrao.module.css'; 

const LayoutsPadrao = () => {
const {} = UseAuthContext(AuthContext);
return (
    <div className={style.layout}>
      <Cabecalho />
        <main>
            <Outlet />
        </main>
      <Rodape />
    </div>
  );
};

export { LayoutsPadrao};
// src/components/Cabecalho/Cabecalho.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context';
import { useLoading } from '../../Context/ContextLoading';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import style from './cabecalho.module.css';

// Componente personalizado para Links com loading
const LinkComLoading = ({ to, children, className }) => {
  const { setIsLoading } = useLoading() || {};

  const handleClick = () => {
    if (setIsLoading) {
      setIsLoading(true); // Ativa o loading
    }
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

const Cabecalho = () => {
  const { usuario } = useContext(AuthContext);
  const { setIsLoading } = useLoading() || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (setIsLoading) {
      setIsLoading(true); // Ativa o loading
    }
    try {
      await signOut(auth);
      navigate('/'); // Navega para a página inicial
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Verifique o console para mais detalhes.');
    } finally {
      if (setIsLoading) {
        setIsLoading(false); // Desativa o loading
      }
    }
  };

  return (
    <div className={style.Cabecalho}>
      <LinkComLoading className={style.linkB} to="/">
        {/* LADO ESQUERDO */}
        <div className={style.filho}>
          <img src='../../../fazenda.png' alt="Logo FarmFeeding" />
        </div>
        <div className={style.nome}>
          Farm<span>Feeding</span>
        </div>
      </LinkComLoading>
      {/* LADO DIREITO */}
      <div className={style.direito}>
        {usuario ? (
          <>
            <LinkComLoading className={style.linkC} to="/Perfil">
              <button className={style.cad}>Perfil</button>
            </LinkComLoading>
            <button className={style.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <LinkComLoading className={style.linkC} to="/cadastra-se">
              <button className={style.cad}>Cadastre-se</button>
            </LinkComLoading>
            <LinkComLoading className={style.linkC} to="/login">
              <button className={style.login}>Login</button>
            </LinkComLoading>
          </>
        )}
      </div>
    </div>
  );
};

export { Cabecalho };
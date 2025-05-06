import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context'; // Ajuste o caminho conforme sua estrutura
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase'; // Ajuste o caminho conforme sua estrutura
import style from './cabecalho.module.css';

const Cabecalho = () => {
    const { usuario } = useContext(AuthContext); // Obtém o estado do usuário
    const navigate = useNavigate(); // Para redirecionar após logout

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redireciona para a página inicial após logout
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            alert('Erro ao fazer logout. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className={style.Cabecalho}>
            <Link className={style.linkB} to="/">
                {/* LADO ESQUERDO */}
                <div className={style.filho}>
                    <img src='./public/fazenda.png' alt="Logo FarmFeeding" />
                </div>
                <div className={style.nome}>
                    Farm<span>Feeding</span>
                </div>
            </Link>
            {/* LADO DIREITO */}
            <div className={style.direito}>
                {usuario ? (
                    <>
                        <Link className={style.linkC} to="/perfil">
                            <button className={style.cad}>Perfil</button>
                        </Link>
                        <button className={style.login} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className={style.linkC} to="/cadastra-se">
                            <button className={style.cad}>Cadastre-se</button>
                        </Link>
                        <Link className={style.linkD} to="/login">
                            <button className={style.login}>Login</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export { Cabecalho };
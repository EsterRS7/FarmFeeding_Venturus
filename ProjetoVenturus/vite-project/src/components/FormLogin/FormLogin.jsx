import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//Estilização
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './FormLogin.module.css';

//BD
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth} from '../../services/firebase';

const FormLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  const [mensagem, setMensagem] = useState('');

  const submeterFormulario = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
      setMensagem('E-mail ou senha incorretos!');
    }
  };

  return(
    <MDBContainer fluid className={`p-0`}>
      <MDBRow className="g-0">
        {/* Lado esquerdo: Formulário */}
        <MDBCol md="6" className="d-flex align-items-center justify-content-center bg-white">
          <form onSubmit={submeterFormulario} className={`p-5 rounded shadow w-75`}>
          
            <h3 className="text-center mb-4">Faça Login Aqui!</h3>

            <div className="mb-4">
              <MDBInput
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                />
            </div>

            <div className="mb-4">
                <div style={{ position: 'relative' }}>
                    <MDBInput
                      label="Senha"
                      id="senha"
                      type={senhaVisivel ? 'text' : 'password'}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      className="form-control"
                    />
                    <MDBBtn
                      type="button"
                      color="light"
                      size="sm"
                      onClick={() => setSenhaVisivel(!senhaVisivel)}
                      style={{
                          position: 'absolute',
                          top: '2px',
                          right: '10px',
                          zIndex: 1,
                          minWidth: '36px',
                          padding: '4px 8px',
                      }}
                    >
                      {senhaVisivel ? <FaEyeSlash /> : <FaEye />}
                    </MDBBtn>
                </div>
            </div>

            <MDBBtn type="submit" className = {` w-100 ${styles.MDBBtn}`}>
              Entrar
            </MDBBtn>

            {mensagem && <p className="mt-3 text-center text-danger">{mensagem}</p>}

            <div className={styles.textoCadastro}>
              <p className="mb-0">Não é cadastrado?</p>
              <Link to="/cadastra-se"><span>Cadastre-se aqui!</span></Link>
            </div>
          </form>
        </MDBCol>

        {/* Lado direito: Imagem */}
        <MDBCol md="6"  className={`d-none d-md-flex ${styles.imagemLateral}`}>

           <div className={styles.imagemLateralTexto}>

            <h2>Bem-vindo ao seu Sistema de Gerenciamento de Alimentos!</h2>
            <p>Conecte-se e comece a Gerenciar.</p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export { FormLogin };

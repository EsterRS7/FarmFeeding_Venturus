import React,  {useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";

//BD
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


//Estilização
import {MDBContainer,MDBRow,MDBCol,MDBBtn,MDBInput } from 'mdb-react-ui-kit';
import styles from './FormCadastrar.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



const FormCadastrar = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [Nome, setNome] = useState('');
    const [DataNasc, setDataNasc] = useState('');
    const [Endereco, setEndereco] = useState('');
    const [Cidade, setCidade] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [mensagem, setMensagem] = useState('');
  
    const cadastrarUsuario = async (e) => {
      e.preventDefault();
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, Email, Senha);
        const user = userCredential.user;
  
        // 2. Salva dados no Firestore (com UID como ID)
        await setDoc(doc(db, 'usuarios', user.uid), {
          Nome,
          DataNasc,
          Endereco,
          Cidade,
          Telefone,
          Email
        });
  
        login && login({ uid: user.uid, Nome, Email });
        navigate('/');
      } catch (error) {
        setMensagem('Erro ao cadastrar usuário.' +error.message);
      }
    };


return(
    <MDBContainer fluid className={`p-0`}>
          <br /><br />
      <MDBRow className="g-0">
        {/* Lado esquerdo: Formulário */}
        <MDBCol md="6" className="d-flex align-items-center justify-content-center bg-white">
          <form onSubmit={cadastrarUsuario} className={`p-5 rounded shadow w-75`}>
            <h3 className="text-center mb-4">Cadastre-se Aqui!</h3>

            <div className="mb-4">
              <MDBInput
                label="Nome"
                id="Nome"
                type="text"
                value={Nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="form-control"
                />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Data de Nascimento"
                id="DataNasc"
                type="date"
                value={DataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Endereço"
                id="Endereco"
                type="text"
                value={Endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Cidade"
                id="Cidade"
                type="text"
                value={Cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Telefone"
                id="Telefone"
                type="tel"
                value={Telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <MDBInput
                label="Email"
                id="Email"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <div style={{ position: 'relative' }}>
                <MDBInput
                    label="Senha"
                    id="Senha"
                    type={senhaVisivel ? 'text' : 'password'}
                    value={Senha}
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


            <MDBBtn type="submit" className = {`w-100 ${styles.MDBBtn}`}>
              Concluir
            </MDBBtn>

            {mensagem && <p className="mt-3">{mensagem}</p>}
          </form>
        </MDBCol>

        {/* Lado direito: Imagem */}
          <MDBCol md="6"  className={`d-none d-md-flex ${styles.imagemLateral}`}>
                <div>
                  <img src="../../../fazenda-cadastrar.png" alt="Imagem de fazenda" className={styles.imagemCad} />
                  <p className={styles.textoImagem}>
                  Crie sua conta e gerencie suas rações de forma prática e organizada.
                  <br />
                  Seu estoque sempre no controle e seus animais sempre bem cuidados.
                  </p>
                  <h6 className={styles.creditos}>Ilustração por <a href="https://storyset.com/">Storyset</a></h6>
              </div>
          </MDBCol>
        </MDBRow>
      <br /><br />
    </MDBContainer>
  );
};

export {FormCadastrar };
import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import style from './pagperfil.module.css';
import { db } from '../../services/firebase';
import { doc, setDoc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Configuração do Cloudinary
const CLOUDINARY_CLOUD_NAME = "dcbmnqbce";
const CLOUDINARY_UPLOAD_PRESET = "UploadFarmFeeding";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
 
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    throw new Error(`Erro ao fazer upload para o Cloudinary: ${errorMessage}`);
  }
};

const PagPerfil = () => {
  const { usuario } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    Nome: '',
    DataNasc: '',
    Endereco: '',
    Cidade: '',
    Telefone: '',
    Email: '',
    foto: null,
    userIdsFromGroups: [],
    produtosCount: 0,
  });
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  
  // Busca os dados do usuário no Firestore, userIds dos grupos e contagem de produtos
  useEffect(() => {
    if (usuario) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'usuarios', usuario.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFormData((prev) => ({
              ...prev,
              Nome: data.Nome || '',
              DataNasc: data.DataNasc || '',
              Endereco: data.Endereco || '',
              Cidade: data.Cidade || '',
              Telefone: data.Telefone || '',
              Email: data.Email || '',
              foto: null,
              userIdsFromGroups: data.userIdsFromGroups || [],
              produtosCount: data.produtosCount || 0,
            }));
            setOriginalData({
              Nome: data.Nome || '',
              DataNasc: data.DataNasc || '',
              Endereco: data.Endereco || '',
              Cidade: data.Cidade || '',
              Telefone: data.Telefone || '',
              Email: data.Email || '',
              fotoURL: data.fotoURL || null,
            });
            if (data.fotoURL) {
              setPreviewImage(data.fotoURL);
            } else {
              setPreviewImage(null);
            }
          } else {
            console.log('Nenhum documento encontrado para o usuário:', usuario.uid);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          alert('Erro ao carregar dados do perfil. Verifique o console para mais detalhes.');
        }
      };
      
      const fetchUserIdsFromGroups = () => {
        const q = query(collection(db, 'grupos'), where('userId', '==', usuario.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const userIds = [];
          const grupoIds = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.userId) {
              userIds.push(data.userId);
              grupoIds.push(doc.id);
            }
          });
          
          const userDocRef = doc(db, 'usuarios', usuario.uid);
          setDoc(userDocRef, { userIdsFromGroups: userIds }, { merge: true })
          .then(() => {
            setFormData((prev) => ({
              ...prev,
              userIdsFromGroups: userIds,
              }));
              fetchProdutosCount(grupoIds);
            })
            .catch((error) => {
              console.error('Erro ao atualizar userIds no perfil:', error);
            });
        }, (error) => {
          console.error('Erro ao buscar userIds dos grupos:', error);
        });
        
        return () => unsubscribe();
      };
      
      const fetchProdutosCount = (grupoIds) => {
        if (grupoIds.length === 0) {
          setFormData((prev) => ({
            ...prev,
            produtosCount: 0,
          }));
          return;
        }
        
        const q = query(collection(db, 'produtos'), where('grupoId', 'in', grupoIds));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const produtosCount = snapshot.docs.length;
          const userDocRef = doc(db, 'usuarios', usuario.uid);
          setDoc(userDocRef, { produtosCount: produtosCount }, { merge: true })
          .then(() => {
            setFormData((prev) => ({
              ...prev,
              produtosCount: produtosCount,
              }));
            })
            .catch((error) => {
              console.error('Erro ao atualizar contagem de produtos no perfil:', error);
            });
          }, (error) => {
            console.error('Erro ao buscar produtos:', error);
          });
          
          return () => unsubscribe();
        };
        
        fetchUserData();
        fetchUserIdsFromGroups();
      }
    }, [usuario]);

    const handleOverlayClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!isEditing) return;
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prev) => ({
        ...prev,
        foto: file,
      }));

      try {
        const fotoURL = await uploadToCloudinary(file);
        const userDocRef = doc(db, 'usuarios', usuario.uid);
        await setDoc(
          userDocRef,
          {
            fotoURL: fotoURL,
            updatedAt: new Date(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
        alert('Falha ao fazer upload da foto.');
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      const userDocRef = doc(db, 'usuarios', usuario.uid);
      await setDoc(
        userDocRef,
        {
          Nome: formData.Nome,
          DataNasc: formData.DataNasc,
          Endereco: formData.Endereco,
          Cidade: formData.Cidade,
          Telefone: formData.Telefone,
          Email: formData.Email,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      setOriginalData({
        Nome: formData.Nome,
        DataNasc: formData.DataNasc,
        Endereco: formData.Endereco,
        Cidade: formData.Cidade,
        Telefone: formData.Telefone,
        Email: formData.Email,
        fotoURL: previewImage || null,
      });
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        alert('Erro ao atualizar o perfil. Verifique o console para mais detalhes.');
    }
  };

  /*Tela de perfil */
  return (
    <div className={style.Perfil}>
      <div className={style.containerPai}>
        <div className={style.voltar}>
          <Link to="/" className={style.linkVolt}>
            <img src='../../../volta.png' alt="Voltar" className={style.btnVoltar}/>
          </Link>
          <h3 className={style.h3}>Seu Perfil</h3>
        </div>
        
        <div className={style.containerFilho}>
          <div className={style.photoContainer}>
            {previewImage ? (
              <img src={previewImage} alt="Pré-visualização" className={style.previewImage} />
            ) : (
              <div className={style.photoIcon}></div>
            )}
            <input
              type="file"
              name="foto"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={!isEditing}
              className={style.photoInput}
              accept="image/*"
            />
            <div className={style.photoOverlay} onClick={isEditing ? handleOverlayClick : undefined}>
              Editar Foto
            </div>
          </div>

          <form className={style.DadosPerfil}>
            <div className={style.groupinput}>
              <p>Nome de usuário:</p>
              <input
                type="text"
                name="Nome"
                className={style.input1}
                placeholder="Digite seu nome"
                value={formData.Nome}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <p>Data de nascimento:</p>
              <input
                type="date"
                name="DataNasc"
                className={style.input1}
                placeholder="Selecione sua data de nascimento"
                value={formData.DataNasc}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <p>Endereço:</p>
              <input
                type="text"
                name="Endereco"
                className={style.input1}
                placeholder="Digite seu endereço"
                value={formData.Endereco}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <p>Cidade:</p>
              <input
                type="text"
                name="Cidade"
                className={style.input2}
                placeholder="Digite sua cidade"
                value={formData.Cidade}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <p>Telefone:</p>
              <input
                type="tel"
                name="Telefone"
                className={style.input2}
                placeholder="Digite seu telefone"
                value={formData.Telefone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <p>Email:</p>
              <input
                type="email"
                name="Email"
                className={style.inputEmail}
                placeholder="Digite seu email"
                value={formData.Email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <br />
              <br />
            </div>
            <div className={`${style.btnAlt} ${isEditing ? style.editing : ''}`}>
              <button
                type="button"
                className={`${style.btnSalvar} ${isEditing ? style.show : style.hide}`}
                onClick={handleSave}
              >
                Salvar Alterações
              </button>

              <button
                type="button"
                className={`${style.btnEditar} ${isEditing ? style.hide : style.show}`}
                onClick={handleEditClick}
              >
                Editar Informações
              </button>
            </div>
          </form>
        </div>
<br />
<hr />
        <div className={style.statsContainer}>
          <div className={style.inf}>
            <div className={style.displayButton}>Grupos Cadastrados: {formData.userIdsFromGroups.length}</div>
            <div className={style.displayButton}>Produtos Cadastrados: {formData.produtosCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PagPerfil };
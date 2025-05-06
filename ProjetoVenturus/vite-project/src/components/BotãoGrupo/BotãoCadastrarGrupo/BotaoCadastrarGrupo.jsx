import { CadastroForm2 } from "../CadastroForm2";
import { useState, useContext } from "react"; // Adicione useContext
import styles from "./Botao.module.css";
import { db, auth } from "../../../services"; // Importe auth
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
import { AuthContext } from "../../../Context"; // Importe o AuthContext
import { Modal } from "../Modal";

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
        throw new Error(`Erro ao fazer upload para Cloudinary: ${errorMessage}`);
    }
};

const BotaoCadastrarGrupo = () => {
    const { usuario } = useContext(AuthContext); // Obtenha o usuário do contexto
    const [isContatoOpen, setIsContatoOpen] = useState(false);
    const [contatoData, setContatoData] = useState({
        Nome: "",
        Especie: "",
        Quantidade: "",
        foto: null,
    });

    const handleContatoInputChange = (e) => {
        const { name, value, files } = e.target;
        setContatoData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleContatoSubmit = async (e) => {
        e.preventDefault();
        console.log("Botão Enviar clicado. Dados do grupo:", contatoData);

        // Verifique se o usuário está autenticado
        if (!usuario) {
            alert("Você precisa estar logado para cadastrar um grupo.");
            return;
        }

        try {
            let fotoURL = null;
            let fotoName = null;

            if (contatoData.foto) {
                fotoName = contatoData.foto.name;
                try {
                    console.log("Iniciando upload da foto para o Cloudinary:", fotoName);
                    fotoURL = await uploadToCloudinary(contatoData.foto);
                    console.log("URL da foto gerada pelo Cloudinary:", fotoURL);
                } catch (error) {
                    console.error("Erro ao fazer upload para o Cloudinary:", error);
                    alert("Falha ao fazer upload da foto. O grupo será salvo sem a imagem.");
                }
            } else {
                console.log("Nenhuma foto selecionada.");
            }

            // Salva os dados no Firestore, incluindo o userId
            const docRef = await addDoc(collection(db, "grupos"), {
                Nome: contatoData.Nome,
                Especie: contatoData.Especie,
                Quantidade: contatoData.Quantidade,
                fotoURL: fotoURL,
                fotoName: fotoName,
                userId: usuario.uid, // Adicione o ID do usuário
                timestamp: new Date(),
            });
            console.log("Grupo salvo com ID:", docRef.id);

            setIsContatoOpen(false);
            setContatoData({
                Nome: "",
                Especie: "",
                Quantidade: "",
                foto: null,
            });
        } catch (error) {
            console.error("Erro ao salvar o grupo:", error);
            alert("Erro ao salvar o grupo. Verifique o console para mais detalhes.");
        }
    };

    return (
        <>
            <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={() => setIsContatoOpen(true)}>
                <span className={styles.mais}>+</span>&nbsp;&nbsp; Cadastrar grupo
            </button>

            <Modal isOpen={isContatoOpen} onClose={() => setIsContatoOpen(false)}>
                <CadastroForm2
                    onSubmit={handleContatoSubmit}
                    formData={contatoData}
                    handleInputChange={handleContatoInputChange}
                />
            </Modal>
        </>
    );
};

export { BotaoCadastrarGrupo };
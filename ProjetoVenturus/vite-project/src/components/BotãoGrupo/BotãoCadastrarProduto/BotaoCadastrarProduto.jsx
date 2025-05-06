import { Modal } from "../Modal";
import { RegistrarProdutoForm } from "../RegistrarProdutoForm";
import { useState } from "react";
import styles from "./Botao.module.css";
import { db } from "../../../services";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

// Configuração do Cloudinary
const CLOUDINARY_CLOUD_NAME = "dcbmnqbce"; // Substitua pelo seu Cloud Name
const CLOUDINARY_UPLOAD_PRESET = "UploadFarmFeeding"; // Verifique este nome no Cloudinary

// Função para fazer upload da imagem para o Cloudinary
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
        return response.data.secure_url; // URL pública da imagem
    } catch (error) {
        // Captura detalhes do erro da resposta
        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(`Erro ao fazer upload para Cloudinary: ${errorMessage}`);
    }
};

const BotaoCadastrarProduto = () => {
    const [isProdutoOpen, setIsProdutoOpen] = useState(false);
    const [produtoData, setProdutoData] = useState({
        nome: "",
        descricao: "",
        marca: "",
        validade: "",
        estoque: "",
        preco: "",
        foto: null,
    });

    const handleProdutoInputChange = (e) => {
        const { name, value, files } = e.target;
        setProdutoData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleProdutoSubmit = async (e) => {
        e.preventDefault();
        console.log("Botão Enviar clicado. Dados do produto:", produtoData);

        try {
            let fotoURL = null;
            let fotoName = null;

            // Tenta fazer upload para o Cloudinary, se houver foto
            if (produtoData.foto) {
                fotoName = produtoData.foto.name;
                try {
                    console.log("Iniciando upload da foto para o Cloudinary:", fotoName);
                    fotoURL = await uploadToCloudinary(produtoData.foto);
                    console.log("URL da foto gerada pelo Cloudinary:", fotoURL);
                } catch (error) {
                    console.error("Erro ao fazer upload para o Cloudinary:", error);
                    alert("Falha ao fazer upload da foto. O produto será salvo sem a imagem.");
                }
            } else {
                console.log("Nenhuma foto selecionada.");
            }

            // Salva os dados no Firestore
            const docRef = await addDoc(collection(db, "produtos"), {
                nome: produtoData.nome,
                descricao: produtoData.descricao,
                marca: produtoData.marca,
                validade: produtoData.validade,
                estoque: produtoData.estoque,
                preco: produtoData.preco,
                fotoURL: fotoURL,
                fotoName: fotoName,
                timestamp: new Date(),
            });
            console.log("Produto salvo com ID:", docRef.id);

            // Fecha o modal e reseta o formulário
            setIsProdutoOpen(false);
            setProdutoData({
                nome: "",
                descricao: "",
                marca: "",
                validade: "",
                estoque: "",
                preco: "",
                foto: null,
            });
        } catch (error) {
            console.error("Erro ao salvar o produto:", error);
            alert("Erro ao salvar o produto. Verifique o console para mais detalhes.");
        }
    };

    return (
        <>
            <button className={styles.button} onClick={() => setIsProdutoOpen(true)}>
                <span className={styles.span}>+</span> Adicionar produto
            </button>

            <Modal isOpen={isProdutoOpen} onClose={() => setIsProdutoOpen(false)}>
                <RegistrarProdutoForm
                    onSubmit={handleProdutoSubmit}
                    formData={produtoData}
                    handleInputChange={handleProdutoInputChange}
                />
            </Modal>
        </>
    );
};

export { BotaoCadastrarProduto };
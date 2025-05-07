import { useState, useEffect } from "react";
import style from './produtoscad.module.css';
import { FaPlus } from "react-icons/fa6";
import { BotaoCadastrarProduto, ListaProdutos } from "../../components";
import { useParams } from "react-router-dom";
import { db } from "../../services";
import { doc, getDoc } from "firebase/firestore";

const Produtoscad = () => {
    const [sortBy, setSortBy] = useState("");
    const [grupoNome, setGrupoNome] = useState("Carregando...");
    const { grupoId } = useParams();

    useEffect(() => {
        const fetchGrupoNome = async () => {
            try {
                const grupoDoc = await getDoc(doc(db, "grupos", grupoId));
                if (grupoDoc.exists()) {
                    setGrupoNome(grupoDoc.data().Nome);
                } else {
                    setGrupoNome("Grupo não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar nome do grupo:", error);
                setGrupoNome("Erro ao carregar grupo");
            }
        };

        fetchGrupoNome();
    }, [grupoId]);

    return (
        <div className={style.pagprodutoscad}>
            <div className={style.containerL1}>
                <p className={style.title}>Grupo: {grupoNome}</p>
                <BotaoCadastrarProduto grupoId={grupoId} />
            </div>

            <div className={style.containerL2}>
                <div className={style.sidebar}>
                    <h3>Ordem:</h3>
                    <button 
                        className={`${style.orderButton} ${sortBy === "alfabetica" ? style.active : ""}`} 
                        onClick={() => setSortBy("alfabetica")}
                    >
                        Alfabética
                    </button>
                    <button 
                        className={`${style.orderButton} ${sortBy === "preco" ? style.active : ""}`} 
                        onClick={() => setSortBy("preco")}
                    >
                        Preço
                    </button>
                    <button 
                        className={`${style.orderButton} ${sortBy === "validade" ? style.active : ""}`} 
                        onClick={() => setSortBy("validade")}
                    >
                        Validade 
                    </button>
                    <button 
                        className={`${style.orderButton} ${sortBy === "marca" ? style.active : ""}`} 
                        onClick={() => setSortBy("marca")}
                    >
                        Marca
                    </button>
                </div>

                <div className={style.productListContainer}>
                    <ListaProdutos sortBy={sortBy} grupoId={grupoId} />
                </div>
            </div>
        </div>
    );
}

export { Produtoscad };
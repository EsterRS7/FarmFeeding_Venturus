import { useEffect, useState, useContext } from "react";
import { db } from "../../services";
import { collection, onSnapshot, deleteDoc, doc, query, where } from "firebase/firestore";
import styles from "./ListarGrupos.module.css";
import { Link } from "react-router-dom";
import { BotaoCadastrarGrupo } from "../BotãoGrupo";
import { AuthContext } from "../../Context/AuthContext";

const ListarGrupos = () => {
    const { usuario } = useContext(AuthContext); // Obter o UID do usuário logado
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        if (!usuario || !usuario.uid) {
            console.warn("Usuário não autenticado ou UID não disponível.");
            setGrupos([]);
            return;
        }

        const q = query(
            collection(db, "grupos"),
            where("userId", "==", usuario.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ListarGrupos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setGrupos(ListarGrupos);
            console.log("Grupos atualizados:", ListarGrupos);
        }, (error) => {
            console.error("Erro ao buscar grupos:", error);
        });

        return () => unsubscribe();
    }, [usuario]);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este grupo?")) {
            try {
                await deleteDoc(doc(db, "grupos", id));
                console.log("Grupo deletado com ID:", id);
            } catch (error) {
                console.error("Erro ao deletar grupo:", error);
                alert("Erro ao deletar grupo. Verifique o console para mais detalhes.");
            }
        }
    };

    return (
        <div className={styles.container}>
            {grupos.length === 0 ? (
                <p className={styles.noGroups}>Nenhum grupo cadastrado.</p>
            ) : (
                <div className={styles.grid}>
                    {grupos.map((grupo) => (
                        <div key={grupo.id} className={styles.card}>
                            {grupo.fotoURL ? (
                                <img
                                    src={grupo.fotoURL}
                                    alt={grupo.Nome}
                                    className={styles.groupImage}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        console.error("Erro ao carregar a imagem. URL:", grupo.fotoURL);
                                    }}
                                />
                            ) : (
                                <div className={styles.noImage}>Sem foto</div>
                            )}
                            <div className={styles.info}>
                                <strong className={styles.groupName}>{grupo.Nome}</strong>
                                <p className={styles.detail}>Espécie: {grupo.Especie}</p>
                                <p className={styles.detail}>Quantidade: {grupo.Quantidade}</p>
                                <Link
                                    to={`/produtos/${grupo.id}`}
                                    className={styles.viewProductsButton}
                                >
                                    Ver Produtos
                                </Link>
                            </div>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(grupo.id)}
                            >
                                Deletar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { ListarGrupos };
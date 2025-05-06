import { useEffect, useState } from "react";
import { db } from "../../services";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import styles from "./ListarGrupos.module.css";
import { BotaoCadastrarGrupo } from "../BotãoGrupo";

const ListarGrupos = () => {
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "grupos"), (snapshot) => {
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
    }, []);

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
            <BotaoCadastrarGrupo/>
            
            
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
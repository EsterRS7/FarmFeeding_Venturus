import { useEffect, useState, useContext } from "react";
import { db } from "../../services";
import { collection, onSnapshot, deleteDoc, doc, query, where, orderBy, updateDoc, getDoc } from "firebase/firestore";
import styles from "./ListaProdutos.module.css";
import { AuthContext } from "../../Context/AuthContext";

const ListaProdutos = ({ sortBy, grupoId }) => {
    const { usuario } = useContext(AuthContext); // Obter o UID do usuário logado
    const [produtos, setProdutos] = useState([]);
    const [estoqueEditado, setEstoqueEditado] = useState({});

    useEffect(() => {
        if (!usuario || !usuario.uid) {
            console.warn("Usuário não autenticado ou UID não disponível.");
            setProdutos([]);
            return;
        }

        // Verificar se o grupo pertence ao usuário logado
        const checkGroupOwnership = async () => {
            const grupoRef = doc(db, "grupos", grupoId);
            const grupoDoc = await getDoc(grupoRef);
            if (!grupoDoc.exists() || grupoDoc.data().userId !== usuario.uid) {
                console.warn("Grupo não encontrado ou não pertence ao usuário logado.");
                setProdutos([]);
                return false;
            }
            return true;
        };

        const fetchProdutos = async () => {
            const isOwner = await checkGroupOwnership();
            if (!isOwner) return;

            let q = query(
                collection(db, "produtos"),
                where("grupoId", "==", grupoId)
            );
            if (sortBy) {
                const field = sortBy === "alfabetica" ? "nome" : sortBy;
                const direction = sortBy === "preco" ? "asc" : "desc";
                q = query(q, orderBy(field, direction));
            }

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const listaProdutos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProdutos(listaProdutos);
                console.log("Produtos atualizados:", listaProdutos);
            }, (error) => {
                console.error("Erro ao buscar produtos:", error);
            });

            return unsubscribe;
        };

        fetchProdutos().then((unsubscribe) => {
            return () => unsubscribe && unsubscribe();
        });
    }, [sortBy, grupoId, usuario]);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            try {
                await deleteDoc(doc(db, "produtos", id));
                console.log("Produto deletado com ID:", id);
            } catch (error) {
                console.error("Erro ao deletar produto:", error);
                alert("Erro ao deletar produto. Verifique o console para mais detalhes.");
            }
        }
    };

    const handleEstoqueChange = async (id, value) => {
        const novoEstoque = parseInt(value) || 0;
        if (novoEstoque < 0) {
            alert("O estoque não pode ser negativo.");
            return;
        }
        try {
            await updateDoc(doc(db, "produtos", id), { estoque: novoEstoque });
            setEstoqueEditado((prev) => ({ ...prev, [id]: novoEstoque }));
            console.log("Estoque atualizado para o produto ID:", id, "Novo valor:", novoEstoque);
        } catch (error) {
            console.error("Erro ao atualizar estoque:", error);
            alert("Erro ao atualizar estoque. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div className={styles.container}>
            {produtos.length === 0 ? (
                <p className={styles.emptyMessage}>Nenhum produto cadastrado para este grupo.</p>
            ) : (
                <div className={styles.itensgrid}>
                    {produtos.map((produto) => (
                        <div key={produto.id} className={styles.productItem}>
                            <div className={styles.productContent}>
                                <div className={styles.productImageContainer}>
                                    {produto.fotoURL ? (
                                        <img
                                            src={produto.fotoURL}
                                            alt={produto.nome}
                                            className={styles.productImage}
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                console.error("Erro ao carregar a imagem. URL:", produto.fotoURL);
                                            }}
                                        />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>Sem foto</div>
                                    )}
                                </div>
                                <div className={styles.productDetails}>
                                    <strong className={styles.productName}>{produto.nome}</strong>
                                    <div className={styles.productInfoList}>
                                        <p className={styles.productInfo}>
                                            <span className={styles.infoLabel}>Descrição:</span> {produto.descricao}
                                        </p>
                                        <p className={styles.productInfo}>
                                            <span className={styles.infoLabel}>Marca:</span> {produto.marca}
                                        </p>
                                        <p className={styles.productInfo}>
                                            <span className={styles.infoLabel}>Validade:</span> {produto.validade}
                                        </p>
                                        <p className={styles.productInfo}>
                                            <span className={styles.infoLabel}>Preço:</span> R${produto.preco}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.actionContainer}>
                                <div className={styles.stockAction}>
                                    Estoque:
                                    <input
                                        type="number"
                                        className={styles.estoqueInput}
                                        value={estoqueEditado[produto.id] !== undefined ? estoqueEditado[produto.id] : produto.estoque}
                                        onChange={(e) => handleEstoqueChange(produto.id, e.target.value)}
                                        min="0"
                                    />
                                </div>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(produto.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { ListaProdutos };
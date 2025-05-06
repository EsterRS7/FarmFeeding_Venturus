import { useEffect, useState } from "react";
import { db } from "../../services";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from "./ListaProdutos.module.css";

const ListaProdutos = ({ sortBy }) => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
            const listaProdutos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProdutos(listaProdutos);
            console.log("Produtos atualizados:", listaProdutos);
        }, (error) => {
            console.error("Erro ao buscar produtos:", error);
        });

        return () => unsubscribe();
    }, []);

    // Função para atualizar o estoque no Firestore
    const handleEstoqueChange = async (produtoId, novoEstoque) => {
        const estoqueNumerico = parseInt(novoEstoque, 10) || 0;
        if (estoqueNumerico < 0) return;
        try {
            const produtoRef = doc(db, "produtos", produtoId);
            await updateDoc(produtoRef, { estoque: estoqueNumerico });
            console.log(`Estoque do produto ${produtoId} atualizado para ${estoqueNumerico}`);
        } catch (error) {
            console.error("Erro ao atualizar o estoque:", error);
            alert("Erro ao atualizar o estoque. Verifique o console.");
        }
    };

    // Função para deletar o produto no Firestore
    const handleDeleteProduto = async (produtoId) => {
        if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;
        try {
            const produtoRef = doc(db, "produtos", produtoId);
            await deleteDoc(produtoRef);
            console.log(`Produto ${produtoId} deletado com sucesso`);
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            alert("Erro ao deletar o produto. Verifique o console.");
        }
    };

    // Função para ordenar os produtos
    const sortProdutos = (produtos) => {
        if (!sortBy) return produtos;

        const sortedProdutos = [...produtos];
        switch (sortBy) {
            case "alfabetica":
                return sortedProdutos.sort((a, b) => 
                    (a.nome || "").localeCompare(b.nome || "")
                );
            case "preco":
                return sortedProdutos.sort((a, b) => 
                    (parseFloat(a.preco) || 0) - (parseFloat(b.preco) || 0)
                );
            case "validade":
                return sortedProdutos.sort((a, b) => {
                    const dateA = a.validade ? new Date(a.validade) : new Date(0);
                    const dateB = b.validade ? new Date(b.validade) : new Date(0);
                    return dateA - dateB;
                });
            case "marca":
                return sortedProdutos.sort((a, b) => 
                    (a.marca || "").localeCompare(b.marca || "")
                );
            default:
                return produtos;
        }
    };

    const sortedProdutos = sortProdutos(produtos);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Produtos Cadastrados</h2>
            {sortedProdutos.length === 0 ? (
                <p className={styles.emptyMessage}>Nenhum produto cadastrado.</p>
            ) : (
                <ul className={styles.productList}>
                    {sortedProdutos.map((produto) => (
                        <li key={produto.id} className={styles.productItem}>
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
                            <div className={styles.productDetails}>
                                <div className={styles.leftDetails}>
                                    <div className={styles.productName}>{produto.nome}</div>
                                    <div className={styles.productInfo}>
                                        Descrição: {produto.descricao || "--"}
                                    </div>
                                    <div className={styles.productInfo}>
                                        Marca: {produto.marca || "--"}
                                    </div>
                                </div>
                                <div className={styles.rightDetails}>
                                    <div className={styles.productInfo}>
                                        Preço: {produto.preco ? `R$ ${parseFloat(produto.preco).toFixed(2)}` : "--"}
                                    </div>
                                    <div className={styles.productInfo}>
                                        Validade: {produto.validade || "--"}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.actionContainer}>
                                <div className={styles.stockContainer}>
                                    <span>Quantidade Atual: </span>
                                    <input
                                        type="number"
                                        value={produto.estoque || ""}
                                        onChange={(e) => {
                                            const novoValor = e.target.value;
                                            setProdutos((prev) =>
                                                prev.map((p) =>
                                                    p.id === produto.id ? { ...p, estoque: novoValor } : p
                                                )
                                            );
                                        }}
                                        onBlur={(e) => handleEstoqueChange(produto.id, e.target.value)}
                                        className={styles.estoqueInput}
                                        min="0"
                                        style={{ width: "80px", padding: "8px", fontSize: "14px" }}
                                    />
                                </div>
                                <button
                                    onClick={() => handleDeleteProduto(produto.id)}
                                    className={styles.deleteButton}
                                    style={{ padding: "8px 15px", fontSize: "14px" }}
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { ListaProdutos };
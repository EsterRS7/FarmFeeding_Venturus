import { useState } from "react";
import style from './produtoscad.module.css'
import { FaPlus } from "react-icons/fa6";
import { BotaoCadastrarProduto, ListaProdutos } from "../../components";

const Produtoscad = () => {
    const [sortBy, setSortBy] = useState(""); // State to track sorting criteria

    return (
        <div className={style.pagprodutoscad}>
            <div className={style.containerL1}>
                <p className={style.title}>Grupo: variavel do nome</p>
                <BotaoCadastrarProduto/>
            </div>

            <div className={style.containerL2}>
                {/* Sidebar for ordering options */}
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

                {/* Product list */}
                <div className={style.productListContainer}>
                    <ListaProdutos sortBy={sortBy}/>
                </div>
            </div>
        </div>
    )
}

export {Produtoscad}
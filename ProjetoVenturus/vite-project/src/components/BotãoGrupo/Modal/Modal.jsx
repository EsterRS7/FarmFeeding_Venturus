import { CadastroForm2 } from "../CadastroForm2";
import { RegistrarProdutoForm } from "../RegistrarProdutoForm";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // Determinar o título com base no tipo de children
    let modalTitle = "Título Padrão"; // Título padrão caso nenhum componente seja identificado
    if (children && children.type) {
        if (children.type === CadastroForm2) {
            modalTitle = "Cadastre novos grupos";
        }else if(children.type === RegistrarProdutoForm){
            modalTitle = "Cadastre novos produtos";
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    {modalTitle}
                    <button onClick={onClose}>×</button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
import { useState, useRef } from 'react';
import { InputForm } from "../InputForm";
import styles from "./RegistrarProdutoForm.module.css";

const RegistrarProdutoForm = ({ onSubmit, formData, handleInputChange }) => {
  // Estado para armazenar a URL da pré-visualização da imagem
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null); // Referência para o input de arquivo

  // Função para lidar com a mudança do input de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Cria uma URL temporária para pré-visualização
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // Chama a função handleInputChange original passando o evento
      handleInputChange(e);
    }
  };

  // Função para disparar o clique no input quando o overlay for clicado
  const handleOverlayClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.formFields}>
          <InputForm
            label="Nome do produto:&nbsp;&nbsp;"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Insira aqui..."
          />
          <InputForm
            label="Descrição:&nbsp;&nbsp;"
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Insira aqui..."
          />
          <InputForm
            label="Marca:&nbsp;&nbsp;"
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
            placeholder="Insira aqui..."
          />
          <div className={styles.inputGroupSideBySide}>
            <InputForm
              label={"Validade: "}
              type="date"
              name="validade"
              value={formData.validade}
              onChange={handleInputChange}
              placeholder="Insira aqui..."
            />
            <InputForm
              label={"Estoque: "}
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={handleInputChange}
              placeholder="Insira aqui..."
            />
          </div>
          <InputForm
            label="Preço:&nbsp;&nbsp;"
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleInputChange}
            placeholder="Insira aqui..."
          />
        </div>
        <div className={styles.photoContainer}>
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Pré-visualização" 
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.photoIcon}></div>
          )}
          <input
            type="file"
            name="foto"
            ref={fileInputRef} // Referência ao input
            onChange={handleFileChange}
            className={styles.photoInput}
            accept="image/*"
          />
          <div 
            className={styles.photoOverlay} 
            onClick={handleOverlayClick} // Evento de clique no overlay
          >
            +
          </div>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Concluir
      </button>
    </form>
  );
};

export { RegistrarProdutoForm };
import { useState, useRef } from 'react';
import { InputForm } from "../InputForm";
import styles from "./CadastroForm2.module.css";

const CadastroForm2 = ({ onSubmit, formData, handleInputChange }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null); // Referência para o input de arquivo

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      handleInputChange(e);
    }
  };

  const handleOverlayClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
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
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.photoInput}
            accept="image/*"
          />
          <div
            className={styles.photoOverlay}
            onClick={handleOverlayClick}
          >
            +
          </div>
        </div>
        <div className={styles.formFields}>
          <div className={styles.inputGroup}>
            <InputForm
              label="Nome grupo:&nbsp;&nbsp;"
              type="text"
              name="Nome"
              value={formData.Nome}
              onChange={handleInputChange}
              placeholder="Insira aqui..."
            />
          </div>
          <div className={styles.inputGroup}>
            <InputForm
              label="Raça:&nbsp;&nbsp;"
              type="text"
              name="Especie" 
              value={formData.Especie}
              onChange={handleInputChange}
              placeholder="Insira aqui..."
            />
          </div>
          <div className={styles.inputGroup}>
            <InputForm
              label="Quantidade de animais:&nbsp;&nbsp;"
              type="number"
              name="Quantidade"
              value={formData.Quantidade}
              onChange={handleInputChange}
              placeholder="Insira aqui..."
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export { CadastroForm2 };
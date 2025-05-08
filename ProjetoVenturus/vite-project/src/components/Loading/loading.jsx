// src/components/Loading/loading.jsx
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
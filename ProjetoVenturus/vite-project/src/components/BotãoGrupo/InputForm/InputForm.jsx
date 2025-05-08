import style from './InputForm.module.css'

const InputForm = ({ label, type, name, value, onChange, placeholder }) => (
  <div className={style.inputGroup}>
    <label>{label}</label>
    <input
      className={style.input}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export { InputForm };
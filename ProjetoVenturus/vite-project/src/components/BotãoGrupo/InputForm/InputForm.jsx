const InputForm = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="inputGroup">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export { InputForm };
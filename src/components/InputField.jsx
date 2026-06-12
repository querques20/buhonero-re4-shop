// Componente reutilizable de campo de formulario.
// Recibe varias props (label, type, name, value, onChange, error, placeholder, autoComplete)
// y se reutiliza para cada input de los formularios de registro y login.
function InputField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block font-['Bebas_Neue'] text-lg tracking-wide text-[#e8e0d0] mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-black/50 border border-[#8a8270]/40 px-3 py-2 text-[#e8e0d0] placeholder-[#6a6555] outline-none focus:border-[#c9a24b] transition-colors"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputField;

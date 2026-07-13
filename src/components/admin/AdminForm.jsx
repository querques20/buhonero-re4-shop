import { useState } from 'react';
import InputField from '../InputField.jsx';

// Formulario genérico del panel: arma los inputs según los campos que le
// pasen y valida los obligatorios antes de mandar nada al backend.
function AdminForm({ campos, inicial, esEdicion, onGuardar, onCancelar }) {
  // Estado inicial: lo que traiga el item (edición) o todo vacío (alta)
  const [valores, setValores] = useState(() => {
    const base = {};
    campos.forEach((c) => {
      base[c.name] = inicial[c.name] ?? '';
    });
    // Los usuarios se identifican por el _id de Mongo, lo llevamos aparte
    if (inicial._id) base._id = inicial._id;
    return base;
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  // Chequea que los campos obligatorios no estén vacíos
  const validar = () => {
    const next = {};
    campos.forEach((c) => {
      if (c.opcional) return;
      if (esEdicion && c.fijo) return; // el id no se toca al editar
      if (String(valores[c.name]).trim() === '') next[c.name] = 'Completá este campo';
    });
    setErrores(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onGuardar(valores, esEdicion);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 border border-[#c9a24b]/40 bg-black/30"
      noValidate
    >
      <h2 className="font-['Bebas_Neue'] text-3xl text-[#e8e0d0] tracking-wider mb-4">
        {esEdicion ? 'Editar' : 'Agregar'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {campos.map((campo) =>
          campo.type === 'select' ? (
            <div key={campo.name} className="mb-4">
              <label
                htmlFor={campo.name}
                className="block font-['Bebas_Neue'] text-lg tracking-wide text-[#e8e0d0] mb-1"
              >
                {campo.label}
              </label>
              <select
                id={campo.name}
                name={campo.name}
                value={valores[campo.name]}
                onChange={handleChange}
                className="w-full bg-black/50 border border-[#8a8270]/40 px-3 py-2 text-[#e8e0d0] outline-none focus:border-[#c9a24b] transition-colors"
              >
                {campo.opciones.map((op) => (
                  <option key={op} value={op} className="bg-black">
                    {op}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <InputField
              key={campo.name}
              label={campo.label}
              type={campo.type || 'text'}
              name={campo.name}
              value={valores[campo.name]}
              onChange={handleChange}
              error={errores[campo.name]}
              disabled={esEdicion && campo.fijo}
            />
          )
        )}
      </div>

      <div className="flex gap-3 mt-1">
        <button
          type="submit"
          className="bg-[#c9a24b] hover:bg-[#d9b25b] text-black font-['Bebas_Neue'] text-xl tracking-wider px-8 py-1.5 transition-colors cursor-pointer"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="border border-[#8a8270]/40 text-[#b8b0a0] hover:text-[#e8e0d0] font-['Bebas_Neue'] text-xl tracking-wider px-8 py-1.5 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default AdminForm;

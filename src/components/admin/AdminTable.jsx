// Tabla genérica del panel: muestra las columnas que le pasen y los botones
// de editar/borrar en cada fila. La misma tabla sirve para las 4 entidades.
function AdminTable({ campos, items, idKey, onEditar, onBorrar }) {
  if (items.length === 0) {
    return <p className="text-[#b8b0a0]">No hay nada cargado todavía.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#c9a24b]/40">
            {campos.map((c) => (
              <th
                key={c.name}
                className="font-['Bebas_Neue'] font-normal text-lg tracking-wider text-[#c9a24b] px-3 py-2"
              >
                {c.label}
              </th>
            ))}
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item[idKey]} className="border-b border-[#8a8270]/20 hover:bg-white/5">
              {campos.map((c) => (
                <td key={c.name} className="px-3 py-2 text-[#e8e0d0]">
                  {item[c.name] ?? '—'}
                </td>
              ))}
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <button
                  onClick={() => onEditar(item)}
                  className="text-[#c9a24b] hover:text-[#d9b25b] mr-4 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => onBorrar(item)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;

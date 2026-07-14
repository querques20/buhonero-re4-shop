import { useEffect, useState } from 'react';
import AdminTable from '../components/admin/AdminTable.jsx';
import AdminForm from '../components/admin/AdminForm.jsx';
import { getWeapons, createWeapon, updateWeapon, deleteWeapon } from '../services/weaponService.js';
import { getPersonajes, createPersonaje, updatePersonaje, deletePersonaje } from '../services/personajeService.js';
import { getEnemigos, createEnemigo, updateEnemigo, deleteEnemigo } from '../services/enemigoService.js';
import { getUsers, updateUser, deleteUser } from '../services/userService.js';

// Configuración de cada sección del panel: sus campos y sus llamadas a la API.
// Con esto la misma tabla y el mismo formulario sirven para las cuatro entidades.
const SECCIONES = {
  armas: {
    titulo: 'Armas',
    idKey: 'id',
    campos: [
      { name: 'id', label: 'Id (ej: red9)', fijo: true },
      { name: 'name', label: 'Nombre' },
      { name: 'category', label: 'Categoría' },
      { name: 'price', label: 'Precio', type: 'number' },
      { name: 'slots', label: 'Slots', type: 'number' },
      { name: 'badge', label: 'Badge', opcional: true },
    ],
    listar: getWeapons,
    crear: createWeapon,
    editar: updateWeapon,
    borrar: deleteWeapon,
  },
  personajes: {
    titulo: 'Personajes',
    idKey: 'id',
    campos: [
      { name: 'id', label: 'Id (ej: leon)', fijo: true },
      { name: 'name', label: 'Nombre' },
      { name: 'rol', label: 'Rol' },
      { name: 'arma', label: 'Arma', opcional: true },
    ],
    listar: getPersonajes,
    crear: createPersonaje,
    editar: updatePersonaje,
    borrar: deletePersonaje,
  },
  enemigos: {
    titulo: 'Enemigos',
    idKey: 'id',
    campos: [
      { name: 'id', label: 'Id (ej: ganado)', fijo: true },
      { name: 'name', label: 'Nombre' },
      { name: 'category', label: 'Categoría' },
    ],
    listar: getEnemigos,
    crear: createEnemigo,
    editar: updateEnemigo,
    borrar: deleteEnemigo,
  },
  usuarios: {
    titulo: 'Usuarios',
    idKey: '_id',
    campos: [
      { name: 'name', label: 'Nombre' },
      { name: 'email', label: 'Email' },
      { name: 'role', label: 'Rol', type: 'select', opciones: ['usuario', 'admin'] },
    ],
    listar: getUsers,
    crear: null, // los usuarios nuevos salen del registro, no del panel
    editar: updateUser,
    borrar: deleteUser,
  },
};

// El BackOffice: solo llegan acá los admin (lo corta el PrivateRoute).
function Admin() {
  const [tab, setTab] = useState('armas');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null); // null = cerrado, {} = alta, {...item} = edición
  const [msg, setMsg] = useState({ ok: '', error: '' });

  const seccion = SECCIONES[tab];

  // Trae la lista de una sección y la mete en el estado
  const cargar = async (nombre) => {
    const data = await SECCIONES[nombre].listar();
    if (data.status === 'ok') {
      setItems(data.data);
    } else {
      setMsg({ ok: '', error: data.msg || 'No se pudo cargar la lista' });
    }
  };

  // Cambio de tab: limpia lo que haya quedado y trae la lista nueva
  const cambiarTab = (nombre) => {
    setTab(nombre);
    setItems([]);
    setForm(null);
    setMsg({ ok: '', error: '' });
    cargar(nombre);
  };

  // Primera carga al entrar al panel (arranca mostrando las armas)
  useEffect(() => {
    getWeapons().then((data) => {
      if (data.status === 'ok') setItems(data.data);
    });
  }, []);

  // Guarda lo que venga del formulario (alta o edición según corresponda)
  const handleGuardar = async (valores, esEdicion) => {
    setMsg({ ok: '', error: '' });

    const data = esEdicion
      ? await seccion.editar(valores[seccion.idKey], valores)
      : await seccion.crear(valores);

    if (data.status === 'ok') {
      setMsg({ ok: esEdicion ? 'Cambios guardados' : 'Agregado correctamente', error: '' });
      setForm(null);
      cargar(tab);
    } else {
      setMsg({ ok: '', error: data.msg || 'Algo salió mal' });
    }
  };

  // Borra un item, con confirmación antes
  const handleBorrar = async (item) => {
    const seguro = window.confirm(`¿Seguro que querés borrar "${item.name}"?`);
    if (!seguro) return;

    const data = await seccion.borrar(item[seccion.idKey]);
    if (data.status === 'ok') {
      setMsg({ ok: data.msg, error: '' });
      cargar(tab);
    } else {
      setMsg({ ok: '', error: data.msg || 'No se pudo borrar' });
    }
  };

  return (
    // el body de la app no scrollea (estilo menú de juego), así que el
    // panel scrollea por su cuenta para que se vea la lista completa
    <div className="relative w-screen h-screen overflow-y-auto pt-24 pb-12 px-6">
      <div className="mx-auto max-w-5xl bg-black/60 backdrop-blur-sm border border-[#8a8270]/30 p-8">
        <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-[#e8e0d0] leading-none">
          Administración
        </h1>
        <p className="text-[#b8b0a0] mb-6 uppercase text-sm tracking-[0.25em]">
          BackOffice de la tienda
        </p>

        {/* Tabs de secciones */}
        <div className="flex gap-1 mb-6 border-b border-[#8a8270]/30">
          {Object.keys(SECCIONES).map((nombre) => (
            <button
              key={nombre}
              onClick={() => cambiarTab(nombre)}
              className={`font-['Bebas_Neue'] text-xl tracking-wider px-4 py-2 transition-colors cursor-pointer ${
                tab === nombre
                  ? 'text-[#c9a24b] border-b-2 border-[#c9a24b]'
                  : 'text-[#b8b0a0] hover:text-[#e8e0d0]'
              }`}
            >
              {SECCIONES[nombre].titulo}
            </button>
          ))}
        </div>

        {/* Mensajes de la última acción */}
        {msg.error && <p className="text-red-400 mb-4">{msg.error}</p>}
        {msg.ok && <p className="text-green-400 mb-4">{msg.ok}</p>}

        {/* Alta (los usuarios no tienen: se crean desde el registro) */}
        {seccion.crear && !form && (
          <button
            onClick={() => setForm({})}
            className="mb-5 bg-[#c9a24b] hover:bg-[#d9b25b] text-black font-['Bebas_Neue'] text-xl tracking-wider px-6 py-1.5 transition-colors cursor-pointer"
          >
            + Agregar
          </button>
        )}

        {/* Formulario de alta/edición (key para que se resetee al cambiar de item) */}
        {form && (
          <AdminForm
            key={form[seccion.idKey] || 'nuevo'}
            campos={seccion.campos}
            inicial={form}
            esEdicion={!!form[seccion.idKey]}
            onGuardar={handleGuardar}
            onCancelar={() => setForm(null)}
          />
        )}

        <AdminTable
          campos={seccion.campos}
          items={items}
          idKey={seccion.idKey}
          onEditar={(item) => setForm(item)}
          onBorrar={handleBorrar}
        />
      </div>
    </div>
  );
}

export default Admin;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWeaponById } from '../services/weaponService.js';

const CATEGORY_LABELS = {
  pistolas: 'Pistola',
  escopetas: 'Escopeta',
  subfusiles: 'Subfusil',
  rifles: 'Rifle',
  magnums: 'Magnum',
  especiales: 'Especial',
  cuchillos: 'Cuchillo',
};

function Detail() {
  // El id viene del parámetro de ruta /detail/:id
  const { id } = useParams();

  const [weapon, setWeapon] = useState(null);
  const [error, setError] = useState('');

  // Si cambia el id de la ruta, reseteamos los datos para volver a "cargando".
  // (Patrón de React para ajustar estado cuando cambia una prop, sin usar un effect.)
  const [shownId, setShownId] = useState(id);
  if (id !== shownId) {
    setShownId(id);
    setWeapon(null);
    setError('');
  }

  // Consultamos el arma a la API cada vez que cambia el id.
  useEffect(() => {
    let active = true;
    getWeaponById(id)
      .then((data) => {
        if (!active) return;
        if (data.status === 'ok') {
          setWeapon(data.data);
        } else {
          setError(data.msg || 'Arma no encontrada');
        }
      })
      .catch(() => {
        if (active) setError('No se pudo conectar con el servidor');
      });
    return () => {
      active = false;
    };
  }, [id]);

  const loading = !weapon && !error;

  return (
    <div className="relative w-screen h-screen flex items-center justify-start">
      <div className="ml-[8%] w-full max-w-lg p-8 bg-black/45 backdrop-blur-sm border-l-2 border-[#c9a24b]/60">
        <Link
          to="/"
          className="text-[#b8b0a0] hover:text-[#e8e0d0] text-sm uppercase tracking-[0.2em]"
        >
          ← Volver a la tienda
        </Link>

        {loading && <p className="text-[#e8e0d0] mt-6 text-lg">Cargando arma...</p>}

        {error && <p className="text-red-400 mt-6 text-lg">{error}</p>}

        {weapon && (
          <div className="mt-4">
            {weapon.badge === 'nuevo' && (
              <span className="font-['Bebas_Neue'] text-base tracking-[2px] text-[#f0a437]">
                NUEVO
              </span>
            )}
            <h1 className="font-['Bebas_Neue'] text-6xl tracking-wider text-[#e8e0d0] leading-none">
              {weapon.name}
            </h1>
            <p className="text-[#b8b0a0] uppercase text-sm tracking-[0.25em] mb-6">
              {CATEGORY_LABELS[weapon.category] || weapon.category}
            </p>

            <dl className="space-y-3 text-[#e8e0d0]">
              <div className="flex justify-between border-b border-[#8a8270]/20 pb-2">
                <dt className="text-[#b8b0a0] uppercase text-sm tracking-wider">Precio</dt>
                <dd className="font-['Bebas_Neue'] text-2xl text-[#d63d3d]">
                  {weapon.price === 0 ? 'Gratis' : `${weapon.price.toLocaleString('en-US')} ptas.`}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[#8a8270]/20 pb-2">
                <dt className="text-[#b8b0a0] uppercase text-sm tracking-wider">Espacios</dt>
                <dd className="font-['Bebas_Neue'] text-2xl">{weapon.slots}</dd>
              </div>
              <div className="flex justify-between border-b border-[#8a8270]/20 pb-2">
                <dt className="text-[#b8b0a0] uppercase text-sm tracking-wider">ID</dt>
                <dd className="font-mono text-sm text-[#b8b0a0] self-center">{weapon.id}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;

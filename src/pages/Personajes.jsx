import { useEffect, useState } from 'react';
import { getPersonajes } from '../services/personajeService.js';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    getPersonajes().then((data) => {
      if (data.status === 'ok') setPersonajes(data.data);
    });
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-start">
      <div className="ml-[8%] w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-l-2 border-[#c9a24b]/60">
        <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-[#e8e0d0] mb-6">Personajes</h1>
        <ul className="space-y-3">
          {personajes.map((p) => (
            <li key={p.id} className="border-b border-[#8a8270]/20 pb-2">
              <span className="font-['Bebas_Neue'] text-2xl text-[#e8e0d0]">{p.name}</span>
              <span className="block text-[#b8b0a0] text-sm uppercase tracking-wider">{p.rol} · {p.arma}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Personajes;
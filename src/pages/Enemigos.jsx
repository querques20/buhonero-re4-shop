import { useEffect, useState } from 'react';
import { getEnemigos } from '../services/enemigoService.js';

function Enemigos() {
  const [enemigos, setEnemigos] = useState([]);

  useEffect(() => {
    getEnemigos().then((data) => {
      if (data.status === 'ok') setEnemigos(data.data);
    });
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-start">
      <div className="ml-[8%] w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-l-2 border-[#c9a24b]/60">
        <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-[#e8e0d0] mb-6">Enemigos</h1>
        <ul className="space-y-3">
          {enemigos.map((e) => (
            <li key={e.id} className="border-b border-[#8a8270]/20 pb-2">
              <span className="font-['Bebas_Neue'] text-2xl text-[#e8e0d0]">{e.name}</span>
              <span className="block text-[#b8b0a0] text-sm uppercase tracking-wider">{e.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Enemigos;
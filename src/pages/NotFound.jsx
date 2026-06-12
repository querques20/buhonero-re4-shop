import { Link } from 'react-router-dom';

// Página 404 para rutas que no existen.
function NotFound() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-center">
      <h1 className="font-['Bebas_Neue'] text-7xl tracking-widest text-[#d63d3d]">404</h1>
      <p className="text-[#e8e0d0] text-xl mb-6 uppercase tracking-[0.2em]">
        No hay nada que vender por acá, forastero
      </p>
      <Link
        to="/"
        className="bg-[#c9a24b] hover:bg-[#d9b25b] text-black font-['Bebas_Neue'] text-xl tracking-wider px-6 py-2 transition-colors"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}

export default NotFound;

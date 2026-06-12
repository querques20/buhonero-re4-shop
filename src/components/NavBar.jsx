import { NavLink } from 'react-router-dom';

// Barra de navegación con NavLink (marca la ruta activa).
function NavBar() {
  const linkClass = ({ isActive }) =>
    `font-['Bebas_Neue'] text-lg tracking-wider px-3 py-1 transition-colors ${
      isActive ? 'text-[#c9a24b]' : 'text-[#b8b0a0] hover:text-[#e8e0d0]'
    }`;

  return (
    <nav className="fixed top-4 right-6 z-50 flex gap-1 bg-black/45 backdrop-blur-sm px-3 py-1.5 border border-[#8a8270]/30">
      <NavLink to="/" className={linkClass} end>
        Tienda
      </NavLink>
      <NavLink to="/login" className={linkClass}>
        Login
      </NavLink>
      <NavLink to="/register" className={linkClass}>
        Registro
      </NavLink>
      <NavLink to="/contacto" className={linkClass}>
        Contacto
      </NavLink>
      <NavLink to="/personajes" className={linkClass}>
        Personajes
      </NavLink>
      <NavLink to="/prueba" className={linkClass}>
        Prueba
      </NavLink>
      <NavLink to="/enemigos" className={linkClass}>
        Enemigos
      </NavLink>
    </nav>
  );
}

export default NavBar;

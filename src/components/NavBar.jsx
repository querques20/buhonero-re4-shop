import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Barra de navegación con NavLink (marca la ruta activa).
// Cambia según la sesión: sin login muestra Login/Registro; logueado
// muestra el saludo, el botón salir y el panel si sos admin.
function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `font-['Bebas_Neue'] text-lg tracking-wider px-3 py-1 transition-colors ${
      isActive ? 'text-[#c9a24b]' : 'text-[#b8b0a0] hover:text-[#e8e0d0]'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-4 right-6 z-50 flex items-center gap-1 bg-black/45 backdrop-blur-sm px-3 py-1.5 border border-[#8a8270]/30">
      <NavLink to="/" className={linkClass} end>
        Tienda
      </NavLink>
      <NavLink to="/personajes" className={linkClass}>
        Personajes
      </NavLink>
      <NavLink to="/enemigos" className={linkClass}>
        Enemigos
      </NavLink>
      <NavLink to="/contacto" className={linkClass}>
        Contacto
      </NavLink>

      {!user && (
        <>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Registro
          </NavLink>
        </>
      )}

      {user && (
        <>
          {user.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          <span className="text-[#e8e0d0] text-sm px-3 border-l border-[#8a8270]/30">
            Hola, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="font-['Bebas_Neue'] text-lg tracking-wider px-3 py-1 text-[#b8b0a0] hover:text-[#e8e0d0] transition-colors cursor-pointer"
          >
            Salir
          </button>
        </>
      )}
    </nav>
  );
}

export default NavBar;

import { createContext, useContext, useState } from 'react';

// Contexto de sesión: acá vive el usuario logueado para que cualquier
// componente (la navbar, las rutas privadas, el panel) sepa quién entró.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Arrancamos leyendo lo que haya quedado de la última sesión
  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem('user');
    return guardado ? JSON.parse(guardado) : null;
  });

  // La llama el Login cuando el backend devuelve el token
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook cortito para no repetir useContext(AuthContext) por todos lados
export const useAuth = () => useContext(AuthContext);

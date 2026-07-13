// URL base de la API. En desarrollo apunta al backend local; para el
// deploy se define VITE_API_URL en el hosting y no hay que tocar nada.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Header de autorización con el token guardado (lo piden las rutas de admin)
export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

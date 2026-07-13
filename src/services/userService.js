import { API_URL, authHeader } from './api.js';

// Registro: POST /api/users
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

// Login: POST /api/users/auth  (devuelve el token JWT + los datos del usuario)
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// --- Métodos del panel de admin (mandan el token) ---

// Listar usuarios: GET /api/users
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: authHeader() });
  return res.json();
};

// Editar un usuario (por ej. cambiarle el rol): PUT /api/users/:id
export const updateUser = async (id, cambios) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(cambios),
  });
  return res.json();
};

// Borrar un usuario: DELETE /api/users/:id
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
};

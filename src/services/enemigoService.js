import { API_URL, authHeader } from './api.js';

// Trae todos los enemigos: GET /api/enemigos
export const getEnemigos = async () => {
  const res = await fetch(`${API_URL}/enemigos`);
  return res.json();
};

// --- Métodos del panel de admin (mandan el token) ---

// Agregar un enemigo: POST /api/enemigos
export const createEnemigo = async (enemigo) => {
  const res = await fetch(`${API_URL}/enemigos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(enemigo),
  });
  return res.json();
};

// Editar un enemigo: PUT /api/enemigos/:id
export const updateEnemigo = async (id, cambios) => {
  const res = await fetch(`${API_URL}/enemigos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(cambios),
  });
  return res.json();
};

// Borrar un enemigo: DELETE /api/enemigos/:id
export const deleteEnemigo = async (id) => {
  const res = await fetch(`${API_URL}/enemigos/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
};

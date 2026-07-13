import { API_URL, authHeader } from './api.js';

// Todas las armas: GET /api/weapons
export const getWeapons = async () => {
  const res = await fetch(`${API_URL}/weapons`);
  return res.json();
};

// Una arma por id: GET /api/weapons/:id
export const getWeaponById = async (id) => {
  const res = await fetch(`${API_URL}/weapons/${id}`);
  return res.json();
};

// --- Métodos del panel de admin (mandan el token) ---

// Agregar un arma: POST /api/weapons
export const createWeapon = async (weapon) => {
  const res = await fetch(`${API_URL}/weapons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(weapon),
  });
  return res.json();
};

// Editar un arma: PUT /api/weapons/:id
export const updateWeapon = async (id, cambios) => {
  const res = await fetch(`${API_URL}/weapons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(cambios),
  });
  return res.json();
};

// Borrar un arma: DELETE /api/weapons/:id
export const deleteWeapon = async (id) => {
  const res = await fetch(`${API_URL}/weapons/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
};

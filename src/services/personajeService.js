import { API_URL, authHeader } from './api.js';

// Trae todos los personajes: GET /api/personajes
export const getPersonajes = async () => {
  const res = await fetch(`${API_URL}/personajes`);
  return res.json();
};

// --- Métodos del panel de admin (mandan el token) ---

// Agregar un personaje: POST /api/personajes
export const createPersonaje = async (personaje) => {
  const res = await fetch(`${API_URL}/personajes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(personaje),
  });
  return res.json();
};

// Editar un personaje: PUT /api/personajes/:id
export const updatePersonaje = async (id, cambios) => {
  const res = await fetch(`${API_URL}/personajes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(cambios),
  });
  return res.json();
};

// Borrar un personaje: DELETE /api/personajes/:id
export const deletePersonaje = async (id) => {
  const res = await fetch(`${API_URL}/personajes/${id}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  return res.json();
};

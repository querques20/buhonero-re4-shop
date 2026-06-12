import { API_URL } from './api.js';

// Trae todos los personajes: GET /api/personajes
export const getPersonajes = async () => {
  const res = await fetch(`${API_URL}/personajes`);
  return res.json();
};
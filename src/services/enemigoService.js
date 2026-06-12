import { API_URL } from './api.js';

// Trae todos los enemigos: GET /api/enemigos
export const getEnemigos = async () => {
  const res = await fetch(`${API_URL}/enemigos`);
  return res.json();
};
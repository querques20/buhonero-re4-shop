import { API_URL } from './api.js';

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

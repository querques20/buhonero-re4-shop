import { API_URL } from './api.js';

// Registro: POST /api/users
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

// Login: POST /api/users/auth  (devuelve un token JWT)
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

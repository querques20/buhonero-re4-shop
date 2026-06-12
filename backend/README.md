# Backend - Tienda del Buhonero (RE4)

API REST de usuarios para el proyecto React de la Tienda del Buhonero.
Es la **Actividad 06** (backend) sobre la que se conecta el formulario de Registro de la **Actividad 08**.

## Stack

- **Node + Express 5** — servidor y rutas
- **MongoDB + Mongoose** — base de datos
- **bcrypt** — hash de contraseñas
- **jsonwebtoken (JWT)** — login con token
- **cors** + **dotenv**

## Estructura

```
backend/
├── .env                 ← PORT, SECRET_KEY, URI_DB
└── src/
    ├── index.js         ← arranca Express y conecta la DB
    ├── config/db.js     ← conexión a MongoDB
    ├── models/userModel.js        ← esquema User { name, email, password }
    ├── controllers/userController.js  ← lógica (registro, login, listar)
    └── routes/
        ├── index.js     ← monta /api/users
        └── userRouter.js
```

## Cómo correrlo

1. Tener MongoDB corriendo en `localhost:27017`. La forma más simple es con Docker:

   ```bash
   docker run -d -p 27017:27017 --name mongo-buhonero mongo:7
   ```

2. Instalar dependencias y levantar:

   ```bash
   npm install
   npm run dev      # con --watch (recarga sola)
   # o: npm start
   ```

   El servidor queda en `http://localhost:3000`.

## Endpoints

| Método | Ruta             | Qué hace                                  | Body |
|--------|------------------|-------------------------------------------|------|
| POST   | `/api/users`     | **Registro**: hashea la pass y la guarda  | `{ name, email, password }` |
| GET    | `/api/users`     | Lista los usuarios (sin la contraseña)    | — |
| GET    | `/api/users/:id` | Un usuario por id                         | — |
| POST   | `/api/users/auth`| **Login**: devuelve un JWT                | `{ email, password }` |

Todas las respuestas tienen la forma `{ status: 'ok' | 'error', data | msg }`.

### Ejemplo de registro

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Leon","email":"leon@rpd.gov","password":"raccoon123"}'
```

Validaciones: campos obligatorios, email único (no se puede repetir), y la
contraseña se guarda **hasheada con bcrypt** (nunca en texto plano).

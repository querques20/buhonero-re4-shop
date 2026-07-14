# Aplicaciones Híbridas — Tienda del Buhonero (RE4)

## Integrantes del equipo
- Facundo Albuquerque

Este repo cubre las entregas de la materia (de la más nueva a la más vieja):
- **Examen Final — CRUD completo + BackOffice + JWT + deploy** (esta entrega)
- **Actividad 09 — React Router + Login + Detalle**
- **Actividad 08 — Formulario de Registro**
- **Actividad 07 — Estructura con React**

---

# Examen Final

## El sitio en internet

| Qué | URL |
|-----|-----|
| **Sitio (FrontOffice + BackOffice)** | https://buhonero-re4-shop.vercel.app |
| **API REST** | https://buhonero-api.onrender.com/api |

- Front deployado en **Vercel**, API en **Render** y la base en **MongoDB Atlas** (todo free tier).
- Para entrar al panel de administración: `/admin` con **admin@buhonero.com / buhonero123**.
- Ojo: la API está en el plan gratuito de Render, así que si nadie la usó por un rato se duerme
  y el primer request tarda ~30-60 segundos en despertarla. Después responde normal.

## Qué se agregó para el final

Sobre lo que ya venía de las actividades, para el final se completó todo lo que pedía la consigna:

- **CRUD completo de las 4 entidades**: armas, personajes, enemigos y usuarios ahora tienen
  Create, Read, Update y Delete en la API (antes solo se podían leer).
- **JWT de verdad**: antes el login firmaba el token y no lo usaba nadie. Ahora hay un
  middleware (`backend/src/middlewares/authMiddleware.js`) con `verifyToken` (revisa el token
  del header Authorization) e `isAdmin` (revisa el rol). Todas las rutas de escritura piden
  ser admin; leer el catálogo sigue siendo público.
- **Roles**: los usuarios tienen un campo `role` (`usuario` o `admin`). El rol viaja adentro
  del token. Al registrarte siempre sos usuario común: el rol solo lo puede cambiar un admin
  desde el panel (así nadie se hace admin solo).
- **BackOffice**: panel de administración en `/admin` con la estética de la tienda, con tabs
  para armas / personajes / enemigos / usuarios. Desde ahí se agrega, edita y borra todo.
- **FrontOffice**: la parte pública de siempre (tienda, personajes, enemigos, detalle de armas).
- **PrivateRoute**: componente que protege rutas. `/admin` pide sesión iniciada **y** rol admin;
  si no estás logueado te manda al login, y si sos usuario común te manda a la tienda.
- **Validaciones** en el backend para todos los endpoints (campos obligatorios, formato de email,
  contraseña mínima, precios numéricos, ids repetidos) y en los formularios del front.
- **Usuario admin de prueba**: se crea solo al arrancar el backend →
  email **admin@buhonero.com**, contraseña **buhonero123**.

## Cómo levantarlo en cualquier compu (sin Docker)

La forma más rápida si no hay Docker ni MongoDB instalados (por ejemplo en la facultad):
usar una base en **MongoDB Atlas** (la misma del deploy). Solo hace falta Node e internet.

```bash
# 1) Backend
cd backend
cp .env.example .env      # y en URI_DB pegar la URI de Atlas
npm install
npm run dev               # API en http://localhost:3000

# 2) Frontend (otra terminal, desde la raíz)
npm install
npm run dev               # http://localhost:5173
```

## Cómo levantarlo 100% local (con Docker)

```bash
# 1) MongoDB en un contenedor (solo la primera vez)
docker run -d -p 27017:27017 --name mongo-buhonero mongo:7
#    Si el contenedor ya existe: docker start mongo-buhonero

# 2) Backend — desde la carpeta backend/ (el .env con la URI local, ver .env.example)
cd backend
npm install
npm run dev          # queda en http://localhost:3000

# 3) Frontend — desde la raíz del proyecto (en otra terminal)
npm install
npm run dev          # queda en http://localhost:5173
```

La primera vez que arranca, el backend carga solo el catálogo (armas, personajes y enemigos)
y crea el usuario admin. Después la base queda en manos del panel: lo que edites desde
`/admin` no se pisa al reiniciar.

## Rutas de la API

| Método | URI | Quién puede |
|--------|-----|-------------|
| POST | `/api/users` | público (registro) |
| POST | `/api/users/auth` | público (login, devuelve el JWT) |
| GET / PUT / DELETE | `/api/users`, `/api/users/:id` | solo admin |
| GET | `/api/weapons`, `/api/weapons/:id` | público |
| POST / PUT / DELETE | `/api/weapons`, `/api/weapons/:id` | solo admin |
| GET | `/api/personajes`, `/api/personajes/:id` | público |
| POST / PUT / DELETE | `/api/personajes`, `/api/personajes/:id` | solo admin |
| GET | `/api/enemigos`, `/api/enemigos/:id` | público |
| POST / PUT / DELETE | `/api/enemigos`, `/api/enemigos/:id` | solo admin |

Las rutas de admin esperan el token en el header: `Authorization: Bearer <token>`.

---

# Actividad 09 — React Router, Login y Detalle

## Qué hice

Instalé y configuré **React Router** para que la app tenga varias páginas con su propia URL,
un menú de navegación, el **formulario de Login** conectado al backend, y una página de
**Detalle** que trae un arma desde la API según el id de la URL.

## React Router

- `main.jsx` envuelve toda la app con `<BrowserRouter>`.
- `src/router/AppRouter.jsx` define las rutas con `<Routes>` / `<Route>`:

| Ruta | Página | Qué muestra |
|------|--------|-------------|
| `/` | `Home` | la tienda del Buhonero |
| `/login` | `Login` | formulario de inicio de sesión |
| `/register` | `Register` | formulario de registro (Act. 08) |
| `/detail/:id` | `Detail` | detalle de un arma (id por parámetro de ruta) |
| `*` | `NotFound` | página 404 |

- `src/components/NavBar.jsx` usa `<NavLink>` para navegar entre páginas (marca la activa).

## Estructura del proyecto (modular)

```
src/
├── main.jsx             ← BrowserRouter
├── App.jsx              ← NavBar + AppRouter
├── router/
│   └── AppRouter.jsx    ← definición de las rutas
├── services/            ← TODO lo que habla con la API
│   ├── api.js           ← URL base
│   ├── userService.js   ← registerUser(), loginUser()
│   └── weaponService.js ← getWeapons(), getWeaponById()
├── pages/
│   ├── Home.jsx  Login.jsx  Register.jsx  Detail.jsx  NotFound.jsx
└── components/
    ├── NavBar.jsx  InputField.jsx  ... (componentes de la tienda)
```

Las llamadas a la API viven en `services/`, separadas de las páginas: los componentes no
arman el `fetch` a mano, llaman a una función del service. Si cambia la API, se toca un solo lugar.

## Formulario de Login

`pages/Login.jsx` tiene los campos que pide el backend (`email` y `password`), con:
- **Estados** (`useState`): `form` (los datos), `errors` (validaciones), `status` (loading + mensajes).
- **Validaciones**: email requerido y con formato válido, contraseña requerida.
- **Fetch POST** a `/api/users/auth` (vía `loginUser`). Si el backend responde ok, guarda el token
  y entra a la tienda; si no, muestra el mensaje de error ("Email inválido", "Contraseña inválida").

El login se prueba con un usuario previamente registrado (la Act. 08 guarda usuarios en MongoDB).

## Página de Detalle

`pages/Detail.jsx`:
- Toma el id de la URL con `const { id } = useParams()`.
- En un `useEffect` hace `fetch` a `/api/weapons/:id` (vía `getWeaponById`) y muestra el arma.
- Maneja los estados de *cargando / error / arma encontrada*.

Cada arma de la tienda enlaza a su detalle con `<Link to={'/detail/' + id}>`.

## Cómo correr TODO

```bash
docker start mongo-buhonero      # MongoDB (la 1ª vez: ver backend/README.md)
cd backend && npm run dev        # API en :3000 (siembra las 33 armas la 1ª vez)
npm install && npm run dev       # front en :5173 (desde la raíz)
```

---

# Actividad 08 — Formulario de Registro

## Qué hice

Agregué una pantalla de **Registro** (`src/pages/Register.jsx`) que es lo primero que
se ve al abrir la app: te registrás y entrás a la tienda. El formulario manda los datos
a un **backend propio** (Node + Express + MongoDB, la Actividad 06) que guarda el usuario
en la base con la contraseña **hasheada con bcrypt**.

## Estructura del proyecto

```
src/
├── App.jsx              ← decide qué mostrar: Registro o Tienda (según el estado `user`)
├── pages/
│   ├── Register.jsx     ← NUEVO: el formulario (estados + validación + fetch POST)
│   └── Home.jsx         ← la tienda (Actividad 07)
├── components/
│   ├── InputField.jsx   ← NUEVO: campo de formulario reutilizable (recibe props)
│   └── ...              ← HUD, ShopMenu, WeaponRow, etc. (Actividad 07)
└── data/

backend/                 ← la API de usuarios (Actividad 06) — ver backend/README.md
```

## El concepto de ESTADOS en React

Un **estado** es un dato que React "recuerda" entre renders y que, cuando cambia, hace
que el componente se vuelva a dibujar solo. Se crea con el hook `useState`:

```jsx
const [form, setForm] = useState({ name: '', email: '', password: '' });
```

`useState` devuelve dos cosas: el **valor actual** (`form`) y una **función para
actualizarlo** (`setForm`). La regla de oro es **nunca modificar el estado a mano**
(`form.name = '...'`); siempre se usa la función (`setForm(...)`). Cuando la
llamás, React re-renderiza el componente con el valor nuevo, así lo que se ve en
pantalla siempre está sincronizado con el estado.

En el formulario de registro uso **3 estados**, cada uno para una cosa distinta:

| Estado   | Para qué sirve |
|----------|----------------|
| `form`   | guardar lo que el usuario escribe en cada input (inputs *controlados*) |
| `errors` | guardar los mensajes de validación de cada campo |
| `status` | saber si está cargando y mostrar el mensaje de éxito o error del fetch |

**Inputs controlados:** cada input toma su `value` del estado `form` y, en cada tecla
(`onChange`), actualiza ese estado. Así el estado es la "única fuente de verdad" de lo
que hay en el formulario:

```jsx
<input value={form.email} name="email" onChange={handleChange} />
```

Cuando cambia un estado (por ejemplo `setStatus({ loading: true })`), React re-dibuja
y el botón pasa a decir "Registrando..." solo — sin tocar el DOM a mano.

## Validaciones

Antes de mandar el fetch valido en el front: campos obligatorios, formato de email,
contraseña de mínimo 6 caracteres y que las dos contraseñas coincidan. Si algo falla,
se guarda en el estado `errors` y se muestra debajo del campo. El backend **también**
valida (campos obligatorios y email único).

## El fetch (POST a la API)

Al enviar, hago un `POST` a `http://localhost:3000/api/users` con `name`, `email` y
`password`. Según la respuesta, actualizo `status` para mostrar éxito o error.

## Cómo correr TODO

Hacen falta 3 cosas levantadas (base de datos, backend y frontend):

```bash
# 1) Base de datos (MongoDB con Docker)
docker run -d -p 27017:27017 --name mongo-buhonero mongo:7

# 2) Backend (carpeta backend/)
cd backend
npm install
npm run dev          # http://localhost:3000

# 3) Frontend (raíz del proyecto)
npm install
npm run dev          # http://localhost:5173
```

Abrís `http://localhost:5173`, completás el formulario y el usuario queda guardado en
MongoDB. Para verificarlo: `GET http://localhost:3000/api/users`.

---

# Actividad 07 - Estructura con React

**Materia:** Aplicaciones Híbridas
**Alumno:** Facundo Albuquerque

Proyecto inspirado en la tienda del Buhonero del Resident Evil 4 Remake. La idea era armar un menú parecido al del juego, con la pantalla principal y la vista de comprar armas.

---

## Sobre el proyecto

Quise hacer algo que me copara más, así que en vez de un catálogo genérico armé la pantalla de la tienda del Buhonero (the Merchant), el personaje que te vende armas en RE4 Remake.

Tiene dos vistas:

- **Tienda** (la home): el menú con las 4 opciones (Comprar, Mejorar, Vender, Intercambiar) más el HUD arriba a la izquierda con los recursos del jugador (pólvora, espinelas, pesetas).
- **Comprar**: cuando hacés click en "Comprar" aparece otra pantalla con un header con tabs (igual que en el juego) y la lista de las armas.

Los datos son inventados (mock) como pedía la consigna. Cuando tengamos el backend hecho, en vez de importar el array desde `data/weapons.js` se va a hacer un `fetch` a la API y listo, lo demás no se toca.

---

## Sobre el wireframe

Antes de programar armé los wireframes en Pencil (algo parecido a Figma). Hice 5 pantallas: la home, la vista de Comprar y las 3 variantes de Mejorar/Vender/Intercambiar (que en realidad usan la misma estructura, lo único que cambia es el título y la tab activa).

Decisiones que tomé:

- Mantener el HUD siempre arriba a la izquierda, igual que en el juego. Si vas a comprar algo necesitás ver cuánta plata tenés.
- En el menú principal, el item que está "activo" (sobre el que cae el cursor) tiene un puntito al lado, y el que está en hover tiene un fondo medio difuminado. Eso lo copié de cómo se ve en el juego.
- En la vista de Comprar puse dos filas de tabs: una para cambiar de acción (comprar/mejorar/vender/intercambiar) y otra para filtrar por categoría de arma. Así replico la idea de los gatillos del joystick (LB/RB y LT/RT).
- La lista de armas no ocupa toda la pantalla, queda en la mitad izquierda para que se vea el Buhonero del fondo.

---

## Cómo organicé los componentes

```
src/
├── App.jsx              ← solo monta el video de fondo y la Home
├── App.css              ← entrada de Tailwind y un par de utilidades sueltas (video de fondo y overlay)
├── main.jsx             ← entrada de React
├── data/                ← datos simulados
│   ├── weapons.js       ← las 33 armas con su precio
│   ├── menuItems.jsx    ← los 4 items del menú TIENDA
│   ├── shopTabs.jsx     ← las 4 tabs principales
│   └── categories.jsx   ← las categorías para filtrar
├── components/
│   ├── HUD.jsx
│   ├── ShopMenu.jsx     ← el menú de la home
│   ├── MenuItem.jsx     ← cada item del menú (con props + children)
│   ├── BuyView.jsx      ← la vista de comprar entera
│   ├── TabBar.jsx       ← se usa dos veces (tabs principales y categorías)
│   ├── WeaponList.jsx   ← la lista que filtra por categoría
│   └── WeaponRow.jsx    ← cada fila de la lista (con props + children)
└── pages/
    └── Home.jsx         ← acá manejo el estado de qué vista mostrar
```

Lo separé así porque me pareció lo más limpio:

- En `data/` van los datos que algún día van a venir del backend. Cuando los conectemos solo cambio ese archivo.
- En `components/` van las piezas chicas que se pueden usar en cualquier lado. Por ejemplo el HUD aparece en la home y también en la vista de Comprar.
- En `pages/` está la vista completa que junta todo y se encarga del estado (qué pantalla mostrar).

El `TabBar` me terminó gustando bastante porque lo uso dos veces en la misma pantalla pasándole un `variant` distinto: una vez para las tabs principales y otra para las categorías. Mismo componente, dos usos.

---

## Sobre el estilo

Todo el estilo lo armé con **Tailwind CSS v4**, usando el plugin oficial de Vite (`@tailwindcss/vite`). Me pareció lo más práctico porque las clases utility quedan al lado del JSX y no tenés que ir saltando entre archivos para cambiar un margin o un color.

Lo único que dejé fuera de Tailwind son tres cosas muy puntuales que no daban tan limpio con utilities:

- El `<video>` de fondo posicionado fijo abajo a la derecha.
- El overlay con un degradado horizontal que oscurece la parte izquierda (para que se lea bien el menú encima del video).
- Dos utilidades sueltas con `radial-gradient` para el efecto tipo "pincelada" gris que aparece sobre los items en hover.

Todo eso vive en `src/App.css` que también es la entrada donde se importa Tailwind (`@import "tailwindcss"`).

Para que el aspecto sea parecido al del juego usé dos tipografías de Google Fonts:

- **Bebas Neue** para los títulos y los labels (TIENDA, COMPRAR, nombres de armas).
- **Oswald** para el resto del texto.

Ambas se cargan desde Google Fonts en `App.css` y se aplican con clases tipo `font-['Bebas_Neue']` directamente en los componentes.

---

## Cómo se va a conectar con el backend

Hoy los datos los importo así:

```js
import { weapons } from '../data/weapons.js';
```

Cuando exista la API, lo único que cambia es eso. Voy a hacer:

```js
const [weapons, setWeapons] = useState([]);

useEffect(() => {
  fetch('http://localhost:3000/api/weapons')
    .then(res => res.json())
    .then(data => setWeapons(data));
}, []);
```

El backend va a tener que devolver un array con la misma forma que el mock (id, name, category, price, slots, badge). Como los componentes que arman la UI reciben props nombradas y no saben de dónde salen los datos, no hay que modificar `WeaponList` ni `WeaponRow`. Ese es justamente el punto de tenerlos así de desacoplados.

Endpoints que me imagino para próximas entregas:

- `GET /api/weapons` → traer todas
- `GET /api/weapons/:id` → detalle de una
- `GET /api/weapons?category=pistolas` → filtrar
- `POST /api/purchase` → confirmar una compra

---

## Punto extra (para nota 10)

La consigna pide hacer una Card que reciba múltiples props y use `children`. En mi proyecto eso lo cumplen dos componentes: `WeaponRow` y `MenuItem`. Explico el `WeaponRow` que es el más interesante.

### Recibe varias props

```jsx
<WeaponRow
  name={weapon.name}
  price={weapon.price}
  slots={weapon.slots}
  badge={weapon.badge}
  hovered={weapon.id === hoveredId}
>
  {/* acá va el children */}
</WeaponRow>
```

Le paso 5 props nombradas (`name`, `price`, `slots`, `badge`, `hovered`) más el `children`.

### Para qué uso `children`

`children` es como un "espacio libre" adentro de la card que el componente padre decide qué meter ahí. Eso me sirve para que la misma card se vea distinto según dónde la use, sin tener que modificar el componente.

Por ejemplo, podría usarla así en distintos lugares:

```jsx
{/* En la vista de comprar: muestro una etiqueta de oferta */}
<WeaponRow {...arma}>
  <span>-20% OFF</span>
</WeaponRow>

{/* En "mi inventario": muestro cuántas tengo */}
<WeaponRow {...arma}>
  <span>x2 en mochila</span>
</WeaponRow>
```

### Por qué esto sirve

- Si en el futuro quiero usar la misma card para vender pociones de otro juego, o ítems de cualquier tienda, no tengo que tocar el componente. Solo le paso props distintas.
- Las props son el "contrato fijo" (siempre hay nombre, precio, slots) y `children` es la parte "libre" donde decido qué agregar.
- Si en vez de `children` tuviera que tener 20 props del tipo `mostrarOferta`, `mostrarCantidad`, etc, se complicaría un montón. Así queda mucho más limpio.

---

## Extra: navegación con teclado

Como en el juego se navega con el joystick, traté de copiar eso con el teclado:

- `Q` y `E` → cambian entre las tabs principales (Comprar/Mejorar/Vender/Intercambiar)
- `A` y `D` → cambian entre las categorías de armas
- `ESC` → vuelve al menú principal

Si llegás al final y apretás `E` o `D` otra vez, vuelve al principio (loopea). Sirve para que se sienta más como el juego.

---

## Cómo correrlo

```bash
npm install
npm run dev
```

Y abrir lo que diga la consola (suele ser `http://localhost:5173` o `5174`).

---

## Lo que cubre de la consigna

- JSX bien usado en todos los componentes
- 7 componentes reutilizables (no estaba todo metido en `App`)
- Props con varios valores, varios componentes los usan
- Estructura modular con `components/`, `pages/` y `data/`
- Renderizado dinámico con `.map()` en varias listas
- README explicando todo (este archivo)
- Card con múltiples props + `children` (el `WeaponRow`)

---

## Lo que usé

- **React 19** para los componentes y manejar el estado de qué vista mostrar.
- **Vite 8** como bundler y dev server.
- **Tailwind CSS v4** con el plugin oficial de Vite (`@tailwindcss/vite`) para todo el styling.
- **Google Fonts** (Bebas Neue y Oswald) porque la tipografía del juego se parece bastante a esas.
- Un video corto de gameplay como fondo (con un overlay oscuro encima para que se lea bien el menú).

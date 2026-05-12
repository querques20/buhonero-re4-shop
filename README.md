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

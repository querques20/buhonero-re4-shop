import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Detail from '../pages/Detail.jsx';
import NotFound from '../pages/NotFound.jsx';
import Contacto from '../pages/contacto.jsx';
import Personajes from '../pages/Personajes.jsx';
import prueba from '../pages/prueba.jsx';
import Enemigos from '../pages/Enemigos.jsx';

// Definición de todas las rutas de la app.
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/personajes" element={<Personajes />} />
      <Route path="/enemigos" element={<Enemigos />} />
      <Route path="/prueba" element={<prueba />} />
      {/* Cualquier otra ruta -> 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;

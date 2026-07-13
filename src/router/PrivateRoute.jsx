import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Envuelve las páginas que piden estar logueado: si no hay sesión te manda
// al login. Con adminOnly además pide que el usuario sea admin.
function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PrivateRoute;

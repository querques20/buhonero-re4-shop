import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField.jsx';
import { loginUser } from '../services/userService.js';

function Login() {
  // --- ESTADOS ---
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: '', error: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones del formulario de login
  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Ingresá tu email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'El email no es válido';
    }
    if (!form.password) next.password = 'Ingresá tu contraseña';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, ok: '', error: '' });

    if (!validate()) return;

    setStatus({ loading: true, ok: '', error: '' });
    try {
      const data = await loginUser(form);

      if (data.status === 'ok') {
        // Login correcto: guardamos el token que devolvió el backend
        localStorage.setItem('token', data.data);
        setStatus({ loading: false, ok: '¡Bienvenido de nuevo! Entrando a la tienda...', error: '' });
        setTimeout(() => navigate('/'), 1200);
      } else {
        // El backend respondió con error (email o contraseña inválidos)
        setStatus({ loading: false, ok: '', error: data.msg || 'No se pudo iniciar sesión' });
      }
    } catch {
      setStatus({
        loading: false,
        ok: '',
        error: 'No se pudo conectar con el servidor. ¿Está levantado el backend?',
      });
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-start">
      <div className="ml-[8%] w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-l-2 border-[#c9a24b]/60">
        <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider text-[#e8e0d0] leading-none">
          Iniciar sesión
        </h1>
        <p className="text-[#b8b0a0] mb-6 uppercase text-sm tracking-[0.25em]">
          Tienda del Buhonero
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="leon@rpd.gov"
            autoComplete="email"
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••"
            autoComplete="current-password"
          />

          {status.error && <p className="text-red-400 mb-3">{status.error}</p>}
          {status.ok && <p className="text-green-400 mb-3">{status.ok}</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-[#c9a24b] hover:bg-[#d9b25b] text-black font-['Bebas_Neue'] text-2xl tracking-wider py-2 transition-colors disabled:opacity-50"
          >
            {status.loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-[#b8b0a0] text-sm">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="text-[#c9a24b] hover:text-[#d9b25b] underline underline-offset-4">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

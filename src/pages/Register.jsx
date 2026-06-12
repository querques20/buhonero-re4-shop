import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField.jsx';
import { registerUser } from '../services/userService.js';

function Register() {
  // --- ESTADOS ---
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: '', error: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Ingresá tu nombre';
    if (!form.email.trim()) {
      next.email = 'Ingresá tu email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'El email no es válido';
    }
    if (!form.password) {
      next.password = 'Ingresá una contraseña';
    } else if (form.password.length < 6) {
      next.password = 'Mínimo 6 caracteres';
    }
    if (form.password2 !== form.password) {
      next.password2 = 'Las contraseñas no coinciden';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, ok: '', error: '' });

    if (!validate()) return;

    setStatus({ loading: true, ok: '', error: '' });
    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (data.status === 'ok') {
        setStatus({
          loading: false,
          ok: `¡Listo, ${data.data.name}! Ahora iniciá sesión.`,
          error: '',
        });
        setForm({ name: '', email: '', password: '', password2: '' });
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setStatus({ loading: false, ok: '', error: data.msg || 'No se pudo registrar' });
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
          Registro
        </h1>
        <p className="text-[#b8b0a0] mb-6 uppercase text-sm tracking-[0.25em]">
          Tienda del Buhonero
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Leon S. Kennedy"
            autoComplete="name"
          />
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
            autoComplete="new-password"
          />
          <InputField
            label="Repetir contraseña"
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            error={errors.password2}
            placeholder="••••••"
            autoComplete="new-password"
          />

          {status.error && <p className="text-red-400 mb-3">{status.error}</p>}
          {status.ok && <p className="text-green-400 mb-3">{status.ok}</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-[#c9a24b] hover:bg-[#d9b25b] text-black font-['Bebas_Neue'] text-2xl tracking-wider py-2 transition-colors disabled:opacity-50"
          >
            {status.loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-[#b8b0a0] text-sm">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-[#c9a24b] hover:text-[#d9b25b] underline underline-offset-4">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

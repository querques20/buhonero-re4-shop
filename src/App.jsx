import NavBar from './components/NavBar.jsx'
import AppRouter from './router/AppRouter.jsx'

function App() {
  return (
    <>
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/buhonero-bg.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay" />

      {/* Menú de navegación visible en todas las páginas */}
      <NavBar />

      {/* Las rutas de la app (Home, Login, Register, Detail, 404) */}
      <AppRouter />
    </>
  )
}

export default App

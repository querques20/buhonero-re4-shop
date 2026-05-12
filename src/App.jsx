import Home from './pages/Home.jsx'

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
      <Home />
    </>
  )
}

export default App

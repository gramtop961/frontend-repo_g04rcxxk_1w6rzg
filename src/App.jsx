import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specifications from './components/Specifications'
import Features from './components/Features'
import Download from './components/Download'
import Footer from './components/Footer'

function App() {
  const [lowMotion, setLowMotion] = useState(false)

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setLowMotion(mq.matches)
      const onChange = (e) => setLowMotion(e.matches)
      mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange)
      }
    } catch {}
  }, [])

  return (
    <div id="top" className="min-h-screen bg-[#10131a] text-[#f3f6fb] font-sans">
      <Navbar lowMotion={lowMotion} onToggleMotion={() => setLowMotion((v) => !v)} />
      <main>
        <Hero lowMotion={lowMotion} />
        <Specifications />
        <Features />
        <Download />
      </main>
      <Footer />
    </div>
  )
}

export default App

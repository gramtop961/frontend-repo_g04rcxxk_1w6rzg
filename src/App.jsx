import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specifications from './components/Specifications'
import Features from './components/Features'
import Download from './components/Download'
import Footer from './components/Footer'
import StatusRibbon from './components/StatusRibbon'
import AudioVisualizer from './components/AudioVisualizer'

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

  // Timed launch animation: briefly hide main content until hero settles (skips in lowMotion)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (lowMotion) { setReady(true); return }
    const id = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(id)
  }, [lowMotion])

  return (
    <div id="top" className="min-h-screen bg-[#10131a] text-[#f3f6fb] font-sans">
      <Navbar lowMotion={lowMotion} onToggleMotion={() => setLowMotion((v) => !v)} />
      <StatusRibbon lowMotion={lowMotion} />
      <main className={`${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-700`}>
        <Hero lowMotion={lowMotion} />
        <Specifications />
        <Features />
        <Download />
      </main>
      <Footer />
      <AudioVisualizer lowMotion={lowMotion} />
    </div>
  )
}

export default App

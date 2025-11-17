import Hero from './components/Hero'
import Specifications from './components/Specifications'
import Features from './components/Features'
import Download from './components/Download'

function App() {
  return (
    <div className="min-h-screen bg-[#10131a] text-[#f3f6fb] font-sans">
      <Hero />
      <Specifications />
      <Features />
      <Download />
    </div>
  )
}

export default App

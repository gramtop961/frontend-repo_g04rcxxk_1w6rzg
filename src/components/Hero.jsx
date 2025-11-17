import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { useEffect, useRef } from 'react'

function LogoImage() {
  const imgRef = useRef(null)
  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const onError = () => {
      if (img) img.style.display = 'none'
    }
    img.addEventListener('error', onError)
    return () => img.removeEventListener('error', onError)
  }, [])
  return (
    <img
      ref={imgRef}
      src="/gepeszos-logo.png"
      alt="GepeszOS logo"
      className="h-10 w-auto mb-6 mx-auto opacity-90"
      loading="eager"
    />
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full bg-[#10131a] overflow-hidden flex items-center justify-center">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/KeusF4lUkfKzhtGY/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Optional video layer behind content as additional ambience */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
        src="/neon-curves.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Ambient gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#10131a]/60 via-[#10131a]/40 to-[#10131a]" />
      <div className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(60% 50% at 50% 40%, rgba(16,19,26,0) 0%, rgba(16,19,26,0.35) 55%, rgba(16,19,26,0.85) 100%)"}} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <LogoImage />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-[#50eaff] drop-shadow-[0_0_30px_rgba(80,234,255,0.35)]">
            GepeszOS
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-[#f3f6fb]/90">
            A next‑generation Windows experience engineered for innovation, energy, and pure speed.
          </p>

          <motion.a
            href="#download"
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(80,234,255,0.35)' }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#50eaff]/30 bg-white/5 backdrop-blur-md px-7 py-3 text-[#f3f6fb] text-base sm:text-lg font-medium transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#50eaff]/60"
            style={{ boxShadow: '0 0 18px rgba(80,234,255,0.25)' }}
          >
            <span className="text-[#50eaff] font-semibold">Download GepeszOS</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

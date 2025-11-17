import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { useEffect, useMemo, useRef } from 'react'

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
  const videoRef = useRef(null)
  const beamsRef = useRef(null)
  const orbsRef = useRef(null)
  const ringsRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onError = () => {
      v.style.display = 'none'
    }
    v.addEventListener('error', onError)
    return () => v.removeEventListener('error', onError)
  }, [])

  // Parallax mouse movement for depth and immersion
  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX - w / 2) / w
      const y = (e.clientY - h / 2) / h
      const tx = (d) => `translate3d(${x * d}px, ${y * d}px, 0)`
      if (beamsRef.current) beamsRef.current.style.transform = tx(-40)
      if (orbsRef.current) orbsRef.current.style.transform = tx(30)
      if (ringsRef.current) ringsRef.current.style.transform = tx(-20)
      if (contentRef.current) contentRef.current.style.transform = tx(8)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Precompute particle and orb configurations
  const particles = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      opacity: 0.25 + Math.random() * 0.6,
    }))
  }, [])

  const orbs = useMemo(() => {
    return [
      { size: 360, x: '-15%', y: '10%', hue: 188, alpha: 0.18, blur: 60 },
      { size: 280, x: '65%', y: '55%', hue: 190, alpha: 0.15, blur: 50 },
      { size: 220, x: '20%', y: '70%', hue: 185, alpha: 0.12, blur: 40 },
    ]
  }, [])

  return (
    <section className="relative min-h-[100svh] w-full bg-[#10131a] overflow-hidden flex items-center justify-center">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/KeusF4lUkfKzhtGY/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Ambient neon video layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
        src="/neon-curves.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop stop-color='%2310131a'/%3E%3Cstop offset='1' stop-color='%2310131a'/%3E%3C/linearGradient%3E%3Crect width='1200' height='800' fill='url(%23g)'/%3E%3C/svg%3E"
      />

      {/* Slow rotating neon light beams */}
      <div ref={beamsRef} className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          initial={{ rotate: 15, opacity: 0.28 }}
          animate={{ rotate: 375, opacity: 0.28 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(80,234,255,0.08), rgba(80,234,255,0.0) 20%, rgba(80,234,255,0.08) 40%, rgba(80,234,255,0.0) 60%, rgba(80,234,255,0.08) 80%, rgba(80,234,255,0.0))',
            filter: 'blur(40px) saturate(150%)',
          }}
        />
        <motion.div
          aria-hidden
          initial={{ rotate: -25, opacity: 0.22 }}
          animate={{ rotate: -385, opacity: 0.22 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-1"
          style={{
            background:
              'radial-gradient(50% 60% at 20% 40%, rgba(80,234,255,0.10), rgba(80,234,255,0.0) 70%), radial-gradient(40% 50% at 80% 70%, rgba(80,234,255,0.10), rgba(80,234,255,0.0) 70%)',
            filter: 'blur(50px) saturate(160%)',
          }}
        />
      </div>

      {/* Soft volumetric neon orbs */}
      <div ref={orbsRef} className="pointer-events-none absolute inset-0">
        {orbs.map((o, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full"
            style={{
              width: o.size,
              height: o.size,
              left: o.x,
              top: o.y,
              background: `radial-gradient(circle at 30% 30%, rgba(80,234,255,${o.alpha}), rgba(80,234,255,0) 60%)`,
              filter: `blur(${o.blur}px)`
            }}
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: [0.9, 1.05, 0.95, 1.02, 0.9] }}
            transition={{ duration: 18 + idx * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Floating neon rings */}
      <div ref={ringsRef} className="pointer-events-none absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 opacity-60"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        >
          <defs>
            <radialGradient id="rg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#50eaff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#50eaff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#50eaff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="26" fill="none" stroke="#50eaff" strokeOpacity="0.35" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#50eaff" strokeOpacity="0.22" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="49" fill="url(#rg)" />
        </motion.svg>
      </div>

      {/* Starfield particles rising */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{ left: `${p.left}%`, width: p.size, height: p.size, background: '#50eaff', boxShadow: '0 0 8px rgba(80,234,255,0.6)' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: ['110%', '-10%'], opacity: [0, p.opacity, 0] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
        ))}
      </div>

      {/* Ambient gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#10131a]/60 via-[#10131a]/40 to-[#10131a]" />
      <div className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(60% 50% at 50% 40%, rgba(16,19,26,0) 0%, rgba(16,19,26,0.35) 55%, rgba(16,19,26,0.85) 100%)"}} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl px-6 text-center will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <LogoImage />

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-[#50eaff] drop-shadow-[0_0_30px_rgba(80,234,255,0.35)]"
            initial={{ textShadow: '0 0 0 rgba(80,234,255,0.0)' }}
            animate={{ textShadow: ['0 0 0 rgba(80,234,255,0.0)', '0 0 24px rgba(80,234,255,0.6)', '0 0 0 rgba(80,234,255,0.0)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            GepeszOS
          </motion.h1>
          <motion.p
            className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-[#f3f6fb]/90"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          >
            A next‑generation Windows experience engineered for innovation, energy, and pure speed.
          </motion.p>

          <motion.a
            href="#download"
            whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(80,234,255,0.45)' }}
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

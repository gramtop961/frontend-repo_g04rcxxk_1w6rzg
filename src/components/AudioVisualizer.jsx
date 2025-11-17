import { useEffect, useMemo, useRef, useState } from 'react'
import { Headphones } from 'lucide-react'

// 2-second very soft synth pad (low volume) fallback as data URI (mp3)
const FALLBACK_AUDIO =
  'data:audio/mpeg;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAACAAACAAACAAACAAACAAAAGZhdGEAAAAAAAAD//wAAABNJU0ZURi0xLjAgaHR0cHM6Ly9pc2Z0Lm9yZy8AAABMYW1lMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAADGFtcGxpZmllZCBzaWxlbmNl//sQxAAGQAAAQAAABAAAACQAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP/7EMQADkAAAIAAAAEAAAAmAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/7EMQAEkAAAIAAAAEAAAAmAAAAHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcP/7EMQAFkAAAIAAAAEAAAAmAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP/7EMQAGkAAAIAAAAEAAAAmAAAAHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcP/7EMQAHkAAAIAAAAEAAAAmAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP/7EMQAIkAAAIAAAAEAAAAmAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgP//Z';

export default function AudioVisualizer({ lowMotion = false }) {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const analyserRef = useRef(null)
  const dataRef = useRef(null)
  const rafRef = useRef(0)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const audio = audioRef.current
    if (!audio) return

    let ctx
    let analyser

    const setup = async () => {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)()
        analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        const source = ctx.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(ctx.destination)
        ctxRef.current = ctx
        analyserRef.current = analyser
        dataRef.current = new Uint8Array(analyser.frequencyBinCount)
        await audio.play().catch(() => {})
        draw()
      } catch {
        // ignored
      }
    }

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current || !dataRef.current) return
      const ctx2 = canvasRef.current.getContext('2d')
      const { width, height } = canvasRef.current
      ctx2.clearRect(0, 0, width, height)
      analyserRef.current.getByteFrequencyData(dataRef.current)
      const bars = lowMotion ? 16 : 28
      const barWidth = width / bars
      for (let i = 0; i < bars; i++) {
        const v = dataRef.current[i]
        const h = (v / 255) * height
        const x = i * barWidth
        const grad = ctx2.createLinearGradient(0, height - h, 0, height)
        grad.addColorStop(0, 'rgba(80,234,255,0.9)')
        grad.addColorStop(1, 'rgba(80,234,255,0.1)')
        ctx2.fillStyle = grad
        ctx2.fillRect(x + 2, height - h, barWidth - 4, h)
        ctx2.shadowColor = 'rgba(80,234,255,0.4)'
        ctx2.shadowBlur = 12
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    setup()
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (ctxRef.current) ctxRef.current.close()
    }
  }, [enabled, lowMotion])

  useEffect(() => {
    if (!enabled && canvasRef.current) {
      const ctx2 = canvasRef.current.getContext('2d')
      ctx2 && ctx2.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [enabled])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
        <button
          aria-pressed={enabled}
          onClick={() => setEnabled((v) => !v)}
          className={`inline-flex items-center gap-2 text-xs font-medium ${enabled ? 'text-[#50eaff]' : 'text-[#f3f6fb]/70'}`}
        >
          <Headphones className="h-4 w-4" />
          {enabled ? 'Visualizer On' : 'Visualizer Off'}
        </button>
      </div>
      <div className="mt-2 rounded-xl overflow-hidden border border-white/10 bg-[#0e1117]/80 backdrop-blur">
        <canvas ref={canvasRef} width={280} height={68} />
      </div>
      <audio ref={audioRef} loop muted={lowMotion} preload="auto">
        <source src="/ambient.mp3" type="audio/mpeg" />
        <source src={FALLBACK_AUDIO} type="audio/mpeg" />
      </audio>
    </div>
  )
}

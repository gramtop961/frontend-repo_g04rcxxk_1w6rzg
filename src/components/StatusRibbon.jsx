import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Server, ShieldCheck } from 'lucide-react'

function fmtUptime(ms) {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h}h ${m}m ${sec}s`
}

export default function StatusRibbon({ lowMotion = false }) {
  const start = useMemo(() => Date.now(), [])
  const [uptime, setUptime] = useState('0h 0m 0s')
  const [mirrorOK, setMirrorOK] = useState(true)
  const tickRef = useRef(0)

  useEffect(() => {
    const step = () => {
      setUptime(fmtUptime(Date.now() - start))
      tickRef.current = requestAnimationFrame(step)
    }
    tickRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(tickRef.current)
  }, [start])

  useEffect(() => {
    // Simulate mirror health flipping occasionally
    const id = setInterval(() => setMirrorOK((v) => (Math.random() < 0.85 ? true : !v)), 6000)
    return () => clearInterval(id)
  }, [])

  const build = useMemo(() => {
    const d = new Date()
    const part = `${d.getUTCFullYear().toString().slice(2)}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`
    return `Build ${part}.${d.getUTCHours()}${d.getUTCMinutes()}`
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-[45] pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 mt-[72px] md:mt-[76px]">
        <div className="pointer-events-auto flex items-center gap-4 overflow-x-auto whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#f3f6fb]/70 backdrop-blur-xl">
          <div className="inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-[#50eaff]" /><span>{build}</span></div>
          <div className="inline-flex items-center gap-1.5"><Server className="h-3.5 w-3.5 text-[#50eaff]" /><span>Uptime {uptime}</span></div>
          <div className="inline-flex items-center gap-1.5"><ShieldCheck className={`h-3.5 w-3.5 ${mirrorOK ? 'text-emerald-400' : 'text-amber-400'}`} /><span>Mirrors {mirrorOK ? 'OK' : 'Degraded'}</span></div>
          {!lowMotion && <span className="hidden sm:inline text-[#f3f6fb]/50">•</span>}
          {!lowMotion && <span className="hidden sm:inline">Latency ~{Math.floor(20 + Math.random()*10)}ms</span>}
        </div>
      </div>
    </div>
  )
}

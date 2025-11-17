import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ lowMotion, onToggleMotion }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setOpen(false)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = 'px-3 py-2 text-sm md:text-[15px] text-[#f3f6fb]/80 hover:text-[#50eaff] transition-colors'

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => scrollTo('#top')} className="flex items-center gap-3 group">
              <img src="/gepeszos-logo.png" alt="GepeszOS" className="h-7 w-auto opacity-90" />
              <span className="text-sm md:text-base font-semibold text-[#f3f6fb] group-hover:text-[#50eaff] transition-colors">GepeszOS</span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => scrollTo('#specs')} className={linkClass}>Specifications</button>
              <button onClick={() => scrollTo('#features')} className={linkClass}>Features</button>
              <button onClick={() => scrollTo('#download')} className={linkClass}>Download</button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-[#f3f6fb]/70">
                <input type="checkbox" checked={lowMotion} onChange={onToggleMotion} className="accent-[#50eaff]" />
                Reduce motion
              </label>
              <a href="#download" className="inline-flex items-center rounded-full border border-[#50eaff]/40 bg-white/5 px-4 py-2 text-sm font-medium text-[#50eaff] hover:bg-white/10 transition-all" style={{ boxShadow: '0 0 14px rgba(80,234,255,0.25)' }}>
                Get ISO
              </a>
            </div>

            <button className="md:hidden text-[#f3f6fb]" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {open && (
            <div className="md:hidden border-t border-white/10 px-4 py-3">
              <div className="flex flex-col gap-2">
                <button onClick={() => scrollTo('#specs')} className={linkClass}>Specifications</button>
                <button onClick={() => scrollTo('#features')} className={linkClass}>Features</button>
                <button onClick={() => scrollTo('#download')} className={linkClass}>Download</button>
                <label className="mt-2 flex items-center gap-2 text-xs text-[#f3f6fb]/70">
                  <input type="checkbox" checked={lowMotion} onChange={onToggleMotion} className="accent-[#50eaff]" />
                  Reduce motion
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

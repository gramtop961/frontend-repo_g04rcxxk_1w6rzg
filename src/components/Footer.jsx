export default function Footer() {
  return (
    <footer className="w-full bg-[#0e1117] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/gepeszos-logo.png" alt="GepeszOS" className="h-7 w-auto opacity-90" />
          <span className="text-sm text-[#f3f6fb]/70">© {new Date().getFullYear()} GepeszOS. All rights reserved.</span>
        </div>
        <div className="text-xs text-[#f3f6fb]/50">
          Built for speed • Neon blue energy • Cinematic motion
        </div>
      </div>
    </footer>
  )
}

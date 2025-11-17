import { DownloadCloud } from 'lucide-react'

const VERSION = '1.0.0'
const FILE_SIZE = '4.2 GB'
const DOWNLOAD_URL = 'https://example.com/gepeszos-1.0.0.iso'
const CHECKSUM = 'sha256: 3f1a...9be2'

export default function Download() {
  return (
    <section id="download" className="relative w-full bg-[#10131a] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f3f6fb]">Download GepeszOS</h2>
        <p className="mt-3 text-[#f3f6fb]/80">Version {VERSION} • ISO • {FILE_SIZE}</p>
        <div className="mt-2 text-xs text-[#f3f6fb]/60">{CHECKSUM}</div>
        <a
          href={DOWNLOAD_URL}
          aria-label={`Download GepeszOS ${VERSION} (${FILE_SIZE})`}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#50eaff]/30 bg-white/5 backdrop-blur-md px-8 py-4 text-[#f3f6fb] text-lg font-medium transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#50eaff]/60"
          style={{ boxShadow: '0 0 18px rgba(80,234,255,0.25)' }}
        >
          <DownloadCloud className="h-5 w-5 text-[#50eaff]" />
          <span className="text-[#50eaff] font-semibold">Download GepeszOS</span>
        </a>
        <p className="mt-4 text-sm text-[#f3f6fb]/70">By downloading, you agree to the license and acknowledge beta features may change.</p>
      </div>
    </section>
  )
}

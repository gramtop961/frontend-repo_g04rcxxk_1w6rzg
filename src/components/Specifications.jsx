import { Cpu, HardDrive, MonitorSmartphone } from 'lucide-react'

const Item = ({ icon: Icon, title, lines }) => (
  <div className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="h-5 w-5 text-[#50eaff]" />
      <h3 className="text-lg font-semibold text-[#f3f6fb]">{title}</h3>
    </div>
    <ul className="space-y-1 text-sm text-[#f3f6fb]/80">
      {lines.map((l, idx) => (
        <li key={idx}>• {l}</li>
      ))}
    </ul>
  </div>
)

export default function Specifications() {
  return (
    <section className="relative w-full bg-[#10131a] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f3f6fb] text-center mb-12">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Item
            icon={Cpu}
            title="Hardware Requirements"
            lines={[
              '64-bit CPU (2+ cores)',
              '8 GB RAM minimum',
              '20 GB storage',
              'UEFI + Secure Boot compatible',
            ]}
          />
          <Item
            icon={MonitorSmartphone}
            title="Supported Platforms"
            lines={[
              'Desktop & Laptops',
              'x64 architecture',
              'Modern GPUs supported',
              'High-DPI displays',
            ]}
          />
          <Item
            icon={HardDrive}
            title="Recommended Specs"
            lines={[
              '4+ core CPU',
              '16–32 GB RAM',
              'NVMe SSD',
              'Dedicated GPU for gaming',
            ]}
          />
        </div>
      </div>
    </section>
  )
}

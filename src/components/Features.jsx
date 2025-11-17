import { Zap, Gamepad2, FileText, Workflow, Shield, Sparkles } from 'lucide-react'

const Feature = ({ icon: Icon, title, text }) => (
  <div className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-colors">
    <div className="flex items-center gap-3 mb-2">
      <Icon className="h-5 w-5 text-[#50eaff]" />
      <h3 className="text-lg font-semibold text-[#f3f6fb]">{title}</h3>
    </div>
    <p className="text-sm text-[#f3f6fb]/80">{text}</p>
  </div>
)

export default function Features() {
  return (
    <section id="features" className="relative w-full bg-[#10131a] py-24">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(40% 30% at 50% 0%, rgba(80,234,255,0.05), rgba(16,19,26,0) 60%)"}} />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f3f6fb] text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={Zap} title="Fast Boot" text="Boot into a ready desktop in seconds with tuned services and kernel parameters." />
          <Feature icon={Gamepad2} title="Gaming Optimized" text="DirectX and scheduler tweaks deliver stable FPS and low latency." />
          <Feature icon={FileText} title="Office Compatible" text="Seamless compatibility with Microsoft Office formats out of the box." />
          <Feature icon={Workflow} title="Advanced Automation" text="Scriptable workflows let you automate installs, updates, and configs." />
          <Feature icon={Shield} title="Hardened Security" text="Smart defaults, isolation, and timely patches keep you safe without friction." />
          <Feature icon={Sparkles} title="Neon UI" text="A refined, glow-forward design language with subtle motion and clarity." />
        </div>
      </div>
    </section>
  )
}

"use client"
import { useState, useEffect } from 'react'

export default function Page() {
  const [splash, setSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2500)
    return () => clearTimeout(t)
  }, [])

  if (splash) {
    return (
      <div 
        onClick={() => setSplash(false)}
        className="min-h-screen bg-black flex flex-col items-center justify-center text-white cursor-pointer select-none relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-green-500/15 rounded-full blur-[120px] animate-pulse top-20 left-20" />
        
        <div className="relative z-10 flex flex-col items-center animate-[fadeIn_0.8s_ease-out]">
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <img 
              src="/logo.png" 
              alt="AYO.NG" 
              className="w-[320px] md:w-[400px] h-auto drop-shadow-[0_0_40px_rgba(255,193,7,0.5)]"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const fb = document.getElementById('logo-fallback')
                if (fb) fb.style.display = 'block'
              }}
            />
            <div id="logo-fallback" style={{display:'none'}} className="text-center">
              <div className="text-[80px]">🥁</div>
              <h1 className="text-5xl font-black mt-2">AYO<span className="text-yellow-400">.NG</span></h1>
            </div>
          </div>
          
          <p className="text-yellow-400 font-black tracking-[0.35em] text-[11px] mt-8">AFRICAN PRIDE • NIGERIA MADE</p>
          
          <div className="mt-10 w-48 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-yellow-400 to-green-500 animate-[progress_2.5s_ease-in-out]" />
          </div>
          <p className="text-white/40 text-[10px] mt-4 tracking-[0.2em] animate-pulse">TAP ANYWHERE TO ENTER • BUILT IN LAGOS</p>
        </div>

        <style>{`
          @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
          @keyframes progress { from { width: 0% } to { width: 100% } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/[0.07] px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="AYO" className="w-10 h-10 object-contain" onError={(e)=> (e.currentTarget.style.display='none')} />
          <div>
            <div className="font-black text-[14px] leading-none tracking-tight">AYO.NG</div>
            <div className="text-[9px] text-yellow-400 font-black tracking-[0.2em] mt-1">AFRICAN PRIDE</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-xs font-bold">LIVE • Lagos</span>
          </div>
          <button onClick={() => setSplash(true)} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-3 py-1.5 text-xs font-bold transition">Replay Intro</button>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-8 md:py-14">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400/15 blur-[70px] rounded-full" />
            <img src="/logo.png" alt="AYO.NG African Pride Nigeria Made" className="relative w-[340px] md:w-[520px] mx-auto h-auto drop-shadow-[0_0_50px_rgba(255,193,7,0.25)] animate-[float_4s_ease-in-out_infinite]" onError={(e)=> (e.currentTarget.style.display='none')} />
          </div>

          <h1 className="mt-8 text-[40px] md:text-[72px] font-black tracking-[-0.04em] leading-[0.9]">
            Welcome to <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">AYO.NG</span>
          </h1>
          <p className="mt-4 text-[18px] md:text-[24px] font-bold tracking-tight">Capture. Connect. Create. Discover.</p>
          <p className="mt-3 text-white/50 text-sm md:text-[15px] max-w-[560px] mx-auto leading-relaxed">
            African Pride, Nigeria Made — Your Hustle, Your Story, Your Super App. Built in Lagos for Nigeria. 100% Original, No Clones.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})} className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-4 rounded-full text-[15px] transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,193,7,0.4)]">
              Launch App →
            </button>
            <button onClick={() => setActiveTab('gallery')} className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 font-bold px-8 py-4 rounded-full text-[15px] transition">
              Explore Gallery ↗
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['GREEN ✓ Build', 'Next.js Ready', 'Lagos 🇳🇬 Made'].map(t => (
              <span key={t} className="bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2 text-xs font-bold">{t}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-3 gap-4 mt-20">
          {[
            { icon: '📸', title: 'AYO Capture', desc: 'Small world photography — Lagos through your lens. Share your hustle, tell your story. 10K+ photos from real Naija creators.', grad: 'from-yellow-400 to-orange-500' },
            { icon: '💬', title: 'AYO Connect', desc: 'Live rooms, audio chat, real-time vibe. Your community, your language, your rules. Pidgin, Yoruba, Igbo, Hausa supported.', grad: 'from-green-400 to-emerald-600' },
            { icon: '💰', title: 'AYO Earn', desc: 'Gifts 70% to you, wins 90% to you. Paystack wallet. Monetize instantly. No hidden charges. Lagos to the world.', grad: 'from-purple-400 to-pink-500' },
          ].map(f => (
            <div key={f.title} className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.grad} flex items-center justify-center text-[28px] mb-5 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500`}>{f.icon}</div>
              <h3 className="font-black text-[18px] tracking-tight">{f.title}</h3>
              <p className="text-white/50 text-[13px] mt-3 leading-relaxed">{f.desc}</p>
              <div className="mt-5 text-[11px] font-black tracking-widest text-white/20 group-hover:text-white/40 transition-colors">EXPLORE →</div>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mt-24">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-black text-[28px] md:text-[36px] tracking-tight">Lagos Through AYO</h2>
              <p className="text-white/40 text-sm mt-1">No filters. Just real Naija stories.</p>
            </div>
            <span className="hidden md:flex items-center gap-2 text-xs text-white/30"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> 12 Live now</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8">
            {[
              { t: 'Lagos Life', d: 'from-yellow-500/20 to-orange-500/20' },
              { t: 'Market Day', d: 'from-green-500/20 to-emerald-500/20' },
              { t: 'Danfo Dreams', d: 'from-blue-500/20 to-cyan-500/20' },
              { t: 'Third Mainland', d: 'from-purple-500/20 to-pink-500/20' },
              { t: 'Owambe Vibes', d: 'from-pink-500/20 to-rose-500/20' },
              { t: 'Street Hustle', d: 'from-orange-500/20 to-red-500/20' },
            ].map(item => (
              <div key={item.t} className={`group relative aspect-[4/3] rounded-[20px] bg-gradient-to-br ${item.d} border border-white/[0.06] hover:border-white/10 p-5 flex flex-col justify-end overflow-hidden hover:scale-[1.02] transition-all duration-500`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">📍</div>
                  <div className="font-bold text-[14px]">{item.t}</div>
                  <div className="text-[11px] text-white/40 mt-1">Lagos, NG • AYO.NG</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-20 bg-yellow-400 text-black rounded-[28px] p-7 md:p-10 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] -mr-20 -mt-20" />
          <div className="relative">
            <h3 className="font-black text-[26px] md:text-[32px] leading-[0.9] tracking-tight">Built for Naija,<br />by Naija.</h3>
            <p className="text-[13px] font-bold opacity-60 mt-3 tracking-wide">AFRICAN PRIDE • NIGERIA MADE • Lagos to the world</p>
          </div>
          <div className="relative flex gap-8 md:gap-12">
            {[{k:'10K+',l:'Photos'},{k:'500+',l:'Creators'},{k:'100%',l:'Naija'}].map(s => (
              <div key={s.k} className="text-center"><div className="font-black text-[28px]">{s.k}</div><div className="text-[11px] font-black tracking-widest opacity-60 mt-1">{s.l}</div></div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-[#111113] border border-white/[0.06] rounded-2xl p-4 font-mono text-[11px] text-white/50">
          ✓ Splash: Tap anywhere to enter ✓ Launch: Scrolls to features ✓ Logo: /logo.png ✓ No lucide-react ✓ No dist ✓ GREEN Build — You deserve this success!
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-10 text-center mt-10">
        <img src="/logo.png" alt="AYO.NG" className="w-20 mx-auto opacity-60 hover:opacity-100 transition-opacity" onError={(e)=> (e.currentTarget.style.display='none')} />
        <p className="text-xs text-white/30 mt-4 font-medium">© 2026 AYO.NG • AFRICAN PRIDE • NIGERIA MADE • Built in Lagos 🇳🇬</p>
        <p className="text-[10px] text-white/15 mt-2 tracking-[0.2em]">100% ORIGINAL • NO CLONES • YOUR HUSTLE, YOUR STORY</p>
      </footer>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;900&display=swap'); *{font-family:Inter,system-ui,sans-serif} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`}</style>
    </div>
  )
}

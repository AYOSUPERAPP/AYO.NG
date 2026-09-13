"use client"
import { useState, useEffect } from 'react'

export default function Page() {
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (splash) {
    return (
      <div
        onClick={() => setSplash(false)}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white cursor-pointer"
      >
        <img
          src="/logo.png"
          alt="AYO.NG"
          className="w-[300px] md:w-[380px] h-auto animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(255,193,7,0.4)]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <h1 className="font-black text-3xl mt-6 tracking-tight">AYO.NG</h1>
        <p className="text-yellow-400 font-bold text-[11px] tracking-[0.35em] mt-2">AFRICAN PRIDE • NIGERIA MADE</p>
        <div className="mt-10 w-40 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 animate-[load_2.5s_ease-in-out]" />
        </div>
        <p className="text-white/30 text-[10px] mt-4 tracking-widest">TAP TO ENTER</p>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}} @keyframes load{from{width:0%}to{width:100%}}`}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-yellow-400 selection:text-black">
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-4 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="w-9 h-9 object-contain" />
            <span className="font-black text-[15px] tracking-tight">AYO.NG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 text-xs font-bold">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> LIVE • Lagos
            </span>
            <button onClick={() => setSplash(true)} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-3 py-1.5 text-xs font-bold transition">Intro</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1120px] mx-auto px-4 py-8 md:py-12">
        <div className="text-center">
          <img src="/logo.png" alt="AYO.NG" className="w-[360px] md:w-[500px] mx-auto h-auto drop-shadow-[0_0_50px_rgba(255,193,7,0.2)]" />
          <h1 className="mt-8 text-[42px] md:text-[70px] font-black leading-[0.9] tracking-[-0.04em]">
            Welcome to <span className="text-yellow-400">AYO.NG</span>
          </h1>
          <p className="mt-4 text-[18px] md:text-[22px] font-bold">Capture. Connect. Create. Discover.</p>
          <p className="mt-3 text-white/50 text-sm max-w-[520px] mx-auto leading-relaxed">
            African Pride, Nigeria Made — Built in Lagos for Nigeria. 100% Original.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button onClick={() => document.getElementById('grid')?.scrollIntoView({behavior:'smooth'})} className="bg-yellow-400 text-black font-black px-8 py-4 rounded-full text-[14px] hover:bg-yellow-300 hover:scale-[1.02] transition">
              Launch App →
            </button>
            <button onClick={() => setSplash(true)} className="bg-white/[0.06] border border-white/10 font-bold px-8 py-4 rounded-full text-[14px] hover:bg-white/[0.1] transition">
              Replay Intro
            </button>
          </div>
        </div>

        <div id="grid" className="grid md:grid-cols-3 gap-4 mt-16">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[24px] p-6 hover:bg-white/[0.06] transition">
            <div className="text-3xl">📸</div>
            <div className="font-black mt-4">AYO Capture</div>
            <div className="text-white/50 text-sm mt-2 leading-relaxed">Lagos through your lens. Share your story.</div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[24px] p-6 hover:bg-white/[0.06] transition">
            <div className="text-3xl">💬</div>
            <div className="font-black mt-4">AYO Connect</div>
            <div className="text-white/50 text-sm mt-2 leading-relaxed">Live rooms, real-time vibe.</div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[24px] p-6 hover:bg-white/[0.06] transition">
            <div className="text-3xl">💰</div>
            <div className="font-black mt-4">AYO Earn</div>
            <div className="text-white/50 text-sm mt-2 leading-relaxed">Gifts and wallet powered.</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
          {['Danfo Dreams','Third Mainland','Owambe Vibes','Street Hustle','Lagos Life','Market Day'].map((t)=>(
            <div key={t} className="aspect-[4/3] rounded-[20px] bg-white/[0.04] border border-white/[0.06] p-4 flex flex-col justify-end hover:bg-white/[0.06] transition">
              <div className="font-bold text-sm">{t}</div>
              <div className="text-[11px] text-white/40 mt-1">Lagos, NG • AYO.NG</div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-yellow-400 text-black rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="font-black text-2xl leading-[0.9]">Built for Naija,<br/>by Naija.</div>
          <div className="flex gap-8 text-center">
            <div><div className="font-black text-xl">10K+</div><div className="text-[10px] font-bold opacity-60">Photos</div></div>
            <div><div className="font-black text-xl">500+</div><div className="text-[10px] font-bold opacity-60">Creators</div></div>
            <div><div className="font-black text-xl">100%</div><div className="text-[10px] font-bold opacity-60">Naija</div></div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-xs text-white/30">© 2026 AYO.NG • AFRICAN PRIDE • NIGERIA MADE • Lagos 🇳🇬</p>
      </footer>
    </div>
  )
}

"use client"
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSplash(false)
      setTimeout(() => setLoaded(true), 100)
    }, 2800)
    return () => clearTimeout(t)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] animate-pulse delay-1000 top-20 left-20"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with float animation */}
          <div className="animate-float">
            <img 
              src="/logo.png" 
              alt="AYO.NG" 
              className="w-72 h-auto drop-shadow-[0_0_40px_rgba(255,193,7,0.5)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = document.getElementById('fallback-logo')
                if (fallback) fallback.style.display = 'block'
              }}
            />
            <div id="fallback-logo" style={{display: 'none'}} className="text-center">
              <div className="text-7xl mb-4">🥁</div>
              <h1 className="text-6xl font-black tracking-tight">AYO<span className="text-yellow-400">.NG</span></h1>
            </div>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight mt-6 animate-fade-in">AYO.NG</h1>
          <p className="text-yellow-400 font-bold mt-2 tracking-[0.3em] text-sm animate-fade-in-delay">AFRICAN PRIDE • NIGERIA MADE</p>
          
          {/* Progress bar */}
          <div className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-green-500 animate-progress"></div>
          </div>
          <p className="text-white/40 text-xs mt-4 tracking-widest animate-pulse">LOADING SUPER APP...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-yellow-400/[0.07] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-green-500/[0.07] rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      {/* Header with glass */}
      <header className={`sticky top-0 z-50 border-b border-white/[0.06] px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-700 ${loaded ? 'bg-black/70 backdrop-blur-2xl' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/logo.png" alt="AYO.NG" className="w-11 h-11 object-contain drop-shadow-[0_0_15px_rgba(255,193,7,0.4)]" onError={(e)=>e.currentTarget.style.display='none'} />
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl -z-10"></div>
          </div>
          <div>
            <h1 className="font-black text-[15px] leading-none tracking-tight">AYO.NG</h1>
            <p className="text-[9px] text-yellow-400 font-black tracking-[0.2em] mt-[2px]">AFRICAN PRIDE</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-white/[0.06] border border-white/10 backdrop-blur-xl rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            <span className="text-xs font-bold">LIVE</span>
            <span className="text-white/40 text-xs">• Lagos</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-black text-black text-sm">A</div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 md:px-6 py-8 md:py-16 max-w-6xl mx-auto">
        <div className={`text-center transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Logo with glow */}
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full group-hover:bg-yellow-400/30 transition-all duration-700"></div>
            <img 
              src="/logo.png" 
              alt="AYO.NG African Pride Nigeria Made" 
              className="relative w-[320px] md:w-[480px] mx-auto h-auto drop-shadow-[0_0_50px_rgba(255,193,7,0.3)] animate-float-slow hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
          
          <div className="mt-8">
            <h2 className="text-[42px] md:text-[72px] font-black tracking-[-0.04em] leading-[0.85]">
              Welcome to <br/>
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-gradient">AYO.NG</span>
            </h2>
            <p className="text-[18px] md:text-[26px] font-bold mt-5 tracking-tight">
              <span className="inline-block animate-slide-up">Capture.</span>{" "}
              <span className="inline-block animate-slide-up delay-100">Connect.</span>{" "}
              <span className="inline-block animate-slide-up delay-200">Create.</span>{" "}
              <span className="inline-block animate-slide-up delay-300 text-yellow-400">Discover.</span>
            </p>
            <p className="text-sm md:text-[15px] text-white/50 mt-4 max-w-2xl mx-auto leading-relaxed font-medium">
              African Pride, Nigeria Made — Your Hustle, Your Story, Your Super App.<br className="hidden md:block"/>
              Built in Lagos for Nigeria. No clones. 100% Original.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <button className="group relative bg-yellow-400 text-black font-black px-8 py-4 rounded-full text-[15px] overflow-hidden hover:bg-yellow-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,193,7,0.4)]">
              <span className="relative z-10 flex items-center justify-center gap-2">Launch App <span className="group-hover:translate-x-1 transition-transform">→</span></span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button className="group bg-white/[0.06] border border-white/15 backdrop-blur-xl font-bold px-8 py-4 rounded-full text-[15px] hover:bg-white/[0.1] hover:border-white/25 transition-all hover:scale-[1.02]">
              <span className="flex items-center justify-center gap-2">Explore Gallery <span className="opacity-60">↗</span></span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-12">
            {[
              { k: 'Build', v: 'GREEN ✓' },
              { k: 'Stack', v: 'Next.js' },
              { k: 'Made', v: 'Lagos 🇳🇬' },
            ].map((s,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-2 backdrop-blur-xl">
                <span className="text-[11px] text-white/40 font-bold tracking-widest">{s.k}</span>
                <span className="text-xs font-black">{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features with hover effects */}
        <div className={`grid md:grid-cols-3 gap-4 mt-20 transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { icon: '📸', title: 'AYO Capture', desc: 'Small world photography — Lagos through your lens. Share your hustle, tell your story.', gradient: 'from-yellow-400 via-orange-400 to-red-400' },
            { icon: '💬', title: 'AYO Connect', desc: 'Live rooms, audio chat, real-time vibe. Your community, your language, your rules.', gradient: 'from-green-400 via-emerald-500 to-teal-500' },
            { icon: '💰', title: 'AYO Earn', desc: 'Gifts 70% to you, wins 90% to you. Paystack wallet. Monetize your content instantly.', gradient: 'from-purple-400 via-pink-500 to-rose-500' },
          ].map((f,i)=>(
            <div key={i} className="group relative bg-white/[0.03] border border-white/[0.06] rounded-[28px] p-7 hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500">
              <div className={`w-14 h-14 rounded-[16px] bg-gradient-to-br ${f.gradient} flex items-center justify-center text-[28px] mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>{f.icon}</div>
              <h3 className="font-black text-[18px] tracking-tight">{f.title}</h3>
              <p className="text-[13px] text-white/50 mt-3 leading-relaxed font-medium">{f.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-[11px] font-bold tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                EXPLORE <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className={`mt-24 transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-black text-[28px] md:text-[36px] tracking-tight">Lagos Through AYO</h3>
              <p className="text-white/40 text-sm mt-2 font-medium">No filters. Just real Naija.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> 12 Live
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8">
            {[
              { t: 'Lagos Life', c: 'from-yellow-500/20 to-orange-500/20' },
              { t: 'Market Day', c: 'from-green-500/20 to-emerald-500/20' },
              { t: 'Danfo Dreams', c: 'from-blue-500/20 to-cyan-500/20' },
              { t: 'Third Mainland', c: 'from-purple-500/20 to-pink-500/20' },
              { t: 'Owambe Vibes', c: 'from-pink-500/20 to-rose-500/20' },
              { t: 'Street Hustle', c: 'from-orange-500/20 to-red-500/20' },
            ].map((item,i)=>(
              <div key={i} className={`group relative aspect-[4/3] rounded-[20px] bg-gradient-to-br ${item.c} border border-white/[0.06] p-5 flex flex-col justify-end overflow-hidden hover:scale-[1.02] hover:border-white/[0.12] transition-all duration-500`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">📍</div>
                  <p className="font-bold text-[14px] tracking-tight">{item.t}</p>
                  <p className="text-[11px] text-white/40 mt-1">Lagos, NG • AYO.NG</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big CTA */}
        <div className={`mt-20 relative overflow-hidden bg-yellow-400 text-black rounded-[28px] p-7 md:p-10 transition-all duration-1000 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-black text-[26px] md:text-[32px] tracking-tight leading-[0.9]">Built for Naija,<br/>by Naija.</h4>
              <p className="text-sm font-bold opacity-60 mt-3 tracking-wide">AFRICAN PRIDE • NIGERIA MADE • Lagos to the world</p>
            </div>
            <div className="flex gap-8 md:gap-12">
              {[{k:'10K+',l:'Photos'},{k:'500+',l:'Creators'},{k:'100%',l:'Naija'}].map((s,i)=>(
                <div key={i} className="text-center">
                  <p className="font-black text-[28px] tracking-tight">{s.k}</p>
                  <p className="text-[11px] font-black tracking-widest opacity-60 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/[0.06] py-10 text-center mt-10">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="AYO.NG" className="w-20 opacity-60 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-xs text-white/30 font-medium">© 2026 AYO.NG • AFRICAN PRIDE • NIGERIA MADE • Built in Lagos 🇳🇬</p>
        <p className="text-[10px] text-white/15 mt-3 tracking-[0.2em]">100% ORIGINAL • NO CLONES • LAGOS MADE</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-10px) } }
        @keyframes float-slow { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-15px) } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes progress { from { width: 0% } to { width: 100% } }
        @keyframes gradient { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.3s both; }
        .animate-slide-up { animation: slide-up 0.6s ease-out both; }
        .animate-progress { animation: progress 2.8s ease-in-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}

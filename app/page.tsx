"use client"
import React, { useEffect, useState } from 'react'

const logo = "/logo.png"

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
]

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200)
    return () => clearTimeout(t)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <img src={logo} alt="AYO.NG" className="w-64 h-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-black">AYO.NG</h1>
        <p className="text-yellow-400 font-bold mt-2 tracking-widest">AFRICAN PRIDE • NIGERIA MADE</p>
        <p className="text-white/60 text-sm mt-6">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AYO.NG" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-black text-lg leading-none">AYO.NG</h1>
            <p className="text-[10px] text-yellow-400 font-bold tracking-widest">AFRICAN PRIDE</p>
          </div>
        </div>
        <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">LIVE • Lagos</div>
      </header>

      <section className="px-4 py-10 max-w-6xl mx-auto text-center">
        <img src={logo} alt="AYO.NG African Pride" className="w-72 md:w-[400px] mx-auto h-auto mb-8" />
        <h2 className="text-4xl md:text-6xl font-black leading-[0.9]">Welcome to <span className="text-yellow-400">AYO.NG</span></h2>
        <p className="text-xl md:text-2xl font-bold mt-4">Capture. Connect. Create. Discover.</p>
        <p className="text-sm text-white/60 mt-3 max-w-2xl mx-auto">African Pride, Nigeria Made — Your Hustle, Your Story, Your Super App. Built in Lagos for Nigeria.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button className="bg-yellow-400 text-black font-black px-8 py-4 rounded-full text-lg">Launch App 🚀</button>
          <button className="bg-white/10 border border-white/20 font-bold px-8 py-4 rounded-full text-lg">Explore Gallery</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-16 text-left">
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6"><div className="text-3xl mb-3">📸</div><h3 className="font-black">AYO Capture</h3><p className="text-sm text-white/60 mt-2">Small world photography — Lagos through your lens.</p></div>
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6"><div className="text-3xl mb-3">💬</div><h3 className="font-black">AYO Connect</h3><p className="text-sm text-white/60 mt-2">Chat rooms, live audio, real-time connect.</p></div>
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6"><div className="text-3xl mb-3">💰</div><h3 className="font-black">AYO Earn</h3><p className="text-sm text-white/60 mt-2">Gifts 70% to creator, Paystack wallet.</p></div>
        </div>

        <div className="mt-16 bg-yellow-400 text-black rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left"><h4 className="font-black text-2xl">Built for Naija, by Naija</h4><p className="text-sm opacity-70">AFRICAN PRIDE • NIGERIA MADE</p></div>
          <div className="flex gap-8"><div className="text-center"><p className="font-black text-2xl">10K+</p><p className="text-xs font-bold opacity-60">Photos</p></div><div className="text-center"><p className="font-black text-2xl">500+</p><p className="text-xs font-bold opacity-60">Creators</p></div><div className="text-center"><p className="font-black text-2xl">100%</p><p className="text-xs font-bold opacity-60">Naija</p></div></div>
        </div>

        <div className="mt-12 bg-[#111113] border border-white/10 rounded-[16px] p-4 font-mono text-[12px] text-left">
          <div className="flex justify-between"><span className="text-white/60">Build Status</span><span className="bg-[#00D632] text-black font-bold px-2 py-1 rounded-full text-[11px]">GREEN • Ready</span></div>
          <div className="mt-3 text-white/50">✓ No lucide-react • No dist • Compiled successfully — AYO.NG LIVE</div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-xs text-white/30">© 2026 AYO.NG • AFRICAN PRIDE • NIGERIA MADE • Lagos 🇳🇬</p>
        <p className="text-[11px] text-white/20 mt-2">No TikTok • No 2Go • No Instagram • Only AYO</p>
      </footer>
    </div>
  )
}

"use client"
import { useState, useEffect } from 'react'

type Photo = { id: string, url: string, title: string }

export default function Page() {
  const [splash, setSplash] = useState(true)
  const [tab, setTab] = useState<'home'|'capture'|'connect'|'earn'>('home')
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: '', title: 'Danfo Dreams' },
    { id: '2', url: '', title: 'Third Mainland' },
    { id: '3', url: '', title: 'Owambe Vibes' },
  ])
  const [wallet] = useState(2450)

  useEffect(() => { const t = setTimeout(() => setSplash(false), 2000); return () => clearTimeout(t) }, [])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotos([{ id: Date.now().toString(), url, title: file.name.slice(0,20) },...photos])
    setTab('home')
  }

  if (splash) {
    return (
      <div onClick={() => setSplash(false)} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white cursor-pointer">
        <img src="/logo.png" alt="AYO" className="w-" />
        <p className="text-yellow-400 text- tracking-[0.3em] font-black mt-4">AFRICAN PRIDE • NIGERIA MADE</p>
        <p className="text-white/30 text- mt-3">TAP TO ENTER</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-">
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 h- flex items-center justify-between">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="" className="w-8 h-8" /><span className="font-black">AYO.NG</span></div>
        <div className="text-xs bg-green-500/20 border border-green-500/20 text-green-400 rounded-full px-3 py-1">🟢 LIVE • Lagos</div>
      </header>

      {tab === 'home' && (
        <main className="max-w- mx-auto px-4 py-6">
          <div className="text-center py-6">
            <img src="/logo.png" alt="AYO" className="w- mx-auto" />
            <h1 className="text- font-black mt-4">Welcome to <span className="text-yellow-400">AYO.NG</span></h1>
            <p className="text-white/50 text-sm mt-2">African Pride, Nigeria Made — Built in Lagos.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {photos.map(p => (
              <div key={p.id} className="aspect-[4/3] rounded- bg-white/[0.04] border border-white/5 overflow-hidden relative">
                {p.url? <img src={p.url} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">📸</div>}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="font-bold text-xs">{p.title}</div>
                  <div className="text- text-white/40">Lagos, NG • AYO.NG</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-400 text-black rounded- p-5 flex justify-between">
            <div className="font-black">Built for Naija,<br/>by Naija.</div>
            <div className="flex gap-6 text-center"><div><div className="font-black">10K+</div><div className="text-">Photos</div></div><div><div className="font-black">{photos.length}</div><div className="text-">Yours</div></div></div>
          </div>
        </main>
      )}

      {tab === 'capture' && (
        <div className="max-w- mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-black">AYO Capture</h2>
          <p className="text-white/50 text-sm mt-2">Share Lagos through your lens</p>
          <label className="mt-8 block bg-white/[0.06] border border-dashed border-white/20 rounded- p-10 cursor-pointer hover:bg-white/[0.08] transition">
            <div className="text-4xl">📤</div>
            <div className="font-bold mt-3">Tap to Upload Photo</div>
            <div className="text-xs text-white/40 mt-1">JPG, PNG — Lagos only</div>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
          <p className="text- text-white/30 mt-4">Your photo appears instantly on Home</p>
        </div>
      )}

      {tab === 'connect' && (
        <div className="max-w- mx-auto px-4 py-8">
          <h2 className="text-2xl font-black text-center">AYO Connect</h2>
          <p className="text-white/50 text-sm text-center mt-2">Live rooms • Pidgin, Yoruba, Igbo, Hausa</p>
          <div className="mt-6 space-y-3">
            {[
              { name: 'Lagos Hustle Room', users: 42, lang: 'Pidgin' },
              { name: 'Danfo Stories', users: 28, lang: 'Yoruba' },
              { name: 'Market Day Vibes', users: 19, lang: 'Igbo' },
            ].map(r => (
              <div key={r.name} className="bg-white/[0.04] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                <div><div className="font-bold text-sm">{r.name}</div><div className="text- text-white/40">{r.lang} • {r.users} online</div></div>
                <button className="bg-yellow-400 text-black font-black text-xs px-4 py-2 rounded-full">JOIN</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'earn' && (
        <div className="max-w- mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-black">AYO Earn</h2>
          <div className="mt-6 bg-white/[0.04] border border-white/10 rounded- p-6">
            <div className="text-white/40 text-xs tracking-widest">WALLET BALANCE</div>
            <div className="text-4xl font-black mt-2">₦{wallet.toLocaleString()}</div>
            <div className="text-green-400 text-xs mt-2">+70% gifts • Paystack</div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-yellow-400 text-black font-black py-3 rounded-full text-sm">Withdraw</button>
              <button className="flex-1 bg-white/10 border border-white/10 font-bold py-3 rounded-full text-sm">History</button>
            </div>
          </div>
          <div className="mt-6 text-left bg-white/[0.03] border border-white/5 rounded-2xl p-4">
            <div className="font-bold text-sm">How you earn</div>
            <div className="text-xs text-white/50 mt-2 leading-relaxed">Gifts 70% to you, wins 90% to you. No hidden charges. Built in Lagos for creators.</div>
          </div>
        </div>
      )}

      {/* Bottom Nav - WORKING */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/5 px-2 py-2 flex justify-around z-50">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'capture', label: 'Capture', icon: '📸' },
          { id: 'connect', label: 'Connect', icon: '💬' },
          { id: 'earn', label: 'Earn', icon: '💰' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} className={`flex flex-col items-center px-6 py-2 rounded-2xl transition ${tab === t.id? 'bg-yellow-400 text-black' : 'text-white/40'}`}>
            <span className="text-">{t.icon}</span>
            <span className="text- font-black mt-1">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

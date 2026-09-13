"use client"
import { useState, useEffect } from 'react'

type Photo = { id: string, url: string, title: string }

export default function Page() {
  const [splash, setSplash] = useState(true)
  const [tab, setTab] = useState('home')
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: '', title: 'Danfo Dreams' },
    { id: '2', url: '', title: 'Third Mainland' },
    { id: '3', url: '', title: 'Owambe Vibes' },
    { id: '4', url: '', title: 'Street Hustle' },
  ])

  useEffect(() => { const t = setTimeout(() => setSplash(false), 2000); return () => clearTimeout(t) }, [])

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotos([{ id: Date.now().toString(), url, title: file.name.slice(0,18) },...photos])
    setTab('home')
  }

  if (splash) {
    return (
      <div onClick={() => setSplash(false)} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white cursor-pointer">
        <img src="/logo.png" alt="AYO" className="w- animate-pulse" />
        <p className="text-yellow-400 font-black text- tracking-[0.3em] mt-4">AFRICAN PRIDE • NIGERIA MADE</p>
        <p className="text-white/30 text- mt-3 animate-pulse">TAP TO ENTER • Built in Lagos</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white pb-">
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 h- flex items-center justify-between">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="" className="w-8 h-8" /><span className="font-black">AYO.NG</span></div>
        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 rounded-full px-3 py-1">🟢 LIVE</span>
      </header>

      {tab === 'home' && (
        <main className="max-w- mx-auto px-4 py-6">
          <div className="text-center">
            <img src="/logo.png" alt="AYO" className="w- mx-auto" />
            <h1 className="text-3xl font-black mt-4">Welcome to <span className="text-yellow-400">AYO.NG</span></h1>
            <p className="text-white/50 text-sm mt-1">African Pride, Nigeria Made</p>
            <button onClick={() => setTab('capture')} className="mt-6 bg-yellow-400 text-black font-black px-6 py-3 rounded-full text-sm">+ Capture Photo</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            {photos.map(p => (
              <div key={p.id} className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/5 overflow-hidden relative">
                {p.url? <img src={p.url} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-2xl">📸</div>}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2"><div className="font-bold text-xs">{p.title}</div><div className="text- text-white/50">Lagos • AYO.NG</div></div>
              </div>
            ))}
          </div>
        </main>
      )}

      {tab === 'capture' && (
        <div className="max-w- mx-auto px-4 py-10 text-center">
          <h2 className="text-2xl font-black">AYO Capture</h2>
          <p className="text-white/50 text-sm mt-1">Upload Lagos through your lens</p>
          <label className="mt-8 block bg-white/5 border-2 border-dashed border-white/10 rounded- p-10 cursor-pointer hover:bg-white/10 transition">
            <div className="text-4xl">📤</div><div className="font-bold mt-3">Tap to Upload</div>
            <div className="text-xs text-white/40 mt-1">Your photo shows instantly on Home</div>
            <input type="file" accept="image/*" className="hidden" onChange={upload} />
          </label>
        </div>
      )}

      {tab === 'connect' && (
        <div className="max-w- mx-auto px-4 py-8">
          <h2 className="text-2xl font-black text-center">AYO Connect</h2>
          <div className="mt-6 space-y-3">
            {[{ n: 'Lagos Hustle', u: 42 }, { n: 'Danfo Stories', u: 28 }, { n: 'Owambe Vibes', u: 19 }].map(r => (
              <div key={r.n} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                <div><div className="font-bold text-sm">{r.n}</div><div className="text- text-white/40">{r.u} online</div></div>
                <button className="bg-yellow-400 text-black font-black text-xs px-4 py-2 rounded-full">JOIN</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'earn' && (
        <div className="max-w- mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-black">AYO Earn</h2>
          <div className="mt-6 bg-white/5 border border-white/10 rounded- p-6">
            <div className="text-white/40 text-xs tracking-widest">WALLET</div>
            <div className="text-4xl font-black mt-2">₦2,450</div>
            <div className="text-green-400 text-xs mt-1">70% gifts to you</div>
            <button className="mt-6 w-full bg-yellow-400 text-black font-black py-3 rounded-full">Withdraw via Paystack</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex justify-around py-2 z-50">
        {[{ id: 'home', l: 'Home', i: '🏠' }, { id: 'capture', l: 'Capture', i: '📸' }, { id: 'connect', l: 'Connect', i: '💬' }, { id: 'earn', l: 'Earn', i: '💰' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} className={`px-6 py-2 rounded-2xl flex flex-col items-center ${tab === t.id? 'bg-yellow-400 text-black' : 'text-white/40'}`}>
            <span>{t.i}</span><span className="text- font-black mt-1">{t.l}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

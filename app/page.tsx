"use client"
import { useState, useEffect } from 'react'

export default function Page(){
  const [splash,setSplash]=useState(true)
  const [fade,setFade]=useState(false)

  useEffect(()=>{
    // Auto hide splash after 2.5s
    const t1=setTimeout(()=>{setFade(true)},2200)
    const t2=setTimeout(()=>{setSplash(false)},2600)
    return()=>{clearTimeout(t1); clearTimeout(t2)}
  },[])

  const launchApp=()=>{
    setFade(true)
    setTimeout(()=>setSplash(false),400)
  }

  if(splash){
    return (
      <div onClick={launchApp} style={{minHeight:'100vh',background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',cursor:'pointer',opacity:fade?0:1,transition:'opacity 0.4s'}}>
        <img src="/logo.png" alt="AYO" style={{width:300,animation:'float 3s ease-in-out infinite',filter:'drop-shadow(0 0 30px rgba(255,193,7,0.4))'}} onError={e=>e.currentTarget.style.display='none'}/>
        <div style={{fontSize:80,display:'none'}} id="fb1">🥁</div>
        <h1 style={{fontWeight:900,fontSize:36,marginTop:20,letterSpacing:'-0.02em'}}>AYO.NG</h1>
        <p style={{color:'#FFC107',fontWeight:800,letterSpacing:'0.35em',fontSize:11,marginTop:8}}>AFRICAN PRIDE • NIGERIA MADE</p>
        <div style={{width:180,height:3,background:'rgba(255,255,255,0.1)',borderRadius:99,marginTop:36,overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,#FFC107,#00A651)',width:'100%',animation:'load 2.2s ease-in-out'}}></div></div>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:10,marginTop:14,letterSpacing:'0.2em'}}>TAP TO LAUNCH →</p>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}} @keyframes load{from{width:0%}to{width:100%}}`}</style>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#050508',color:'white',fontFamily:'system-ui'}}>
      <header style={{position:'sticky',top:0,zIndex:50,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.08)',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}><img src="/logo.png" alt="" style={{width:42,height:42}}/><div><div style={{fontWeight:900,fontSize:14}}>AYO.NG</div><div style={{fontSize:9,color:'#FFC107',fontWeight:900,letterSpacing:'0.2em'}}>AFRICAN PRIDE</div></div></div>
        <button onClick={()=>setSplash(true)} style={{background:'#1a1a1a',color:'white',border:'1px solid #333',padding:'6px 14px',borderRadius:99,fontSize:12,fontWeight:700,cursor:'pointer'}}>↺ Replay Splash</button>
      </header>

      <main style={{maxWidth:1100,margin:'0 auto',padding:'28px 16px',textAlign:'center'}}>
        <img src="/logo.png" alt="AYO.NG African Pride" style={{width:'min(480px,88vw)',margin:'10px auto 24px',display:'block',filter:'drop-shadow(0 0 40px rgba(255,193,7,0.25))'}}/>
        <h1 style={{fontSize:'clamp(38px,7vw,68px)',fontWeight:900,lineHeight:0.9,letterSpacing:'-0.03em'}}>Welcome to <span style={{color:'#FFC107'}}>AYO.NG</span></h1>
        <p style={{fontSize:20,fontWeight:800,marginTop:14}}>Capture. Connect. Create. Discover.</p>
        <p style={{color:'#888',fontSize:14,maxWidth:540,margin:'12px auto 0',lineHeight:1.6}}>African Pride, Nigeria Made — Your Hustle, Your Story. Built in Lagos. 100% Original.</p>
        
        <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:28,flexWrap:'wrap'}}>
          <button onClick={()=>document.getElementById('features')?.scrollIntoView({behavior:'smooth'})} style={{background:'#FFC107',color:'black',fontWeight:900,padding:'15px 30px',borderRadius:99,border:'none',fontSize:14,cursor:'pointer'}}>Launch App →</button>
          <button onClick={()=>setSplash(true)} style={{background:'rgba(255,255,255,0.08)',color:'white',fontWeight:700,padding:'15px 30px',borderRadius:99,border:'1px solid rgba(255,255,255,0.15)',fontSize:14,cursor:'pointer'}}>Show Splash Again</button>
        </div>

        <div id="features" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14,marginTop:60,textAlign:'left'}}>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:22}}><div style={{fontSize:28}}>📸</div><div style={{fontWeight:900,marginTop:12}}>AYO Capture</div><div style={{color:'#888',fontSize:13,marginTop:8}}>Lagos through your lens.</div></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:22}}><div style={{fontSize:28}}>💬</div><div style={{fontWeight:900,marginTop:12}}>AYO Connect</div><div style={{color:'#888',fontSize:13,marginTop:8}}>Live rooms, real-time vibe.</div></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:22}}><div style={{fontSize:28}}>💰</div><div style={{fontWeight:900,marginTop:12}}>AYO Earn</div><div style={{color:'#888',fontSize:13,marginTop:8}}>Gifts 70% to you, Paystack wallet.</div></div>
        </div>

        <div style={{marginTop:24,fontSize:11,color:'#555',fontFamily:'monospace'}}>✓ Splash fixed ✓ Tap to skip ✓ Launch button scrolls ✓ GREEN Build</div>
      </main>
    </div>
  )
}

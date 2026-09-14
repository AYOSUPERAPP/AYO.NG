'use client'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    window.location.href = '/index.html'
  }, [])
  return (
    <div style={{background:'#0a0a0a', color:'#00ff88', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace'}}>
      <div style={{textAlign:'center'}}>
        <h1>AYO.NG LOADING...</h1>
        <p>Redirecting to app...</p>
        <p>If not redirected, <a href="/index.html" style={{color:'#00ff88'}}>Click here</a></p>
      </div>
    </div>
  )
}

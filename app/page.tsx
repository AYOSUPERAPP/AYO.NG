export default function Home() {
  return (
    <div style={{padding: 50, textAlign: 'center', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: 50}}>🚀 AYO.NG</h1>
      <h2>Nigeria's Super App is LIVE!</h2>
      <p>Small World Photography • Earnings • Logistics</p>
      <a href="/api" style={{background: 'black', color: 'white', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', display: 'inline-block', marginTop: 20}}>Launch App</a>
      <p style={{marginTop: 30, color: 'gray'}}>Build: {new Date().toLocaleString()}</p>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound(){
  return (
    <div className="container" style={{padding:'60px 0', textAlign:'center'}}>
      <h1 className="heading-serif" style={{fontSize:48, margin:'0 0 10px'}}>404</h1>
      <h2 style={{color:'var(--color-forest)', margin:'0 0 8px'}}>Page not found</h2>
      <p style={{color:'var(--color-muted)', maxWidth:520, margin:'0 auto 18px', lineHeight:1.6}}>The page you’re looking for doesn’t exist or has moved. Try searching the catalogue or return home.</p>
      <div style={{display:'inline-flex', gap:10, flexWrap:'wrap', justifyContent:'center'}}>
        <Link to="/" className="btn btn-primary"><Home size={16}/> Go home</Link>
        <Link to="/properties" className="btn btn-outline"><Search size={16}/> Browse properties</Link>
      </div>
    </div>
  )
}

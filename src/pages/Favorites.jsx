import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'

export default function Favorites(){
  const { favorites, clearFavorites } = useFavorites()
  const list = properties.filter(p=> favorites.includes(p.id))

  if (!list.length) {
    return (
      <div className="container" style={{padding:'40px 0', textAlign:'center'}}>
        <Heart size={32} style={{color:'var(--color-border-dark)', margin:'0 auto'}}/>
        <h2 className="heading-serif">No favourites yet</h2>
        <p style={{color:'var(--color-muted)'}}>Save properties you love — tap the heart on any listing to keep it here for later.</p>
        <Link to="/properties" className="btn btn-primary">Browse properties</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{padding:'28px 0'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
        <div>
          <div className="eyebrow">SAVED · {list.length} {list.length===1?'PROPERTY':'PROPERTIES'}</div>
          <h1 className="heading-serif">Your favourites</h1>
        </div>
        <button className="btn btn-outline btn-sm" onClick={clearFavorites}>Clear all</button>
      </div>
      <div style={{marginTop:16}}><PropertyGrid properties={list} /></div>
    </div>
  )
}

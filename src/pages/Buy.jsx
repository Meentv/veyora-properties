import { properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'
import { Link } from 'react-router-dom'

export default function Buy(){
  const sale = properties.filter(p=>p.listingType==='sale')
  return (
    <div className="buy-page">
      <div className="container">
        <div className="buy-head">
          <div className="eyebrow">FOR SALE · {sale.length} {sale.length===1?'PROPERTY':'PROPERTIES'}</div>
          <h1 className="heading-serif">Buy your next home</h1>
          <p>A curated selection of homes for purchase — from family villas to city penthouses and lakeside retreats. Enquire directly to arrange a private viewing.</p>
        </div>

        <div className="buy-grid-wrap">
          <PropertyGrid properties={sale} />
        </div>

        <div className="buy-cta">
          <Link to="/properties" className="btn btn-outline">View all {properties.length} properties</Link>
          <Link to="/contact" className="btn btn-primary">Arrange a viewing</Link>
        </div>
      </div>

      <style>{`
        .buy-page { padding: clamp(20px, 4vw, 36px) 0; }
        .buy-head { max-width: 720px; margin: 0 0 18px; }
        .buy-head h1 { margin: 6px 0 10px; font-size: clamp(26px, 5vw, 36px); line-height: 1.1; }
        .buy-head p { color: var(--color-muted); font-size: clamp(13px, 2.5vw, 15px); line-height: 1.6; margin: 0; max-width: 640px; }
        .buy-grid-wrap { margin-top: 20px; }
        .buy-cta { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top: 28px; }
        @media(max-width: 640px){
          .buy-head { margin-bottom: 14px; }
          .buy-cta { flex-direction: column; align-items: stretch; }
          .buy-cta .btn { width: 100%; text-align:center; }
        }
      `}</style>
    </div>
  )
}

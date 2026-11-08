import { properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'
import { Link } from 'react-router-dom'

export default function Buy(){
  const sale = properties.filter(p=>p.listingType==='sale')
  return (
    <div className="container" style={{padding:'28px 0'}}>
      <div className="eyebrow">FOR SALE · {sale.length} PROPERTIES</div>
      <h1 className="heading-serif">Buy your next home</h1>
      <p style={{color:'var(--color-muted)', maxWidth:640, fontSize:14, lineHeight:1.6}}>A curated selection of homes for purchase — from family villas to city penthouses and lakeside retreats. Enquire directly to arrange a viewing.</p>
      <div style={{marginTop:18}}><PropertyGrid properties={sale} /></div>
      <div style={{marginTop:20, textAlign:'center'}}><Link to="/properties" className="btn btn-outline">View all properties</Link></div>
    </div>
  )
}

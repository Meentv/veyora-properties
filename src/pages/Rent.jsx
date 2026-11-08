import { properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'
import { Link } from 'react-router-dom'

export default function Rent(){
  const rent = properties.filter(p=>p.listingType==='rent')
  return (
    <div className="container" style={{padding:'28px 0'}}>
      <div className="eyebrow">FOR RENT · {rent.length} PROPERTIES</div>
      <h1 className="heading-serif">Rent with confidence</h1>
      <p style={{color:'var(--color-muted)', maxWidth:640, fontSize:14, lineHeight:1.6}}>Handpicked rentals across prime neighbourhoods. Short and long stays, furnished to high standards, with direct landlord and agent enquiry.</p>
      <div style={{marginTop:18}}><PropertyGrid properties={rent} /></div>
      <div style={{marginTop:20, textAlign:'center'}}><Link to="/properties" className="btn btn-outline">View all 20 listings</Link></div>
    </div>
  )
}

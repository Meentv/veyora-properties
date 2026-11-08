import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Heart, Share2, MapPin, BedDouble, Bath, Maximize2, Calendar, Sofa, Check, MessageCircle, Phone, Mail, Scale, Clock, Calculator, Layers, FileText, ShieldCheck, Info } from 'lucide-react'
import { properties, getPropertyById } from '../data/properties'
import { formatPrice } from '../utils/formatPrice'
import { useFavorites } from '../context/FavoritesContext'
import { useCompare } from '../context/CompareContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import PropertyGallery from '../components/PropertyGallery'
import ContactForm from '../components/ContactForm'
import PropertyCard from '../components/PropertyCard'
import { buildWhatsAppLink, buildMailtoLink, buildTelLink } from '../utils/contactLinks'
import { contactConfig } from '../data/contactConfig'

function MortgageCalculator({ price, currency, isRent }) {
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(5.5)
  const [years, setYears] = useState(25)
  if (isRent) {
    const annual = price * 12
    return (
      <div className="calc-card">
        <h4><Calculator size={16}/> Rental calculator</h4>
        <div className="calc-row">
          <span>Monthly rent</span><strong>{formatPrice(price, currency)}/mo</strong>
        </div>
        <div className="calc-row">
          <span>Annual rent</span><strong>{formatPrice(annual, currency)}/yr</strong>
        </div>
        <div className="calc-note"><Info size={12}/> Estimate only. Enquire for lease terms. Displayed in {currency} without conversion.</div>
      </div>
    )
  }
  const principal = price * (1 - down/100)
  const monthlyRate = rate/100/12
  const n = years*12
  const monthly = monthlyRate===0 ? principal/n : principal * monthlyRate * Math.pow(1+monthlyRate,n) / (Math.pow(1+monthlyRate,n)-1)
  return (
    <div className="calc-card">
      <h4><Calculator size={16}/> Mortgage estimator ({currency})</h4>
      <div className="calc-grid">
        <label>
          <span>Price</span>
          <div className="calc-value">{formatPrice(price, currency)}</div>
        </label>
        <label>
          <span>Down payment {down}%</span>
          <input type="range" min={5} max={50} value={down} onChange={e=>setDown(+e.target.value)} />
        </label>
        <label>
          <span>Interest {rate}%</span>
          <input type="range" min={2} max={10} step={0.1} value={rate} onChange={e=>setRate(+e.target.value)} />
        </label>
        <label>
          <span>Term {years} yrs</span>
          <input type="range" min={5} max={35} value={years} onChange={e=>setYears(+e.target.value)} />
        </label>
      </div>
      <div className="calc-result">
        <span>Est. monthly</span>
        <strong>{formatPrice(Math.round(monthly), currency)}/mo</strong>
      </div>
      <div className="calc-note"><Info size={12}/> For information only — not a loan offer. Use a licensed lender for approval. Estimates use the listed {currency} price without conversion.</div>
    </div>
  )
}

export default function PropertyDetails() {
  const { id } = useParams()
  const property = getPropertyById(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isCompared, toggleCompare, canAdd } = useCompare()
  const { addRecent, recent } = useRecentlyViewed()

  useEffect(()=>{ if(property) addRecent(property.id) }, [property?.id])

  if (!property) {
    return (
      <div className="container" style={{padding:'40px 0'}}>
        <h2>Property not found</h2>
        <p>No property matches “{id}”. Please check the reference or browse our collection.</p>
        <Link to="/properties" className="btn btn-primary">Browse properties</Link>
      </div>
    )
  }

  const related = properties.filter(p=>p.id!==property.id && (p.propertyType===property.propertyType || p.location.country===property.location.country)).slice(0,3)
  const recentlyViewedProps = recent.map(rid=> properties.find(p=>p.id===rid)).filter(Boolean).filter(p=>p.id!==property.id).slice(0,4)

  const telLink = buildTelLink()
  const mailLink = buildMailtoLink(property)
  const waLink = buildWhatsAppLink(property)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: property.title, text: `${property.title} — ${property.location.city}`, url })} catch {}
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  const isRent = property.listingType==='rent'

  return (
    <div className="details-page">
      <div className="container">
        <Link to="/properties" className="back-link"><ArrowLeft size={14}/> Back to properties</Link>

        <div className="details-head">
          <div>
            <div className="eyebrow">{property.location.country} · {property.location.city}</div>
            <h1 className="heading-serif">{property.title}</h1>
            <div className="details-meta">
              <span><MapPin size={14}/> {property.location.area}, {property.location.city}</span>
              <span>·</span>
              <span>{property.id}</span>
              <span>·</span>
              <span className={`badge ${property.listingType==='sale'?'badge-sale':'badge-rent'}`}>{property.listingType==='sale'?'For Sale':'For Rent'}</span>
              <span className={`badge ${property.availability==='available'?'badge-available':'badge-reserved'}`}>{property.availability}</span>
            </div>
          </div>
          <div className="details-price">
            <div className="price-value">{formatPrice(property.price, property.currency)} {isRent && <span style={{fontSize:13, fontWeight:500, color:'var(--color-muted)'}}>/ month</span>}</div>
            <div className="price-sub">{property.propertyType} · {property.bedrooms} bd · {property.bathrooms} ba · {property.areaSqm} m²</div>
            <div className="price-note"><ShieldCheck size={12}/> Priced in {property.currency}</div>
          </div>
        </div>

        <div className="details-grid">
          <div className="details-main">
            <PropertyGallery images={property.images} title={property.title} />

            <div className="details-specs">
              <div className="spec"><BedDouble size={18}/><strong>{property.bedrooms}</strong><span>Bedrooms</span></div>
              <div className="spec"><Bath size={18}/><strong>{property.bathrooms}</strong><span>Bathrooms</span></div>
              <div className="spec"><Maximize2 size={18}/><strong>{property.areaSqm} m²</strong><span>Floor area</span></div>
              <div className="spec"><Sofa size={18}/><strong style={{textTransform:'capitalize'}}>{property.furnishing}</strong><span>Furnishing</span></div>
              <div className="spec"><Calendar size={18}/><strong>{property.yearBuilt}</strong><span>Year built</span></div>
              <div className="spec"><Clock size={18}/><strong style={{textTransform:'capitalize'}}>{property.availability}</strong><span>Status</span></div>
            </div>

            <div className="details-section">
              <h2 className="heading-serif">About this property</h2>
              <p className="lead">{property.description}</p>
            </div>

            <div className="details-section">
              <h3><FileText size={16} style={{display:'inline', marginRight:6}}/> Property specifications</h3>
              <div className="specs-table">
                <div className="specs-row"><span>Reference</span><strong>{property.id}</strong></div>
                <div className="specs-row"><span>Listing</span><strong style={{textTransform:'capitalize'}}>{property.listingType} · {property.propertyType}</strong></div>
                <div className="specs-row"><span>Location</span><strong>{property.location.area}, {property.location.city}, {property.location.country}</strong></div>
                <div className="specs-row"><span>Bed / Bath / Area</span><strong>{property.bedrooms} bd · {property.bathrooms} ba · {property.areaSqm} m²</strong></div>
                <div className="specs-row"><span>Furnishing</span><strong style={{textTransform:'capitalize'}}>{property.furnishing}</strong></div>
                <div className="specs-row"><span>Year built</span><strong>{property.yearBuilt}</strong></div>
                <div className="specs-row"><span>Availability</span><strong style={{textTransform:'capitalize'}}>{property.availability}</strong></div>
                <div className="specs-row"><span>Price</span><strong>{formatPrice(property.price, property.currency)} {isRent?'/ month':''} — {property.currency}</strong></div>
              </div>
            </div>

            <div className="details-section">
              <h3>Features</h3>
              <ul className="feature-list">
                {property.features.map(f=> <li key={f}><Check size={14}/> {f}</li>)}
              </ul>
            </div>

            <div className="details-section">
              <h3>Amenities</h3>
              <div className="amenity-chips">
                {property.amenities.map(a=> <span key={a} className="chip">{a}</span>)}
              </div>
            </div>

            <div className="details-section">
              <h3><Layers size={16} style={{display:'inline', marginRight:6}}/> Floorplan</h3>
              <div className="floorplan-card">
                <div className="floorplan-visual">
                  <div className="floorplan-grid">
                    <div className="fp-room living"><span>Living</span><small>{Math.round(property.areaSqm*0.35)} m²</small></div>
                    <div className="fp-room kitchen"><span>Kitchen</span><small>{Math.round(property.areaSqm*0.15)} m²</small></div>
                    <div className="fp-room bed1"><span>Primary Suite</span><small>{property.bedrooms} bd total</small></div>
                    <div className="fp-room bath"><span>Baths</span><small>{property.bathrooms} ba</small></div>
                    <div className="fp-room outdoor"><span>Outdoor</span><small>Terrace / Garden</small></div>
                    <div className="fp-room other"><span>Other</span><small>{property.areaSqm} m² total</small></div>
                  </div>
                  <div className="floorplan-note">Illustrative layout — not to scale and not a supplied architectural drawing. Enquire for the full plan.</div>
                </div>
                <div className="floorplan-meta">
                  <div><strong>{property.areaSqm} m²</strong><span>Total area</span></div>
                  <div><strong>{property.bedrooms} / {property.bathrooms}</strong><span>Bed / Bath</span></div>
                  <div><strong>{property.yearBuilt}</strong><span>Built</span></div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Location</h3>
              <div className="location-card">
                <MapPin size={16}/>
                <div>
                  <strong>{property.location.area}</strong><br/>
                  <span>{property.location.city}, {property.location.country}</span><br/>
                  <small>Contact us for the exact address and directions to your viewing.</small>
                </div>
              </div>
            </div>

            <div className="details-section">
              <div className="action-row">
                <button className={`btn ${isFavorite(property.id)?'btn-primary':'btn-outline'}`} onClick={()=>toggleFavorite(property.id)}>
                  <Heart size={16} fill={isFavorite(property.id)?'currentColor':'none'}/> {isFavorite(property.id)?'Saved to favourites':'Save to favourites'}
                </button>
                <button className="btn btn-outline" onClick={handleShare}><Share2 size={16}/> Share</button>
                <button className="btn btn-outline" onClick={()=>toggleCompare(property.id)} disabled={!isCompared(property.id) && !canAdd}>
                  <Scale size={16}/> {isCompared(property.id)?'Remove from compare':'Add to compare'}
                </button>
              </div>
            </div>

            {recentlyViewedProps.length>0 && (
              <div className="details-section">
                <h3>Recently viewed</h3>
                <div className="details-recent-grid">
                  {recentlyViewedProps.map(p=> <PropertyCard key={p.id} property={p}/>)}
                </div>
              </div>
            )}

            <div className="details-section">
              <h3>Related properties</h3>
              <div className="details-related-grid">
                {related.map(p=> <PropertyCard key={p.id} property={p}/>)}
              </div>
            </div>
          </div>

          <aside className="details-side">
            <div className="enquiry-card">
              <h3>Enquire about this home</h3>
              <p>Reference <strong>{property.id}</strong> — {formatPrice(property.price, property.currency)} {isRent?'/mo':''} · {property.location.city}</p>
              <div className="enquiry-actions">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%'}}><MessageCircle size={16}/> WhatsApp enquiry</a>
                {telLink && <a href={telLink} className="btn btn-outline" style={{width:'100%'}}><Phone size={16}/> Call {contactConfig.phoneDisplay}</a>}
                {mailLink && <a href={mailLink} className="btn btn-outline" style={{width:'100%'}}><Mail size={16}/> Email enquiry</a>}
              </div>
            </div>

            <MortgageCalculator price={property.price} currency={property.currency} isRent={isRent} />

            <ContactForm property={property} />
          </aside>
        </div>
      </div>

      <style>{`
        .details-page { padding: clamp(12px, 3vw, 18px) 0 clamp(20px, 4vw, 32px); overflow-x: hidden; }
        .back-link { display:inline-flex; gap:6px; align-items:center; font-size:13px; color: var(--color-muted); margin-bottom:12px; min-height: 44px; }
        .back-link:hover { color: var(--color-forest); }
        .details-head { display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; align-items:flex-end; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid var(--color-border); }
        .details-head h1 { margin:6px 0 8px; font-size: clamp(22px, 5vw, 28px); line-height:1.15; overflow-wrap: break-word; word-break: break-word; }
        .details-meta { display:flex; gap:8px; flex-wrap:wrap; align-items:center; font-size:13px; color: var(--color-muted); line-height: 1.4; }
        .details-price { text-align:right; min-width: 0; }
        .price-value { font-family: var(--font-serif); font-weight:700; font-size: clamp(20px, 4vw, 26px); color: var(--color-forest); overflow-wrap: break-word; }
        .price-sub { font-size:12px; color: var(--color-muted); text-transform:capitalize; }
        .price-note { font-size:11px; color: var(--color-gold-dark); display:flex; gap:6px; align-items:center; justify-content:flex-end; margin-top:6px; font-weight:600; flex-wrap: wrap; }
        @media(max-width:768px){
          .details-head { flex-direction: column; align-items: flex-start; gap: 12px; }
          .details-price{ text-align:left; width: 100%; }
          .price-note{ justify-content:flex-start; }
          .details-page { padding: 12px 0 24px; }
        }

        .details-grid { display: grid; gap: 20px; }
        @media(min-width: 980px){ .details-grid { grid-template-columns: 1.65fr 0.85fr; gap: 32px; } }
        .details-main { min-width: 0; overflow: hidden; }

        .details-specs { display:grid; grid-template-columns: repeat(2,1fr); gap:10px; margin:14px 0; }
        @media(min-width: 480px){ .details-specs{ grid-template-columns: repeat(3,1fr);} }
        @media(max-width: 360px){ .details-specs{ grid-template-columns: 1fr; } }
        .spec { background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:4px; align-items:flex-start; min-width: 0; }
        .spec strong { font-size: clamp(14px, 3vw, 16px); color: var(--color-forest); }
        .spec span { font-size:11px; letter-spacing:.06em; text-transform:uppercase; color: var(--color-muted); font-weight:600; }
        .spec svg { color: var(--color-gold); flex-shrink: 0; }

        .details-section { margin-top: clamp(16px, 3vw, 18px); min-width: 0; }
        .details-section h2, .details-section h3 { color: var(--color-forest); margin:0 0 10px; overflow-wrap: break-word; }
        .details-section h2 { font-size: clamp(18px, 3.5vw, 20px); }
        .details-section h3 { font-size: clamp(14px, 3vw, 15px); display:flex; align-items:center; gap: 6px; flex-wrap: wrap; }
        .lead { color: var(--color-charcoal); line-height:1.7; font-size:14px; overflow-wrap: break-word; }

        .specs-table { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background: white; overflow-x: auto; }
        .specs-row { display:flex; justify-content:space-between; gap:12px; padding:10px 14px; border-bottom:1px solid var(--color-border); font-size:13px; flex-wrap: wrap; }
        .specs-row:last-child { border:none; }
        .specs-row span { color: var(--color-muted); flex-shrink: 0; }
        .specs-row strong { color: var(--color-forest); text-align:right; overflow-wrap: break-word; word-break: break-word; min-width: 0; }
        @media(max-width: 480px){ .specs-row { flex-direction: column; gap: 4px; } .specs-row strong { text-align: left; } }

        .feature-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
        .feature-list li { display:flex; gap:8px; align-items: flex-start; font-size:14px; color: var(--color-charcoal); line-height: 1.5; }
        .feature-list li span { flex: 1; }
        .feature-list svg { color: var(--color-success); flex:none; margin-top: 2px; }
        .amenity-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .amenity-chips .chip { background: var(--color-ivory); border:1px solid var(--color-border); padding:7px 12px; border-radius:999px; font-size:13px; max-width: 100%; overflow-wrap: break-word; }

        .floorplan-card { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background: white; }
        .floorplan-visual { padding: clamp(12px, 3vw, 16px); background: var(--color-ivory); }
        .floorplan-grid { display:grid; grid-template-columns: 1.6fr 1fr; gap:8px; }
        @media(max-width: 520px){ .floorplan-grid { grid-template-columns: 1fr; } }
        .fp-room { background: white; border:1px solid var(--color-border); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:4px; min-height:68px; min-width: 0; }
        .fp-room.living { grid-row: span 1; background: var(--color-forest); color: white; border-color: var(--color-forest); }
        .fp-room.living span, .fp-room.living small { color: white; }
        .fp-room span { font-weight:600; font-size:13px; color: var(--color-forest); }
        .fp-room small { font-size:11px; color: var(--color-muted); }
        .floorplan-note { font-size:11px; color: var(--color-muted); text-align:center; margin-top:10px; line-height: 1.4; padding: 0 4px; }
        .floorplan-meta { display:grid; grid-template-columns: repeat(3,1fr); gap:8px; padding:12px 12px; text-align:center; }
        @media(max-width: 400px){ .floorplan-meta { grid-template-columns: 1fr; gap: 10px; } }
        .floorplan-meta strong { display:block; color: var(--color-forest); font-size: clamp(13px, 3vw, 15px); }
        .floorplan-meta span { font-size:11px; color: var(--color-muted); text-transform:uppercase; letter-spacing:.06em; font-weight:600; }

        .location-card { display:flex; gap:12px; background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:14px; font-size:13px; align-items: flex-start; min-width: 0; }
        .location-card svg { flex-shrink: 0; margin-top: 2px; }
        .location-card small { color: var(--color-muted); line-height:1.5; display: block; margin-top: 4px; }
        .location-card > div { min-width: 0; overflow-wrap: break-word; }
        .action-row { display:flex; gap:8px; flex-wrap:wrap; }
        .action-row .btn { flex: 1; min-width: 140px; min-height: 44px; justify-content: center; }
        @media(max-width: 480px){ .action-row { flex-direction: column; } .action-row .btn { width: 100%; } }

        .details-related-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media(min-width: 360px){ .details-related-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        @media(min-width: 640px){ .details-related-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
        .details-recent-grid { display: grid; gap: 12px; grid-template-columns: 1fr; }
        @media(min-width: 360px){ .details-recent-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(min-width: 768px){ .details-recent-grid { grid-template-columns: repeat(3, 1fr); } }

        .enquiry-card { background: var(--color-white); border:1px solid var(--color-border); border-radius: var(--radius-lg); padding:16px; position:sticky; top:84px; min-width: 0; }
        .enquiry-card h3 { margin:0 0 6px; font-family: var(--font-serif); color: var(--color-forest); font-size: clamp(16px, 3vw, 18px); }
        .enquiry-card p { font-size:13px; color: var(--color-muted); line-height:1.5; overflow-wrap: break-word; }
        .enquiry-actions { display:flex; flex-direction:column; gap:8px; margin-top:12px; }
        .enquiry-actions .btn { min-height: 44px; width: 100%; justify-content: center; }
        .details-side { display:flex; flex-direction:column; gap:16px; min-width: 0; }
        @media(max-width: 980px){ .enquiry-card{ position:static; } .details-side { gap: 20px; } }

        .calc-card { min-width: 0; overflow: hidden; }
        .calc-grid { gap: 12px; }
        @media(max-width: 400px){ .calc-grid { gap: 10px; } }
      `}</style>
    </div>
  )
}

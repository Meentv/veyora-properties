import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Heart, Share2, MapPin, BedDouble, Bath, Maximize2, Calendar, Sofa, Check, MessageCircle, Phone, Mail, Scale, Clock, Calculator, Video, Layers, FileText, ShieldCheck, Info } from 'lucide-react'
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

function MortgageCalculator({ price, isRent }) {
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(5.5)
  const [years, setYears] = useState(25)
  if (isRent) {
    const annual = price * 12
    return (
      <div className="calc-card">
        <h4><Calculator size={16}/> Rental calculator</h4>
        <div className="calc-row">
          <span>Monthly rent</span><strong>{formatPrice(price, 'USD')}/mo</strong>
        </div>
        <div className="calc-row">
          <span>Annual rent</span><strong>{formatPrice(annual, 'USD')}/yr</strong>
        </div>
        <div className="calc-note"><Info size={12}/> Estimate only — no payment collected. Enquire for lease terms.</div>
      </div>
    )
  }
  const principal = price * (1 - down/100)
  const monthlyRate = rate/100/12
  const n = years*12
  const monthly = monthlyRate===0 ? principal/n : principal * monthlyRate * Math.pow(1+monthlyRate,n) / (Math.pow(1+monthlyRate,n)-1)
  return (
    <div className="calc-card">
      <h4><Calculator size={16}/> Mortgage estimator (USD)</h4>
      <div className="calc-grid">
        <label>
          <span>Price</span>
          <div className="calc-value">{formatPrice(price, 'USD')}</div>
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
        <strong>{formatPrice(Math.round(monthly), 'USD')}/mo</strong>
      </div>
      <div className="calc-note"><Info size={12}/> Informational only — not a loan offer. No checkout or payment on VEYORA. Use real lender for approval.</div>
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
        <p>No property matches “{id}”. Check the reference ID or browse the catalogue.</p>
        <Link to="/properties" className="btn btn-primary">Back to properties</Link>
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
        <Link to="/properties" className="back-link"><ArrowLeft size={14}/> Back to catalogue</Link>

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
            <div className="price-note"><ShieldCheck size={12}/> All prices in USD ($)</div>
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
              <div className="sample-notice"><span><strong>Sample listing:</strong> This description and imagery are for demonstration. Not a verified live listing. All prices displayed in USD per your request.</span></div>
            </div>

            {/* Rich specs table */}
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
                <div className="specs-row"><span>Price</span><strong>{formatPrice(property.price, 'USD')} {isRent?'/ month':''} — USD</strong></div>
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

            {/* Floorplan */}
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
                  <div className="floorplan-note">Illustrative — not to scale. Exact plan available on request via enquiry.</div>
                </div>
                <div className="floorplan-meta">
                  <div><strong>{property.areaSqm} m²</strong><span>Total area</span></div>
                  <div><strong>{property.bedrooms} / {property.bathrooms}</strong><span>Bed / Bath</span></div>
                  <div><strong>{property.yearBuilt}</strong><span>Built</span></div>
                </div>
              </div>
            </div>

            {/* Virtual tour */}
            <div className="details-section">
              <h3><Video size={16} style={{display:'inline', marginRight:6}}/> Virtual tour</h3>
              <div className="tour-card">
                <div className="tour-placeholder">
                  <Video size={28}/>
                  <strong>Virtual tour ready on request</strong>
                  <span>360° walkthrough + video tour available via WhatsApp or viewing. No booking payment — just enquire.</span>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Request tour link</a>
                </div>
                <div className="tour-meta">
                  <span><ShieldCheck size={12}/> No payment needed</span>
                  <span>•</span>
                  <span>Guided by VEYORA team</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Location</h3>
              {contactConfig.mapEnabled ? (
                <div className="map-placeholder">Map would appear here via {contactConfig.mapProvider}</div>
              ) : (
                <div className="location-card">
                  <MapPin size={16}/>
                  <div>
                    <strong>{property.location.area}</strong><br/>
                    <span>{property.location.city}, {property.location.country}</span><br/>
                    <small>Exact pin hidden — location summary only until a map provider is configured. Configure <code>contactConfig.mapEmbedUrl</code> to enable maps.</small>
                  </div>
                </div>
              )}
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
                <div className="properties-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(180px,1fr))'}}>
                  {recentlyViewedProps.map(p=> <PropertyCard key={p.id} property={p}/>)}
                </div>
              </div>
            )}

            <div className="details-section">
              <h3>Related properties</h3>
              <div className="properties-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))'}}>
                {related.map(p=> <PropertyCard key={p.id} property={p}/>)}
              </div>
            </div>
          </div>

          <aside className="details-side">
            <div className="enquiry-card">
              <h3>Enquire about this home</h3>
              <p>Reference <strong>{property.id}</strong> — {formatPrice(property.price, 'USD')} {isRent?'/mo':''} · {property.location.city}. Our team will respond about availability, viewings and next steps.</p>
              <div className="enquiry-actions">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%'}}><MessageCircle size={16}/> WhatsApp enquiry</a>
                {telLink ? <a href={telLink} className="btn btn-outline" style={{width:'100%'}}><Phone size={16}/> Call {contactConfig.phoneDisplay}</a> : <div className="placeholder-line"><Phone size={14}/> Phone not configured — see contact settings</div>}
                {mailLink ? <a href={mailLink} className="btn btn-outline" style={{width:'100%'}}><Mail size={16}/> Email enquiry</a> : <div className="placeholder-line"><Mail size={14}/> Email not configured — see contact settings</div>}
              </div>
              <div className="sample-notice" style={{marginTop:12, fontSize:12}}><strong>No payments:</strong> VEYORA never collects payment on this site. Enquiries only. All prices in USD ($).</div>
            </div>

            <MortgageCalculator price={property.price} isRent={isRent} />

            <ContactForm property={property} />
          </aside>
        </div>
      </div>

      <style>{`
        .details-page { padding: 18px 0 32px; }
        .back-link { display:inline-flex; gap:6px; align-items:center; font-size:13px; color: var(--color-muted); margin-bottom:12px; }
        .back-link:hover { color: var(--color-forest); }
        .details-head { display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; align-items:flex-end; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid var(--color-border); }
        .details-head h1 { margin:6px 0 8px; font-size:28px; line-height:1.1; }
        .details-meta { display:flex; gap:8px; flex-wrap:wrap; align-items:center; font-size:13px; color: var(--color-muted); }
        .details-price { text-align:right; }
        .price-value { font-family: var(--font-serif); font-weight:700; font-size:26px; color: var(--color-forest); }
        .price-sub { font-size:12px; color: var(--color-muted); text-transform:capitalize; }
        .price-note { font-size:11px; color: var(--color-gold-dark); display:flex; gap:6px; align-items:center; justify-content:flex-end; margin-top:6px; font-weight:600; }
        @media(max-width:700px){ .details-price{ text-align:left; } .price-note{ justify-content:flex-start; } }

        .details-specs { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; margin:14px 0; }
        @media(max-width:600px){ .details-specs{ grid-template-columns: repeat(2,1fr);} }
        .spec { background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:4px; align-items:flex-start; }
        .spec strong { font-size:16px; color: var(--color-forest); }
        .spec span { font-size:11px; letter-spacing:.06em; text-transform:uppercase; color: var(--color-muted); font-weight:600; }
        .spec svg { color: var(--color-gold); }

        .details-section { margin-top:18px; }
        .details-section h2, .details-section h3 { color: var(--color-forest); margin:0 0 10px; }
        .details-section h2 { font-size:20px; }
        .details-section h3 { font-size:15px; display:flex; align-items:center; }
        .lead { color: var(--color-charcoal); line-height:1.7; font-size:14px; }

        .specs-table { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background: white; }
        .specs-row { display:flex; justify-content:space-between; gap:12px; padding:10px 14px; border-bottom:1px solid var(--color-border); font-size:13px; }
        .specs-row:last-child { border:none; }
        .specs-row span { color: var(--color-muted); }
        .specs-row strong { color: var(--color-forest); text-align:right; }

        .feature-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
        .feature-list li { display:flex; gap:8px; align-items:center; font-size:14px; color: var(--color-charcoal); }
        .feature-list svg { color: var(--color-success); flex:none; }
        .amenity-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .amenity-chips .chip { background: var(--color-ivory); border:1px solid var(--color-border); padding:7px 12px; border-radius:999px; font-size:13px; }

        .floorplan-card { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background: white; }
        .floorplan-visual { padding:16px; background: var(--color-ivory); }
        .floorplan-grid { display:grid; grid-template-columns: 1.6fr 1fr; gap:8px; }
        .fp-room { background: white; border:1px solid var(--color-border); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:4px; min-height:68px; }
        .fp-room.living { grid-row: span 1; background: var(--color-forest); color: white; border-color: var(--color-forest); }
        .fp-room.living span, .fp-room.living small { color: white; }
        .fp-room span { font-weight:600; font-size:13px; color: var(--color-forest); }
        .fp-room small { font-size:11px; color: var(--color-muted); }
        .floorplan-note { font-size:11px; color: var(--color-muted); text-align:center; margin-top:10px; }
        .floorplan-meta { display:grid; grid-template-columns: repeat(3,1fr); gap:12px; padding:12px 16px; text-align:center; }
        .floorplan-meta strong { display:block; color: var(--color-forest); font-size:15px; }
        .floorplan-meta span { font-size:11px; color: var(--color-muted); text-transform:uppercase; letter-spacing:.06em; font-weight:600; }

        .tour-card { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background: white; }
        .tour-placeholder { background: linear-gradient(135deg, var(--color-forest) 0%, #243f3f 100%); color: white; padding:28px 20px; text-align:center; display:flex; flex-direction:column; gap:10px; align-items:center; }
        .tour-placeholder strong { font-family: var(--font-serif); font-size:16px; }
        .tour-placeholder span { font-size:12px; color: #c9d6d4; max-width:360px; line-height:1.5; }
        .tour-meta { display:flex; gap:8px; justify-content:center; align-items:center; padding:8px 12px; background: var(--color-ivory); font-size:11px; color: var(--color-muted); font-weight:600; }

        .calc-card { background: var(--color-white); border:1px solid var(--color-border); border-radius: var(--radius-lg); padding:16px; }
        .calc-card h4 { margin:0 0 12px; font-size:14px; color: var(--color-forest); display:flex; gap:8px; align-items:center; }
        .calc-grid { display:grid; gap:12px; }
        .calc-grid span { font-size:12px; color: var(--color-muted); font-weight:600; }
        .calc-value { font-weight:700; color: var(--color-forest); font-size:14px; }
        .calc-grid input[type=range] { width:100%; accent-color: var(--color-forest); }
        .calc-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px; }
        .calc-result { display:flex; justify-content:space-between; align-items:center; background: var(--color-forest); color: white; padding:12px 14px; border-radius:10px; margin-top:12px; }
        .calc-result span { font-size:12px; opacity:.8; }
        .calc-result strong { font-size:16px; }
        .calc-note { font-size:11px; color: var(--color-muted); display:flex; gap:6px; align-items:center; margin-top:8px; line-height:1.4; }

        .location-card { display:flex; gap:12px; background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:14px; font-size:13px; }
        .location-card small { color: var(--color-muted); line-height:1.5; }
        .action-row { display:flex; gap:8px; flex-wrap:wrap; }
        .enquiry-card { background: var(--color-white); border:1px solid var(--color-border); border-radius: var(--radius-lg); padding:16px; position:sticky; top:84px; }
        .enquiry-card h3 { margin:0 0 6px; font-family: var(--font-serif); color: var(--color-forest); }
        .enquiry-card p { font-size:13px; color: var(--color-muted); line-height:1.5; }
        .enquiry-actions { display:flex; flex-direction:column; gap:8px; margin-top:12px; }
        .placeholder-line { font-size:12px; color: var(--color-muted); display:flex; gap:6px; align-items:center; background: var(--color-ivory); border:1px dashed var(--color-border); padding:8px 10px; border-radius:8px; }
        .details-side { display:flex; flex-direction:column; gap:16px; }
      `}</style>
    </div>
  )
}

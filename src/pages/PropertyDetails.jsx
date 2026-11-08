import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, Heart, Share2, MapPin, BedDouble, Bath, Maximize2, Calendar, Sofa, Check, MessageCircle, Phone, Mail, Scale, Clock } from 'lucide-react'
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
            <div className="price-value">{formatPrice(property.price, property.currency)}</div>
            <div className="price-sub">{property.propertyType} · {property.bedrooms} bd · {property.bathrooms} ba · {property.areaSqm} m²</div>
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
              <div className="sample-notice"><span><strong>Sample listing:</strong> This description and imagery are for demonstration. Not a verified live listing.</span></div>
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
              <p>Reference <strong>{property.id}</strong> — our team will respond about availability, viewings and next steps.</p>
              <div className="enquiry-actions">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%'}}><MessageCircle size={16}/> WhatsApp enquiry</a>
                {telLink ? <a href={telLink} className="btn btn-outline" style={{width:'100%'}}><Phone size={16}/> Call {contactConfig.phoneDisplay}</a> : <div className="placeholder-line"><Phone size={14}/> Phone not configured — see contact settings</div>}
                {mailLink ? <a href={mailLink} className="btn btn-outline" style={{width:'100%'}}><Mail size={16}/> Email enquiry</a> : <div className="placeholder-line"><Mail size={14}/> Email not configured — see contact settings</div>}
              </div>
              <div className="sample-notice" style={{marginTop:12, fontSize:12}}><strong>No payments:</strong> VEYORA never collects payment on this site. Enquiries only.</div>
            </div>

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
        @media(max-width:700px){ .details-price{ text-align:left; } }

        .details-specs { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; margin:14px 0; }
        @media(max-width:600px){ .details-specs{ grid-template-columns: repeat(2,1fr);} }
        .spec { background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:4px; align-items:flex-start; }
        .spec strong { font-size:16px; color: var(--color-forest); }
        .spec span { font-size:11px; letter-spacing:.06em; text-transform:uppercase; color: var(--color-muted); font-weight:600; }
        .spec svg { color: var(--color-gold); }

        .details-section { margin-top:18px; }
        .details-section h2, .details-section h3 { color: var(--color-forest); margin:0 0 10px; }
        .details-section h2 { font-size:20px; }
        .details-section h3 { font-size:15px; }
        .lead { color: var(--color-charcoal); line-height:1.7; font-size:14px; }
        .feature-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
        .feature-list li { display:flex; gap:8px; align-items:center; font-size:14px; color: var(--color-charcoal); }
        .feature-list svg { color: var(--color-success); flex:none; }
        .amenity-chips { display:flex; flex-wrap:wrap; gap:8px; }
        .amenity-chips .chip { background: var(--color-ivory); border:1px solid var(--color-border); padding:7px 12px; border-radius:999px; font-size:13px; }
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

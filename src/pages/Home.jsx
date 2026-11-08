import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Globe, Award, Search, Building2, Home as HomeIcon, Landmark, Waves, Store } from 'lucide-react'
import { properties, getFeatured, getPropertyById } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { formatPrice } from '../utils/formatPrice'

export default function Home() {
  const featured = getFeatured()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSearch = (val) => {
    setQ(val)
  }
  const submitSearch = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/properties?search=${encodeURIComponent(q.trim())}`)
  }

  const heroProperty = getPropertyById('VEY-001')

  const categories = [
    { icon: Building2, label:'Apartments', type:'apartment', count: properties.filter(p=>p.propertyType==='apartment').length },
    { icon: HomeIcon, label:'Villas', type:'villa', count: properties.filter(p=>p.propertyType==='villa').length },
    { icon: Landmark, label:'Townhouses', type:'townhouse', count: properties.filter(p=>p.propertyType==='townhouse').length },
    { icon: Waves, label:'Penthouses', type:'penthouse', count: properties.filter(p=>p.propertyType==='penthouse').length },
    { icon: Store, label:'Commercial', type:'commercial', count: properties.filter(p=>p.propertyType==='commercial').length },
    { icon: HomeIcon, label:'Detached', type:'detached', count: properties.filter(p=>p.propertyType==='detached').length },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">VEYORA PROPERTIES · INTERNATIONAL</div>
            <h1>A better place<br/>to belong.</h1>
            <p>Discover twenty curated homes and investments across Dubai, London, Lagos, New York, Barcelona and beyond. Save favourites, compare, and enquire — no checkout, just calm guidance.</p>

            <form className="hero-search" onSubmit={submitSearch}>
              <SearchBar value={q} onChange={onSearch} placeholder="Search by city, area, title or ID (e.g. Ikoyi, VEY-004)…" />
              <button type="submit" className="btn btn-primary"><Search size={16}/> Search</button>
            </form>

            <div className="hero-meta">
              <span><strong>20</strong> sample listings</span>
              <span>·</span>
              <span>5 currencies</span>
              <span>·</span>
              <span>No payment required</span>
            </div>

            <div className="sample-notice" style={{marginTop:16}}>
              <ShieldCheck size={16} style={{flex:'none', marginTop:2}}/>
              <span><strong>Sample catalogue:</strong> All listings are demonstration content. Configure <code>src/data/properties.js</code> and <code>contactConfig.js</code> with real inventory when ready.</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img src={heroProperty.images[0]} alt={`${heroProperty.title} — featured`} width={640} height={480} onError={e=>e.currentTarget.style.display='none'} />
              <div className="hero-image-overlay">
                <div className="overlay-card">
                  <div className="overlay-eyebrow">Featured — {heroProperty.location.area}</div>
                  <div className="overlay-title">{heroProperty.title}</div>
                  <div className="overlay-price">{formatPrice(heroProperty.price, heroProperty.currency)} · {heroProperty.listingType === 'sale' ? 'For Sale' : 'For Rent'}</div>
                  <Link to={`/properties/${heroProperty.id}`} className="btn btn-white btn-sm">View Details <ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>
            <div className="hero-stats">
              <div><strong>12</strong><span>For Sale</span></div>
              <div><strong>8</strong><span>For Rent</span></div>
              <div><strong>6</strong><span>Countries</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-light">
        <div className="container">
          <div className="section-head">
            <h2 className="heading-serif">Browse by category</h2>
            <Link to="/properties" className="btn btn-outline btn-sm">View all 20 <ArrowRight size={14}/></Link>
          </div>
          <div className="category-grid">
            {categories.map(c => (
              <Link key={c.type} to={`/properties?type=${c.type}`} className="cat-card">
                <c.icon size={22}/>
                <strong>{c.label}</strong>
                <span>{c.count} {c.count===1?'property':'properties'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">CURATED SELECTION</div>
              <h2 className="heading-serif">Featured properties</h2>
            </div>
            <Link to="/properties" className="btn btn-primary btn-sm">Explore catalogue</Link>
          </div>
          <div className="properties-grid">
            {featured.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* WHY VEYORA */}
      <section id="how-it-works" className="section section-dark">
        <div className="container">
          <div className="eyebrow" style={{color:'var(--color-gold-light)'}}>WHY VEYORA</div>
          <h2 className="heading-serif heading-serif-light" style={{marginTop:6}}>Calm, premium, and international</h2>
          <div className="why-grid">
            <div className="why-card">
              <Globe size={20}/>
              <h3>International by design</h3>
              <p>Listings across UAE, UK, Nigeria, USA and Europe — each priced in its local currency, formatted correctly without hidden conversion.</p>
            </div>
            <div className="why-card">
              <ShieldCheck size={20}/>
              <h3>Enquire, don’t checkout</h3>
              <p>No cart, no payment forms. Every card and detail page offers WhatsApp and a request-a-viewing form with clear demo-mode transparency.</p>
            </div>
            <div className="why-card">
              <Award size={20}/>
              <h3>Photography first</h3>
              <p>Each property has its own coherent gallery — exterior, lounge, kitchen, bedrooms and amenity — so you can truly picture the home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW + CTA */}
      <section className="section">
        <div className="container two-col">
          <div className="about-preview">
            <div className="eyebrow">ABOUT VEYORA</div>
            <h2 className="heading-serif">We help you find where you belong.</h2>
            <p>VEYORA Properties is a boutique discovery platform for buyers, renters and investors seeking clarity over clutter. We present a small, considered catalogue with honest presentation, generous photography and direct enquiry.</p>
            <p className="muted">We don’t invent company history or credentials. This is a new platform — our promise is thoughtful curation, responsive service and transparent next steps.</p>
            <Link to="/about" className="btn btn-outline">Learn more about us <ArrowRight size={14}/></Link>
          </div>
          <div className="cta-card">
            <h3>Ready to enquire?</h3>
            <p>Every listing includes WhatsApp, contact actions and a viewing request form. Configure your details once in <code>contactConfig.js</code> and go live.</p>
            <div className="cta-actions">
              <Link to="/properties" className="btn btn-primary">Browse all properties</Link>
              <Link to="/contact" className="btn btn-outline">Contact us</Link>
            </div>
            <div className="cta-note">No payment · No checkout · Just enquiries</div>
          </div>
        </div>
      </section>

      <style>{`
        .hero { background: linear-gradient(180deg, var(--color-ivory) 0%, #fff 100%); padding: 36px 0 32px; }
        .hero-copy h1 {
          font-family: var(--font-serif); font-size: clamp(32px, 5vw, 52px);
          line-height:1.05; color: var(--color-forest); margin:8px 0 14px;
        }
        .hero-copy p { color: var(--color-muted); font-size:15px; max-width:560px; line-height:1.7; }
        .hero-search { display:flex; gap:10px; margin-top:16px; max-width:640px; }
        .hero-search .searchbar { flex:1; }
        .hero-meta { display:flex; gap:8px; flex-wrap:wrap; font-size:12px; color:var(--color-muted); margin-top:10px; }
        .hero-meta strong { color: var(--color-forest); }
        .hero-visual { display:flex; flex-direction:column; gap:12px; }
        .hero-image-card { position:relative; border-radius: var(--radius-xl); overflow:hidden; aspect-ratio: 4/3; background: var(--color-forest); box-shadow: var(--shadow-lg); }
        .hero-image-card img { width:100%; height:100%; object-fit:cover; }
        .hero-image-overlay { position:absolute; inset:0; background: linear-gradient(180deg, transparent 40%, rgba(12,22,22,0.55) 100%); display:flex; align-items:flex-end; padding:16px; }
        .overlay-card { background: rgba(255,255,255,0.96); border-radius:12px; padding:12px 14px; width:100%; backdrop-filter: blur(6px); }
        .overlay-eyebrow { font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--color-gold-dark); font-weight:700; }
        .overlay-title { font-family: var(--font-serif); font-weight:600; color:var(--color-forest); margin:2px 0 4px; }
        .overlay-price { font-size:13px; font-weight:600; color:var(--color-forest); margin-bottom:8px; }
        .hero-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .hero-stats div { background: var(--color-white); border:1px solid var(--color-border); border-radius: var(--radius-md); padding:10px; text-align:center; }
        .hero-stats strong { display:block; font-size:18px; color:var(--color-forest); }
        .hero-stats span { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--color-muted); font-weight:600; }

        .section-head { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; margin-bottom:18px; flex-wrap:wrap; }
        .section-head h2 { margin:0; font-size:26px; }
        .category-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:12px; }
        @media(min-width:700px){ .category-grid{ grid-template-columns: repeat(3,1fr);} }
        @media(min-width:1024px){ .category-grid{ grid-template-columns: repeat(6,1fr);} }
        .cat-card {
          background: var(--color-white); border:1px solid var(--color-border); border-radius: var(--radius-md);
          padding:16px; display:flex; flex-direction:column; gap:6px; align-items:flex-start;
          transition: all .18s;
        }
        .cat-card:hover { border-color: var(--color-forest); box-shadow: var(--shadow-sm); }
        .cat-card strong { color: var(--color-forest); font-size:14px; }
        .cat-card span { font-size:12px; color: var(--color-muted); }
        .cat-card svg { color: var(--color-gold); }

        .why-grid { display:grid; gap:16px; margin-top:20px; grid-template-columns:1fr; }
        @media(min-width:800px){ .why-grid{ grid-template-columns: repeat(3,1fr);} }
        .why-card { background: #203232; border:1px solid #2d4a4a; border-radius: var(--radius-lg); padding:18px; }
        .why-card h3 { color:white; margin:10px 0 6px; font-size:16px; }
        .why-card p { color:#b9c7c5; font-size:13px; line-height:1.6; margin:0; }
        .why-card svg { color: var(--color-gold); }

        .about-preview h2 { margin:8px 0 12px; font-size:26px; }
        .about-preview p { color: var(--color-muted); font-size:14px; line-height:1.7; }
        .about-preview .muted { color:#8a8a8a; }
        .cta-card {
          background: var(--color-forest); color: white;
          border-radius: var(--radius-xl); padding:22px;
        }
        .cta-card h3 { margin:0 0 8px; font-family: var(--font-serif); font-size:20px; }
        .cta-card p { color:#c9d6d4; font-size:13px; line-height:1.6; }
        .cta-card code { background: #203232; padding:2px 6px; border-radius:6px; font-size:12px; }
        .cta-actions { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
        .cta-note { margin-top:12px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color: var(--color-gold-light); font-weight:600; }
      `}</style>
    </div>
  )
}

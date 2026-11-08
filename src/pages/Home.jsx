import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Globe, Award, Search, Building2, Home as HomeIcon, Landmark, Waves, Store } from 'lucide-react'
import { properties, getFeatured, getPropertyById } from '../data/properties'
import PropertySlider from '../components/PropertySlider'
import PropertyGrid from '../components/PropertyGrid'
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
    { icon: Store, label:'Houses', type:'detached', count: properties.filter(p=>p.propertyType==='detached').length },
  ].filter(c => c.count > 0)

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">VEYORA PROPERTIES · INTERNATIONAL</div>
            <h1>A better place<br/>to belong.</h1>
            <p>Discover exceptional homes across Dubai, London, Lagos, Los Angeles, Barcelona, Paris and Austin. Thoughtfully curated, beautifully photographed and available for private viewing.</p>

            <form className="hero-search" onSubmit={submitSearch}>
              <SearchBar value={q} onChange={onSearch} placeholder="Search by city, area or property name…" />
              <button type="submit" className="btn btn-primary"><Search size={16}/> Search</button>
            </form>

            <div className="hero-meta">
              <span><strong>8</strong> exclusive properties</span>
              <span>·</span>
              <span>6 countries</span>
              <span>·</span>
              <span>Private viewings</span>
            </div>

            <div className="hero-trust">
              <ShieldCheck size={16}/>
              <span>Viewings by appointment — enquire directly to arrange your visit.</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img src={heroProperty.images[0]} alt={`${heroProperty.title} — featured property in ${heroProperty.location.city}`} width={640} height={480} loading="eager" />
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
              <div><strong>4</strong><span>For Sale</span></div>
              <div><strong>4</strong><span>For Rent</span></div>
              <div><strong>8</strong><span>Properties</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-light">
        <div className="container">
          <div className="section-head">
            <h2 className="heading-serif">Browse by category</h2>
            <Link to="/properties" className="btn btn-outline btn-sm">View all 8 <ArrowRight size={14}/></Link>
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

      {/* FEATURED SLIDER */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">HANDPICKED</div>
              <h2 className="heading-serif">Featured properties</h2>
              <p className="section-desc">Swipe or use the arrows to explore our featured selection.</p>
            </div>
            <Link to="/properties" className="btn btn-primary btn-sm">View catalogue</Link>
          </div>
          <PropertySlider properties={featured} title="Featured — slide through" />
        </div>
      </section>

      {/* COMPLETE COLLECTION — 4×2 GRID */}
      <section className="section section-light">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">OUR COLLECTION</div>
              <h2 className="heading-serif">Explore all properties</h2>
              <p className="section-desc">Eight homes across six countries — presented in a refined 4 × 2 gallery.</p>
            </div>
            <Link to="/properties" className="btn btn-outline btn-sm">Open full catalogue <ArrowRight size={14}/></Link>
          </div>
          <PropertyGrid properties={properties} />
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
              <p>Listings across UAE, UK, Nigeria, USA, Spain and France — each priced in its local currency and presented without hidden conversion.</p>
            </div>
            <div className="why-card">
              <ShieldCheck size={20}/>
              <h3>Direct enquiries</h3>
              <p>Every property offers a clear next step — WhatsApp, email or a viewing request — so you connect directly with our team.</p>
            </div>
            <div className="why-card">
              <Award size={20}/>
              <h3>Photography first</h3>
              <p>Each home has its own coherent gallery — exterior, living room, kitchen, bedrooms and distinctive feature — to help you truly envisage the space.</p>
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
            <p>VEYORA Properties is a boutique discovery platform for buyers, renters and investors seeking clarity over clutter. We present a compact, considered collection with thoughtful presentation, generous photography and attentive service.</p>
            <p className="muted">Our commitment is to curation, transparency and responsive guidance at every step.</p>
            <Link to="/about" className="btn btn-outline">Learn more about us <ArrowRight size={14}/></Link>
          </div>
          <div className="cta-card">
            <h3>Ready to enquire?</h3>
            <p>Each listing provides direct contact options and a viewing request form. Our team responds promptly to arrange viewings and answer questions.</p>
            <div className="cta-actions">
              <Link to="/properties" className="btn btn-primary">Browse all properties</Link>
              <Link to="/contact" className="btn btn-outline" style={{color:'white', borderColor:'rgba(255,255,255,0.5)'}}>Contact us</Link>
            </div>
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
        .hero-search { display:flex; gap:10px; margin-top:16px; max-width:640px; flex-wrap:wrap; }
        .hero-search .searchbar { flex:1; min-width:200px; }
        .hero-meta { display:flex; gap:8px; flex-wrap:wrap; font-size:12px; color:var(--color-muted); margin-top:12px; }
        .hero-meta strong { color: var(--color-forest); }
        .hero-trust { display:flex; gap:8px; align-items:center; margin-top:16px; background:#E6F4EA; border:1px solid #A7D4B4; color:#1A6B4A; padding:10px 12px; border-radius:8px; font-size:13px; line-height:1.4; }
        .hero-trust svg { color:#1A6B4A; flex:none; }
        .hero-visual { display:flex; flex-direction:column; gap:12px; min-width:0; }
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
        .section-desc { font-size:13px; color:var(--color-muted); margin:6px 0 0; line-height:1.5; }
        .category-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:12px; }
        @media(min-width:700px){ .category-grid{ grid-template-columns: repeat(3,1fr);} }
        @media(min-width:1024px){ .category-grid{ grid-template-columns: repeat(5,1fr);} }
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
        .why-card { background: #2B2B28; border:1px solid #3A3835; border-radius: var(--radius-lg); padding:18px; }
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
        .cta-card h3 { margin:0 0 8px; font-family: var(--font-serif); font-size:20px; color:white; }
        .cta-card p { color:#c9d6d4; font-size:13px; line-height:1.6; }
        .cta-actions { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
        @media(max-width:640px){
          .hero-search { flex-direction: column; }
          .hero-search .btn { width:100%; }
          .hero { padding: 24px 0 20px; }
          .overlay-card { padding:10px; }
        }
      `}</style>
    </div>
  )
}

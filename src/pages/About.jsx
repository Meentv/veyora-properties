import { Link } from 'react-router-dom'
import { Compass, Eye, Heart, Users } from 'lucide-react'

export default function About(){
  return (
    <div>
      <div className="container" style={{padding:'32px 0 18px'}}>
        <div className="eyebrow">ABOUT VEYORA</div>
        <h1 className="heading-serif">A better place to belong.</h1>
        <p style={{maxWidth:720, color:'var(--color-muted)', lineHeight:1.7}}>VEYORA Properties is a premium international discovery platform. We make finding a home calmer, clearer and more personal — whether you are buying, renting or investing across borders.</p>
      </div>

      <section className="section section-light">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="heading-serif">Our story</h2>
              <p style={{color:'var(--color-muted)', lineHeight:1.7, fontSize:14}}>We present a carefully curated collection of homes across Dubai, London, Lagos, Los Angeles, Barcelona, Paris and Austin — each with detailed photography and transparent information. Every enquiry connects you directly with our team to arrange viewings and answer questions.</p>
              <p style={{color:'var(--color-muted)', lineHeight:1.7, fontSize:14}}>We believe in quality over quantity: fewer listings, presented with care, so you can make decisions with confidence.</p>
            </div>
            <div style={{background:'var(--color-white)', border:'1px solid var(--color-border)', borderRadius:16, padding:20}}>
              <h3 style={{margin:'0 0 10px', color:'var(--color-forest)'}}>At a glance</h3>
              <div className="stats-grid">
                <div className="stat"><strong>8</strong><span>Exclusive listings</span></div>
                <div className="stat"><strong>6</strong><span>Countries</span></div>
                <div className="stat"><strong>5</strong><span>Currencies</span></div>
                <div className="stat"><strong>24/7</strong><span>Enquiries</span></div>
              </div>
              <p style={{fontSize:12, color:'var(--color-muted)', marginTop:14}}>Viewings by appointment. Contact us to arrange your visit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="heading-serif">Mission, Vision & Values</h2>
          <div className="values-grid">
            <div className="value-card"><Compass size={18}/><h3>Mission</h3><p>To help people find where they belong with clarity and care — connecting discerning buyers and renters to homes presented honestly, with exceptional photography and attentive service.</p></div>
            <div className="value-card"><Eye size={18}/><h3>Vision</h3><p>A trusted international address for property discovery: premium yet welcoming, global yet locally informed. A place where presentation respects both home and seeker.</p></div>
            <div className="value-card"><Heart size={18}/><h3>Integrity</h3><p>We present each home as it is, with accurate details and clear availability. We value transparency over embellishment.</p></div>
            <div className="value-card"><Users size={18}/><h3>Service</h3><p>Human first. Every listing offers direct enquiry, comparison and saved favourites, so decisions are unhurried and well-informed.</p></div>
          </div>

          <div className="cta-strip">
            <div>
              <h3>Experience the collection</h3>
              <p>Eight distinctive homes, each with its own complete gallery.</p>
            </div>
            <Link to="/properties" className="btn btn-primary">Browse properties</Link>
          </div>
        </div>
      </section>

      <style>{`
        .stat { text-align:center; background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:14px; }
        .stat strong { display:block; font-size:22px; color: var(--color-forest); }
        .stat span { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color: var(--color-muted); font-weight:600; }
        .values-grid { display:grid; gap:14px; grid-template-columns:1fr; margin-top:16px; }
        @media(min-width:800px){ .values-grid{ grid-template-columns: repeat(2,1fr);} }
        .value-card { border:1px solid var(--color-border); border-radius:12px; padding:18px; background: var(--color-white); }
        .value-card h3 { margin:10px 0 6px; color: var(--color-forest); font-size:15px; }
        .value-card p { margin:0; color: var(--color-muted); font-size:13px; line-height:1.6; }
        .value-card svg { color: var(--color-gold); }
        .cta-strip { margin-top:22px; background: var(--color-forest); color:white; border-radius:16px; padding:18px; display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
        .cta-strip h3 { margin:0 0 4px; font-family: var(--font-serif); color:white; }
        .cta-strip p { margin:0; color:#c9d6d4; font-size:13px; }
      `}</style>
    </div>
  )
}

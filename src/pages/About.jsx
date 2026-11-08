import { Link } from 'react-router-dom'
import { Compass, Eye, Heart, Users } from 'lucide-react'

export default function About(){
  return (
    <div>
      <div className="container" style={{padding:'32px 0 18px'}}>
        <div className="eyebrow">ABOUT VEYORA</div>
        <h1 className="heading-serif">A better place to belong.</h1>
        <p style={{maxWidth:720, color:'var(--color-muted)', lineHeight:1.7}}>VEYORA Properties is a premium, international discovery platform. We exist to make finding a home calmer, clearer and more trustworthy — whether you are buying, renting or investing across borders.</p>

        <div className="sample-notice" style={{marginTop:14, maxWidth:720}}><span><strong>Honesty note:</strong> VEYORA is a new platform. We do not invent company history, awards or unverified credentials. What follows is our working mission, vision and values — clearly labelled.</span></div>
      </div>

      <section className="section section-light">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="heading-serif">Our story</h2>
              <p style={{color:'var(--color-muted)', lineHeight:1.7, fontSize:14}}>VEYORA was built for viewing — not selling online. We show 20 curated homes across Dubai, London, Lagos, New York, Barcelona, Paris and Austin, each with its own photography. Every enquiry goes directly to WhatsApp <strong>+234 913 279 8151</strong> for viewings, questions and next steps. No checkout, no hidden fees.</p>
              <p style={{color:'var(--color-muted)', lineHeight:1.7, fontSize:14}}>We are your bridge: thoughtful presentation on one side, direct human conversation on the other — via WhatsApp and in-person viewings.</p>
            </div>
            <div style={{background:'var(--color-white)', border:'1px solid var(--color-border)', borderRadius:16, padding:20}}>
              <h3 style={{margin:'0 0 10px', color:'var(--color-forest)'}}>At a glance</h3>
              <div className="stats-grid">
                <div className="stat"><strong>20</strong><span>Curated listings</span></div>
                <div className="stat"><strong>6</strong><span>Countries</span></div>
                <div className="stat"><strong>5</strong><span>Currencies</span></div>
                <div className="stat"><strong>0</strong><span>Checkout</span></div>
              </div>
              <p style={{fontSize:12, color:'var(--color-muted)', marginTop:14}}>Viewing & enquiries via WhatsApp +234 913 279 8151. See Contact for details.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="heading-serif">Mission, Vision & Values</h2>
          <div className="values-grid">
            <div className="value-card"><Compass size={18}/><h3>Mission</h3><p>To help people find where they belong with clarity, care and confidence — connecting discerning buyers and renters to homes presented honestly, with exceptional photography and no pressure.</p></div>
            <div className="value-card"><Eye size={18}/><h3>Vision</h3><p>A trusted international address for property discovery: premium but welcoming, editorial but useful, global but local in knowledge. A place where presentation respects both home and seeker.</p></div>
            <div className="value-card"><Heart size={18}/><h3>Values — Integrity</h3><p>We show what is there, clearly labelled as sample until verified. We never invent credentials, hide fees or pretend a demo enquiry has reached an agent.</p></div>
            <div className="value-card"><Users size={18}/><h3>Values — Service</h3><p>Human first. Every card and detail page offers direct enquiry, comparison and saved favourites, so decisions are unrushed and informed.</p></div>
          </div>

          <div className="cta-strip">
            <div>
              <h3>Experience the catalogue</h3>
              <p>Twenty distinct homes, each with its own gallery. Browse the 5 × 4 desktop grid and save your shortlist.</p>
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
        .cta-strip h3 { margin:0 0 4px; font-family: var(--font-serif); }
        .cta-strip p { margin:0; color:#c9d6d4; font-size:13px; }
      `}</style>
    </div>
  )
}

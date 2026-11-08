import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react'
import { contactConfig } from '../data/contactConfig'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-mark">V</span>
            <span className="footer-name">VEYORA<br/>PROPERTIES</span>
          </div>
          <p className="footer-tagline">A better place to belong.</p>
          <p className="footer-desc">
            Premium international real estate discovery — browse curated listings, compare and enquire directly. Sample catalogue for demonstration.
          </p>
          <div className="footer-legal">© {new Date().getFullYear()} VEYORA Properties. All rights reserved. Sample listings — not verified real inventory.</div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/properties">All Properties</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/favorites">Favourites</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/contact">Contact & Enquiries</Link>
          <a href="#how-it-works">How it works</a>
          <Link to="/contact">Request a viewing</Link>
          <span className="footer-muted">No checkout — browse & enquire only</span>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <div className="footer-contact-line"><Mail size={14}/> {contactConfig.email || '— email not configured —'}</div>
          <div className="footer-contact-line"><Phone size={14}/> {contactConfig.phoneDisplay}</div>
          <div className="footer-contact-line"><MapPin size={14}/> {contactConfig.address}</div>
          <div className="footer-social">
            <span><Instagram size={16}/> Instagram</span>
            <span><Linkedin size={16}/> LinkedIn</span>
          </div>
          <div className="footer-muted" style={{marginTop:8}}>Office hours: {contactConfig.officeHours}</div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-forest);
          color: #dfe6e2;
          padding: 48px 0 28px;
          margin-top: 48px;
        }
        .footer-grid { padding-bottom: 8px; }
        .footer-brand { max-width: 420px; }
        .footer-logo { display:flex; gap:12px; align-items:center; }
        .footer-mark {
          width:44px; height:44px; border-radius:10px;
          background: #203232; color: var(--color-gold);
          display:grid; place-items:center;
          font-family: var(--font-serif); font-weight:700; font-size:20px;
          border:1px solid #2d4a4a;
        }
        .footer-name { font-family: var(--font-serif); font-size:15px; line-height:1; letter-spacing:0.08em; color:white; font-weight:700; }
        .footer-tagline { color: var(--color-gold); font-family: var(--font-serif); margin:12px 0 8px; font-size:15px; }
        .footer-desc { color:#b9c7c5; font-size:13px; line-height:1.7; margin:0; }
        .footer-legal { margin-top:16px; font-size:11px; color:#8ea6a3; line-height:1.5; }
        .footer-col h4 { color: white; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 16px; }
        .footer-col { display:flex; flex-direction:column; gap:10px; }
        .footer-col a { color:#c9d6d4; font-size:14px; }
        .footer-col a:hover { color:white; }
        .footer-muted { font-size:12px; color:#8ea6a3; }
        .footer-contact-line { display:flex; gap:8px; align-items:center; color:#c9d6d4; font-size:13px; }
        .footer-social { display:flex; gap:16px; margin-top:8px; color:#c9d6d4; font-size:13px; }
        .footer-social span { display:flex; gap:6px; align-items:center; }
      `}</style>
    </footer>
  )
}

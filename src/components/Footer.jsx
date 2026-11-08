import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { contactConfig } from '../data/contactConfig'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="VEYORA Properties" width="180" height="40" className="footer-logo-img" />
          <p className="footer-tagline">A better place to belong.</p>
          <p className="footer-desc">
            Premium international properties — curated for discerning buyers and renters. Arrange a private viewing with our team.
          </p>
          <div className="footer-legal">© {new Date().getFullYear()} VEYORA Properties. All rights reserved.</div>
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
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          {contactConfig.email && <div className="footer-contact-line"><Mail size={14}/> <a href={`mailto:${contactConfig.email}`} style={{color:'#c9d6d4'}}>{contactConfig.email}</a></div>}
          {contactConfig.phoneDisplay && <div className="footer-contact-line"><Phone size={14}/> <a href={`tel:${contactConfig.phoneE164}`} style={{color:'#c9d6d4'}}>{contactConfig.phoneDisplay}</a></div>}
          <div className="footer-contact-line"><MapPin size={14}/> {contactConfig.address}</div>
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
        .footer-logo-img { height:40px; width:auto; display:block; background: white; border-radius:8px; padding:4px 8px; }
        .footer-tagline { color: var(--color-gold); font-family: var(--font-serif); margin:12px 0 8px; font-size:15px; }
        .footer-desc { color:#b9c7c5; font-size:13px; line-height:1.7; margin:0; }
        .footer-legal { margin-top:16px; font-size:11px; color:#8ea6a3; line-height:1.5; }
        .footer-col h4 { color: white; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 16px; }
        .footer-col { display:flex; flex-direction:column; gap:10px; min-width:0; }
        .footer-col a { color:#c9d6d4; font-size:14px; }
        .footer-col a:hover { color:white; }
        .footer-muted { font-size:12px; color:#8ea6a3; }
        .footer-contact-line { display:flex; gap:8px; align-items:center; color:#c9d6d4; font-size:13px; word-break:break-word; }
      `}</style>
    </footer>
  )
}

import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { contactConfig } from '../data/contactConfig'
import { buildWhatsAppLink } from '../utils/contactLinks'

export default function Contact(){
  return (
    <div className="container" style={{padding:'28px 0'}}>
      <div className="eyebrow">CONTACT & ENQUIRIES</div>
      <h1 className="heading-serif">We’re here to help</h1>
      <p style={{color:'var(--color-muted)', maxWidth:680, lineHeight:1.6, fontSize:14}}>Whether you’re buying, renting or exploring an investment, start a conversation. No checkout, no payment — just enquiries, viewings and guidance. Until real contact details are supplied, the form below works in demo mode.</p>

      <div className="two-col" style={{marginTop:18}}>
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          <div className="contact-card">
            <h3><Mail size={16}/> Email</h3>
            <p>{contactConfig.email || '— not configured —'}</p>
            <small>Configure in <code>src/data/contactConfig.js</code>. When set, detail pages show a mailto link.</small>
          </div>
          <div className="contact-card">
            <h3><Phone size={16}/> Phone & WhatsApp</h3>
            <p>{contactConfig.phoneDisplay}</p>
            <small>WhatsApp number for prefilled enquiries: <code>whatsappNumber</code>. When configured, every card and detail page offers a working WhatsApp link.</small>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{marginTop:8}}><MessageCircle size={14}/> Open WhatsApp (demo message)</a>
          </div>
          <div className="contact-card">
            <h3><MapPin size={16}/> Office</h3>
            <p>{contactConfig.address}</p>
            <small><Clock size={12}/> {contactConfig.officeHours}</small>
          </div>
          <div className="sample-notice"><span><strong>Configuration guide:</strong> See README → Contact Configuration for how to replace placeholders, connect Formspree/Netlify, and enable maps without committing secrets.</span></div>
        </div>

        <ContactForm />
      </div>

      <style>{`
        .contact-card { background: var(--color-white); border:1px solid var(--color-border); border-radius:12px; padding:16px; }
        .contact-card h3 { margin:0 0 6px; font-size:14px; color: var(--color-forest); display:flex; gap:8px; align-items:center; }
        .contact-card p { margin:0; font-weight:600; color: var(--color-forest); }
        .contact-card small { color: var(--color-muted); font-size:12px; line-height:1.5; display:block; margin-top:6px; }
        .contact-card code { background: var(--color-ivory); padding:2px 6px; border-radius:6px; }
      `}</style>
    </div>
  )
}

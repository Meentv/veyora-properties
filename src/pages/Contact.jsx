import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { contactConfig } from '../data/contactConfig'
import { buildWhatsAppLink } from '../utils/contactLinks'

export default function Contact(){
  return (
    <div className="container" style={{padding:'28px 0'}}>
      <div className="eyebrow">CONTACT & ENQUIRIES</div>
      <h1 className="heading-serif">We’re here to help</h1>
      <p style={{color:'var(--color-muted)', maxWidth:680, lineHeight:1.6, fontSize:14}}>Whether you’re buying, renting or exploring an investment, our team is ready to assist. Reach out to arrange viewings, ask questions or discuss your requirements.</p>

      <div className="two-col" style={{marginTop:18}}>
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          <div className="contact-card">
            <h3><Mail size={16}/> Email</h3>
            <a href={`mailto:${contactConfig.email}`} style={{fontWeight:600, color:'var(--color-forest)', fontSize:15}}>{contactConfig.email}</a>
            <small>We aim to respond within one business day.</small>
          </div>
          <div className="contact-card">
            <h3><Phone size={16}/> Phone & WhatsApp</h3>
            <a href={`tel:${contactConfig.phoneE164}`} style={{fontWeight:600, color:'var(--color-forest)', fontSize:15}}>{contactConfig.phoneDisplay}</a>
            <small>Available for calls and WhatsApp messages during office hours.</small>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{marginTop:10}}><MessageCircle size={14}/> Message us on WhatsApp</a>
          </div>
          <div className="contact-card">
            <h3><MapPin size={16}/> Office</h3>
            <p>{contactConfig.address}</p>
            <small><Clock size={12}/> {contactConfig.officeHours}</small>
          </div>
          <div className="contact-note">
            <strong>Private viewings</strong>
            <p>All viewings are by appointment. Share the property reference (e.g. VEY-001) and your preferred times, and we will confirm promptly.</p>
          </div>
        </div>

        <ContactForm />
      </div>

      <style>{`
        .contact-card { background: var(--color-white); border:1px solid var(--color-border); border-radius:12px; padding:16px; }
        .contact-card h3 { margin:0 0 6px; font-size:14px; color: var(--color-forest); display:flex; gap:8px; align-items:center; }
        .contact-card p { margin:0; font-weight:600; color: var(--color-forest); }
        .contact-card small { color: var(--color-muted); font-size:12px; line-height:1.5; display:block; margin-top:6px; }
        .contact-note { background: var(--color-ivory); border:1px solid var(--color-border); border-radius:12px; padding:16px; }
        .contact-note strong { color: var(--color-forest); font-size:14px; }
        .contact-note p { margin:6px 0 0; color: var(--color-muted); font-size:13px; line-height:1.6; }
      `}</style>
    </div>
  )
}

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { contactConfig } from '../data/contactConfig'

export default function ContactForm({ property }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', method:'email', message: property ? `Hello, I am interested in ${property.title} (${property.id}). Please share more details.` : '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | 'sending'
  const [statusMessage, setStatusMessage] = useState('')

  const validate = () => {
    const e={}
    if(!form.name.trim()) e.name='Name is required'
    if(!form.email.trim()) e.email='Email is required'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Enter a valid email'
    if(!form.message.trim()) e.message='Message is required'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const v=validate()
    setErrors(v)
    if(Object.keys(v).length) { setStatus('error'); setStatusMessage('Please correct the highlighted fields.'); return }

    // Connected mode: actually POST to configured endpoint
    if (contactConfig.formMode === 'connected' && contactConfig.formEndpoint) {
      setStatus('sending')
      setStatusMessage('Sending your enquiry...')
      try {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferredContact: form.method,
          message: form.message,
          propertyId: property?.id || null,
          propertyTitle: property?.title || null,
          propertyLocation: property ? `${property.location.area}, ${property.location.city}, ${property.location.country}` : null,
          submittedAt: new Date().toISOString()
        }
        const res = await fetch(contactConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!res.ok) {
          const text = await res.text().catch(()=> '')
          throw new Error(text || `Request failed with ${res.status}`)
        }
        setStatus('success')
        setStatusMessage(`Thank you, ${form.name.split(' ')[0] || 'there'}! Your enquiry for ${property ? `${property.title} (${property.id})` : 'VEYORA Properties'} was sent to ${contactConfig.email || 'the configured endpoint'}. We’ll respond via your preferred contact (${form.method}).`)
        return
      } catch (err) {
        setStatus('error')
        setStatusMessage(`Could not send enquiry: ${err.message}. Please try again or contact via WhatsApp using the button above. No payment is required.`)
        return
      }
    }

    // Demo mode: no backend — clearly explain no message sent
    setStatus('success')
    setStatusMessage(`Thank you, ${form.name.split(' ')[0] || 'there'}! This is a demo — no message was sent. To enable real delivery, set contactConfig.formMode to 'connected' and add your formEndpoint (e.g. Formspree). Until then, use WhatsApp on the property page for a real enquiry.`)
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h3>{property ? `Enquire about ${property.title}` : 'Send an enquiry'}</h3>
      {property && <p className="form-ref">Reference: <strong>{property.id}</strong> · {property.location.city} · <strong>{property.location.country}</strong></p>}

      {contactConfig.formMode==='demo' && (
        <div className="sample-notice" style={{marginBottom:12}}>
          <AlertCircle size={16} style={{flex:'none', marginTop:2}}/>
          <span><strong>Quick enquiry:</strong> Your message will be prepared for WhatsApp/email. For live delivery, configure your Formspree endpoint in <code>contactConfig.js</code>.</span>
        </div>
      )}
      {contactConfig.formMode==='connected' && !contactConfig.formEndpoint && (
        <div className="sample-notice" style={{marginBottom:12, background:'#fdecea', borderColor:'#fca5a5'}}>
          <AlertCircle size={16} style={{flex:'none', marginTop:2}}/>
          <span><strong>Configuration error:</strong> formMode is 'connected' but formEndpoint is empty. Add your Formspree/Netlify URL in <code>src/data/contactConfig.js</code>.</span>
        </div>
      )}

      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your full name" aria-invalid={!!errors.name}/> 
          {errors.name && <em className="err">{errors.name}</em>}
        </label>
        <label>
          <span>Email *</span>
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@email.com" aria-invalid={!!errors.email}/>
          {errors.email && <em className="err">{errors.email}</em>}
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Phone <span className="opt">(optional)</span></span>
          <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="+44 ..." />
        </label>
        <label>
          <span>Preferred contact</span>
          <select value={form.method} onChange={e=>setForm({...form, method:e.target.value})}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="any">Any</option>
          </select>
        </label>
      </div>

      <label className="full">
        <span>Message *</span>
        <textarea rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Tell us about viewing times, questions, or requirements…" aria-invalid={!!errors.message}></textarea>
        {errors.message && <em className="err">{errors.message}</em>}
      </label>

      <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:4}} disabled={status==='sending'}>
        {status==='sending' ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Sending...</> : <><Send size={16}/> Request viewing / Send enquiry</>}
      </button>

      {status==='success' && (
        <div className="form-success"><CheckCircle size={16}/> {statusMessage}</div>
      )}
      {status==='error' && (
        <div className="form-error"><AlertCircle size={16}/> {statusMessage}</div>
      )}

      <style>{`
        .contact-form {
          background: var(--color-white);
          border:1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding:20px;
        }
        .contact-form h3 { margin:0; font-family: var(--font-serif); color: var(--color-forest); font-size:18px; }
        .form-ref { margin:6px 0 14px; font-size:13px; color: var(--color-muted); }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
        @media(max-width:600px){ .form-grid{ grid-template-columns:1fr; } }
        .contact-form label { display:flex; flex-direction:column; gap:6px; font-size:13px; font-weight:600; color: var(--color-forest); }
        .contact-form label.full { margin-bottom:12px; }
        .contact-form input, .contact-form select, .contact-form textarea {
          padding:10px 12px; border:1px solid var(--color-border); border-radius: var(--radius-sm);
          font-weight:400; color: var(--color-charcoal); background: var(--color-white);
        }
        .contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus { border-color: var(--color-forest); outline:none; box-shadow:0 0 0 3px rgba(24,42,42,0.08); }
        .contact-form input[aria-invalid="true"], .contact-form textarea[aria-invalid="true"] { border-color: var(--color-error); }
        .opt { font-weight:400; color: var(--color-muted); }
        .err { font-weight:400; color: var(--color-error); font-size:12px; font-style:normal; }
        .form-success { margin-top:12px; background:#e6f4ea; color:#1a6b4a; padding:10px 12px; border-radius:8px; font-size:13px; display:flex; gap:8px; align-items:flex-start; line-height:1.5; }
        .form-error { margin-top:12px; background:#fdecea; color:#b42318; padding:10px 12px; border-radius:8px; font-size:13px; display:flex; gap:8px; align-items:flex-start; line-height:1.5; }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </form>
  )
}

import { contactConfig } from '../data/contactConfig'

export function buildWhatsAppLink(property) {
  const base = contactConfig.whatsappNumber
    ? `https://wa.me/${contactConfig.whatsappNumber}`
    : 'https://wa.me/'

  const text = property
    ? `${contactConfig.whatsappDefaultMessage}${property.title} (${property.id}) — ${property.location.city}, ${property.location.country}. Please share more details.`
    : 'Hello VEYORA Properties, I would like to enquire about your listings.'

  const encoded = encodeURIComponent(text)
  if (!contactConfig.whatsappNumber) {
    // Return base with text but indicate placeholder — consumer can disable / show notice
    return `${base}?text=${encoded}`
  }
  return `${base}?text=${encoded}`
}

export function buildMailtoLink(property) {
  if (!contactConfig.email) return null
  const subject = property
    ? `Enquiry: ${property.title} (${property.id})`
    : 'Enquiry — VEYORA Properties'
  const body = property
    ? `Hello VEYORA team,%0D%0A%0D%0AI would like to enquire about:%0D%0A${property.title} — ${property.id}%0D%0ALocation: ${property.location.area}, ${property.location.city}, ${property.location.country}%0D%0APrice: ${property.price} ${property.currency}%0D%0A%0D%0APlease share availability and next steps.%0D%0A%0D%0AThank you.`
    : `Hello VEYORA team,%0D%0A%0D%0AI would like to enquire about your properties.%0D%0A`
  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${body}`
}

export function buildTelLink() {
  if (!contactConfig.phoneE164) return null
  return `tel:${contactConfig.phoneE164}`
}

/**
 * Central contact configuration.
 * Replace placeholders with real business details when available.
 * Do not invent real personal contacts — keep placeholders clearly labelled.
 */

export const contactConfig = {
  // Display / fallback business info (placeholders)
  businessName: 'VEYORA Properties',
  tagline: 'A better place to belong.',

  // Phone / WhatsApp — placeholder. Replace with real e.g. "2348012345678" (no +, no spaces for WhatsApp)
  phoneDisplay: '— not configured —',
  phoneE164: '', // e.g. +2348012345678 (for tel: link)
  whatsappNumber: '', // e.g. 2348012345678 (no plus, no spaces)
  whatsappDefaultMessage: 'Hello VEYORA Properties, I am interested in ',

  // Email
  email: '', // e.g. hello@veyora.properties
  emailDisplay: '— not configured —',

  // Office
  address: '— office address to be configured —',
  officeHours: 'Mon – Fri: 9:00 – 18:00 · Sat: 10:00 – 16:00',

  // Social (optional)
  instagram: '',
  linkedin: '',

  // Form mode: 'demo' until a backend is connected
  formMode: 'demo', // 'demo' | 'connected'
  formEndpoint: '', // e.g. Formspree / Netlify / custom API

  // Map: leave empty until a real map provider / coordinates are configured
  mapEnabled: false,
  mapProvider: '', // e.g. 'google' | 'mapbox'
  mapEmbedUrl: ''
}

export const isContactConfigured = () => {
  return Boolean(contactConfig.phoneE164 || contactConfig.email || contactConfig.whatsappNumber)
}

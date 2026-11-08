/**
 * VEYORA Properties — Contact configuration
 * Live viewing & enquiry website — no sales/checkout.
 */

export const contactConfig = {
  businessName: 'VEYORA Properties',
  tagline: 'A better place to belong.',

  // Real contact — viewing & WhatsApp enquiries
  phoneDisplay: '+234 913 279 8151',
  phoneE164: '+2349132798151',
  whatsappNumber: '2349132798151',
  whatsappDefaultMessage: 'Hello VEYORA Properties, I am interested in ',

  // Email — owner contact
  email: 'alameenahmed588@gmail.com',
  emailDisplay: 'alameenahmed588@gmail.com',

  // Office
  address: 'Lagos, Nigeria — viewings by appointment',
  officeHours: 'Mon – Sat: 9:00 – 18:00 · Sun: Closed',

  instagram: '',
  linkedin: '',

  // Form: now live — messages sent to configured endpoint
  formMode: 'connected',
  formEndpoint: 'https://formspree.io/f/mayvlkqw',

  // Map
  mapEnabled: false,
  mapProvider: '',
  mapEmbedUrl: ''
}

export const isContactConfigured = () => {
  return Boolean(contactConfig.phoneE164 || contactConfig.email || contactConfig.whatsappNumber)
}

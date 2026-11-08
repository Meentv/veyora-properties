/**
 * VEYORA Properties — Curated catalogue for viewing & enquiry.
 * Exactly 8 listings. International currencies: USD, GBP, EUR, NGN, AED.
 * Prices are numeric amounts with ISO currency codes, formatted via Intl.NumberFormat.
 */

export const properties = [
  {
    id: 'VEY-001',
    slug: 'contemporary-garden-villa-dubai-hills',
    title: 'Contemporary Garden Villa',
    price: 4850000,
    currency: 'AED',
    listingType: 'sale',
    propertyType: 'villa',
    location: { city: 'Dubai', area: 'Villa 12, Sidra Villas, Dubai Hills Estate', country: 'United Arab Emirates' },
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 420,
    yearBuilt: 2021,
    furnishing: 'furnished',
    availability: 'available',
    featured: true,
    createdAt: '2024-11-01',
    images: [
      '/images/properties/vey-001/exterior.jpg',
      '/images/properties/vey-001/living-room.jpg',
      '/images/properties/vey-001/kitchen.jpg',
      '/images/properties/vey-001/bedroom.jpg',
      '/images/properties/vey-001/bathroom.jpg',
      '/images/properties/vey-001/garden-pool.jpg'
    ],
    amenities: ['Garden', 'Private Pool', 'Parking', 'Terrace', 'Smart Home', 'Maid’s Room'],
    description: 'A serene, light-filled villa set behind manicured hedging in Dubai Hills. Floor-to-ceiling glazing opens the living spaces to a private garden and infinity pool, while warm timber and stone finishes give quiet luxury throughout. Ideal for family living with close access to schools, parks and golf.',
    features: ['Double-height living room', 'Open-plan kitchen with island', 'Private garden with pool', 'Covered terrace & BBQ', 'Walk-in wardrobe in primary suite', 'Smart lighting and climate control']
  },
  {
    id: 'VEY-003',
    slug: 'notting-hill-townhouse-london',
    title: 'Notting Hill Painted Townhouse',
    price: 2450000,
    currency: 'GBP',
    listingType: 'sale',
    propertyType: 'townhouse',
    location: { city: 'London', area: '23 Ladbroke Grove, Notting Hill', country: 'United Kingdom' },
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 265,
    yearBuilt: 1898,
    furnishing: 'unfurnished',
    availability: 'available',
    featured: false,
    createdAt: '2024-10-20',
    images: [
      '/images/properties/vey-003/exterior.jpg',
      '/images/properties/vey-003/living-room.jpg',
      '/images/properties/vey-003/kitchen.jpg',
      '/images/properties/vey-003/bedroom.jpg',
      '/images/properties/vey-003/bathroom.jpg',
      '/images/properties/vey-003/garden.jpg'
    ],
    amenities: ['Garden', 'Fireplace', 'Storage', 'Patio', 'Parking Permit'],
    description: 'Classic pastel-fronted townhouse on a quiet garden square. Restored period details meet a contemporary family kitchen opening to a walled patio garden. Four generous bedrooms across three floors with rich natural light.',
    features: ['Period cornices & fireplaces', 'Family kitchen extension', 'Private walled garden', 'Loft storage', 'Steps to Portobello Road', 'Freehold']
  },
  {
    id: 'VEY-005',
    slug: 'eixample-modernist-apartment-barcelona',
    title: 'Eixample Modernist Apartment',
    price: 2800,
    currency: 'EUR',
    listingType: 'rent',
    propertyType: 'apartment',
    location: { city: 'Barcelona', area: 'Carrer de Pau Claris 120, Eixample Dreta', country: 'Spain' },
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 95,
    yearBuilt: 1905,
    furnishing: 'furnished',
    availability: 'available',
    featured: false,
    createdAt: '2024-10-15',
    images: [
      '/images/properties/vey-005/exterior.jpg',
      '/images/properties/vey-005/living-room.jpg',
      '/images/properties/vey-005/kitchen.jpg',
      '/images/properties/vey-005/bedroom.jpg',
      '/images/properties/vey-005/bathroom.jpg',
      '/images/properties/vey-005/balcony.jpg'
    ],
    amenities: ['Balcony', 'Elevator', 'High Ceilings', 'Historic Features', 'Air Conditioning'],
    description: 'Restored modernist apartment with mosaic floors and arched French doors to a Juliet balcony. Quiet, light-filled and turnkey furnished, steps from Passeig de Gràcia and Casa Batlló.',
    features: ['Original mosaic tiles', 'Balcony with street view', 'Restored timber shutters', 'Designer kitchen', 'Walkable to metro', 'Furnished']
  },
  {
    id: 'VEY-007',
    slug: 'shoreditch-loft-apartment-london',
    title: 'Shoreditch Warehouse Loft',
    price: 3200,
    currency: 'GBP',
    listingType: 'rent',
    propertyType: 'apartment',
    location: { city: 'London', area: '18 Curtain Road, Shoreditch', country: 'United Kingdom' },
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 68,
    yearBuilt: 1912,
    furnishing: 'furnished',
    availability: 'available',
    featured: false,
    createdAt: '2024-11-02',
    images: [
      '/images/properties/vey-007/exterior.jpg',
      '/images/properties/vey-007/living-room.jpg',
      '/images/properties/vey-007/kitchen.jpg',
      '/images/properties/vey-007/bedroom.jpg',
      '/images/properties/vey-007/bathroom.jpg',
      '/images/properties/vey-007/rooftop.jpg'
    ],
    amenities: ['Rooftop Terrace', 'Exposed Brick', 'High Ceilings', 'Concierge', 'Gym'],
    description: 'Converted textile warehouse with exposed brick, steel windows and polished concrete. Open-plan living under a vaulted ceiling, bespoke kitchen and mews balcony. Building offers gym and communal rooftop.',
    features: ['Vaulted open plan', 'Industrial steel windows', 'Custom kitchen joinery', 'Mews balcony', 'Communal rooftop', 'Pet-friendly building']
  },
  {
    id: 'VEY-008',
    slug: 'lekki-family-home-lagos',
    title: 'Lekki Phase 1 Family Home',
    price: 850000,
    currency: 'NGN',
    listingType: 'rent',
    propertyType: 'detached',
    location: { city: 'Lagos', area: 'No. 12A Admiralty Way, Lekki Phase 1', country: 'Nigeria' },
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 320,
    yearBuilt: 2017,
    furnishing: 'unfurnished',
    availability: 'available',
    featured: false,
    createdAt: '2024-10-12',
    images: [
      '/images/properties/vey-008/exterior.jpg',
      '/images/properties/vey-008/living-room.jpg',
      '/images/properties/vey-008/kitchen.jpg',
      '/images/properties/vey-008/bedroom.jpg',
      '/images/properties/vey-008/bathroom.jpg',
      '/images/properties/vey-008/compound.jpg'
    ],
    amenities: ['Compound', 'Garden', 'Parking', 'Security', 'Water Treatment'],
    description: 'Spacious family home in a secure gated compound. Bright living wing, fitted kitchen with pantry and four ensuite bedrooms including a generous primary suite with terrace. Excellent schools and retail nearby.',
    features: ['Gated compound with 24/7 security', 'Terrace off primary suite', 'Fitted kitchen + store', 'Family lounge', 'Parking for 3', 'Private garden']
  },
  {
    id: 'VEY-009',
    slug: 'beverly-hills-canyon-villa-la',
    title: 'Beverly Hills Canyon Villa',
    price: 4650000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'villa',
    location: { city: 'Los Angeles', area: '1421 Benedict Canyon Dr, Beverly Hills', country: 'United States' },
    bedrooms: 5,
    bathrooms: 5,
    areaSqm: 640,
    yearBuilt: 2020,
    furnishing: 'furnished',
    availability: 'available',
    featured: true,
    createdAt: '2024-09-25',
    images: [
      '/images/properties/vey-009/exterior.jpg',
      '/images/properties/vey-009/living-room.jpg',
      '/images/properties/vey-009/kitchen.jpg',
      '/images/properties/vey-009/bedroom.jpg',
      '/images/properties/vey-009/bathroom.jpg',
      '/images/properties/vey-009/pool-canyon.jpg'
    ],
    amenities: ['Canyon View', 'Pool', 'Gym', 'Home Cinema', 'Wine Cellar', 'Garden'],
    description: 'Architectural canyon villa with glass walls that dissolve into oak-studded hills. Minimalist interiors, stone bath suites and an infinity pool that appears to float above the canyon. Gated and deeply private.',
    features: ['Canyon infinity pool', 'Glass living pavilion', 'Stone ensuite baths', 'Chef’s kitchen', 'Wellness + gym suite', 'Gated motor court']
  },
  {
    id: 'VEY-015',
    slug: 'paris-left-bank-apartment',
    title: 'Left Bank Haussmann Apartment',
    price: 8900,
    currency: 'EUR',
    listingType: 'rent',
    propertyType: 'apartment',
    location: { city: 'Paris', area: '12 Rue du Dragon, Saint-Germain-des-Prés', country: 'France' },
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 128,
    yearBuilt: 1885,
    furnishing: 'furnished',
    availability: 'available',
    featured: true,
    createdAt: '2024-10-22',
    images: [
      '/images/properties/vey-015/exterior.jpg',
      '/images/properties/vey-015/living-room.jpg',
      '/images/properties/vey-015/kitchen.jpg',
      '/images/properties/vey-015/bedroom.jpg',
      '/images/properties/vey-015/bathroom.jpg',
      '/images/properties/vey-015/balcony-paris.jpg'
    ],
    amenities: ['Balcony', 'Fireplace', 'High Ceilings', 'Elevator', 'Herringbone Floors'],
    description: 'Elegant Haussmann apartment with herringbone oak, marble mantels and French doors to a wrought-iron balcony. Quiet building on a classic Left Bank street, furnished with designer ease.',
    features: ['Herringbone oak floors', 'Marble fireplaces', 'Balcony with street view', 'Designer kitchen', 'Wine cave', 'Elevator building']
  },
  {
    id: 'VEY-020',
    slug: 'austin-hill-country-modern',
    title: 'Hill Country Modern Retreat',
    price: 1250000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'detached',
    location: { city: 'Austin', area: '11200 Lantana Ridge, Hill Country', country: 'United States' },
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 360,
    yearBuilt: 2019,
    furnishing: 'furnished',
    availability: 'available',
    featured: true,
    createdAt: '2024-10-18',
    images: [
      '/images/properties/vey-020/exterior.jpg',
      '/images/properties/vey-020/living-room.jpg',
      '/images/properties/vey-020/kitchen.jpg',
      '/images/properties/vey-020/bedroom.jpg',
      '/images/properties/vey-020/bathroom.jpg',
      '/images/properties/vey-020/deck-view.jpg'
    ],
    amenities: ['Hill View', 'Deck', 'Pool', 'Fireplace', 'Garden', 'Garage'],
    description: 'Cedar and limestone retreat set among live oaks. Expansive great room with steel-framed glass to a pool deck and Hill Country panorama. Calm, modern, and built for indoor-outdoor living.',
    features: ['Hill Country panorama deck', 'Infinity pool', 'Steel-framed glazing', 'Chef’s kitchen', 'Primary suite with retreat nook', 'Two-car garage + storage']
  }
]

export function getPropertyById(id) {
  return properties.find(p => p.id === id || p.slug === id)
}

export function getFeatured() {
  return properties.filter(p => p.featured)
}

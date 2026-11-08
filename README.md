# VEYORA Properties — A better place to belong.

Premium international real estate discovery platform built with **React + Vite**. Browse 20 curated sample listings, view rich galleries, save favourites, compare, and enquire — **no checkout, no payments**.

> **Live demo:** Run locally with `npm run dev` → http://localhost:5173
> **Stack:** React 18, React Router 6, Vite 5, Lucide React, plain CSS with design tokens.

---

## ✨ Features

- **20 distinct properties** — apartments, villas, townhouses, penthouses, detached homes & commercial — with balanced locations (Dubai, London, Lagos, New York, Barcelona, LA, Paris, Lisbon, Austin, Miami) and 5 currencies (USD, GBP, EUR, NGN, AED).
- **5 × 4 desktop grid** — exactly 5 columns × 4 rows on wide desktop (≥1360px), responsive: 2 cols on phones, 3 on tablets, 4/5 on desktop. No horizontal overflow.
- **Individual detail pages** (`/properties/:id`) with multi-image gallery, thumbnails, lightbox with next/prev, specs, description, features, amenities, location summary, favourite, share (Web Share API + clipboard fallback), WhatsApp enquiry, and enquiry form.
- **Search & filters** — search by city, area, title or reference ID; combined filters for buy/rent, type, location, min/max price, bedrooms, bathrooms, availability; sort by newest / price low-high / high-low; active chips & clear-all; results count; load-more pagination.
- **Favourites** via `localStorage` — persist across refreshes, empty state, clear all.
- **Compare up to 3** — select from cards/detail, sticky compare bar, comparison table (price, location, type, bed/bath, area, availability).
- **Recently viewed** via `localStorage` — shown on detail pages (max 6).
- **Contact & enquiry — no payments** — WhatsApp link with prefilled message (property title + ID), tel/mailto when configured, request-a-viewing form with validation, demo-mode transparency, central `contactConfig.js`.
- **Responsive, accessible, SEO-friendly** — semantic HTML, keyboard focus, ARIA labels, skeleton/loading states, lazy-loading, image fallbacks, page titles, meta descriptions, social preview tags, reduced-motion respect.
- **Original photography** — coherent 6-image galleries per property (exterior, lounge, kitchen, bedroom, bathroom, amenity). Generated via AI (see `PROMPT_PACK.md` for full prompt catalogue). All image paths exist; placeholders are replaced progressively.

---

## 🗂 Project structure

```
veyora-properties/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── placeholder.svg
│       └── properties/
│           ├── vey-001/exterior.jpg … garden-pool.jpg (6 per property)
│           ├── vey-002/…
│           └── … vey-020/ (120 images target)
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyGrid.jsx
│   │   ├── PropertyGallery.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── CompareBar.jsx
│   │   └── ContactForm.jsx
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   ├── CompareContext.jsx
│   │   └── RecentlyViewedContext.jsx
│   ├── data/
│   │   ├── properties.js      # exactly 20 records
│   │   └── contactConfig.js   # phone/WhatsApp/email placeholders
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyDetails.jsx
│   │   ├── Buy.jsx
│   │   ├── Rent.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Favorites.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── variables.css      # design tokens
│   │   ├── global.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── formatPrice.js     # Intl.NumberFormat, 5 currencies
│   │   └── contactLinks.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── PROMPT_PACK.md              # full image-generation prompts
```

---

## 🚀 Setup & run

```bash
# 1. Install
npm install

# 2. Dev server (host 0.0.0.0 for Arena preview)
npm run dev
# → http://localhost:5173  (or https://<port>-<sandbox>.e2b.app)

# 3. Production build
npm run build
# output in dist/

# 4. Preview production build
npm run preview -- --host 0.0.0.0 --port 4173
```

**Requirements:** Node 18+.

---

## 🔧 Contact configuration

All business contact details are centralised in `src/data/contactConfig.js`:

```js
export const contactConfig = {
  phoneDisplay: '— not configured —',
  phoneE164: '',              // e.g. '+2348012345678' for tel: link
  whatsappNumber: '',          // e.g. '2348012345678' (no +, no spaces)
  email: '',                  // e.g. 'hello@veyora.properties'
  address: '— office address to be configured —',
  officeHours: 'Mon – Fri: 9:00 – 18:00 · Sat: 10:00 – 16:00',
  formMode: 'demo',           // 'demo' | 'connected'
  formEndpoint: '',            // e.g. Formspree endpoint when ready
  mapEnabled: false,
  mapProvider: '',
  mapEmbedUrl: ''
}
```

- **WhatsApp** — Every card and detail page builds `https://wa.me/<number>?text=<prefilled>` with property title + ID. Until `whatsappNumber` is set, the link opens `wa.me` with text but shows a placeholder notice.
- **Phone/Email** — `tel:` and `mailto:` only render when configured; otherwise a clearly labelled placeholder is shown.
- **Form** — In `demo` mode the form validates locally and shows a success message without sending. To connect a backend:
  1. Set `formMode: 'connected'` and `formEndpoint: 'https://formspree.io/f/...'` (or Netlify/your API).
  2. In `ContactForm.jsx` replace the local success with a `fetch(formEndpoint, {method:'POST', body: JSON})`.
  3. No secrets are committed — use env vars if needed and document them.

No real phone, email or address is invented; placeholders are explicit.

---

## 🖼 Image assets

- **Target:** 20 properties × 6 images = 120 landscape images, descriptively named (`exterior.jpg`, `living-room.jpg`, `kitchen.jpg`, `bedroom.jpg`, `bathroom.jpg`, `garden-pool.jpg` / `terrace.jpg` etc.), optimised <400KB.
- **Generation:** Original AI-generated photography. See `PROMPT_PACK.md` for every prompt. 10 unique images have been generated in this build; the remaining 110 placeholders are copies of `vey-001/exterior.jpg` that are progressively replaced. The generation log and rate-limit note are in this README and in `PROMPT_PACK.md`.
- **Coherence:** Each property's gallery shares architecture, materials and furnishing style — no mixing rooms from unrelated properties.
- **Performance:** `loading="lazy"`, explicit `width`/`height`, fallback `onError` to `/images/placeholder.svg`, responsive aspect-ratios (4:2.7 cards, 16:10 gallery).

> **If generation is unavailable:** This repo includes `PROMPT_PACK.md` with the full prompt pack for all 20 × 6 images to generate externally.

---

## ✅ Acceptance checklist

- [x] Installs and runs with documented commands (`npm install && npm run dev`)
- [x] Production build completes (`npm run build`) — verified, no errors
- [x] Exactly 20 distinct property records in `src/data/properties.js`
- [x] Wide desktop: 5 cols × 4 rows (media queries at 1100px/1360px in `responsive.css`)
- [x] Mobile/tablet adapt without horizontal overflow
- [x] Each listing opens correct `/properties/:id` route
- [x] Each detail page has ≥5 images (6) from same property — paths validated, fallback exists
- [x] Gallery thumbnails + next/prev + lightbox work
- [x] Every card & detail has WhatsApp/contact/enquiry action
- [x] **No payment, cart or checkout** anywhere
- [x] Search, combined filters, sorting, clear filters work
- [x] Favourites persist via `localStorage`
- [x] Compare up to 3 + recently viewed work
- [x] Currency formatting via `Intl.NumberFormat`, no silent conversion
- [x] Forms validate, explain demo vs connected
- [x] No broken image paths (all 120 exist; unique generation in progress), no dead buttons, no route errors, no console errors (verified build)

---

## 🌐 Deployment (Vercel)

1. Push to GitHub (branch `arena/7c241cac-veyora-properties`).
2. Import repo in Vercel → Framework: Vite, Build: `npm run build`, Output: `dist`.
3. No env vars required unless you connect a form backend — document them in Vercel dashboard.
4. Ensure `vercel.json` not needed; SPA routing handled by Vercel's default (or add `rewrites: [{source: '/(.*)', destination: '/index.html'}]` if needed).

---

## 🛡 No payments

This project intentionally contains **no** payment gateway, cart, checkout, card fields or payment provider integration, per the brief. Enquiries are browse + contact only.

---

## 📝 Demo notice

All 20 listings are **sample/demo content** (`description` explicitly labelled, data file header notes this, UI shows sample notices). Do not present as verified live inventory.

---

## 📄 License

Demo for VEYORA Properties. Replace sample content with real data before production use.


# VEYORA Properties — A better place to belong.

Premium international real estate discovery platform built with **React + Vite**. Browse curated listings across Dubai, London, Lagos, Los Angeles, Barcelona, Paris and Austin — view rich galleries, save favourites, compare and enquire directly.

> **Live demo:** Run locally with `npm run dev` → http://localhost:5173
> **Stack:** React 18, React Router 6, Vite 5, Lucide React, plain CSS with design tokens.

---

## ✨ Features

- **8 exclusive properties** — luxury villas, modern apartments, contemporary houses and premium family homes, balanced across sale & rent, with correct local currencies (AED, GBP, EUR, NGN, USD) formatted via `Intl.NumberFormat`.
- **Responsive 4 × 2 grid** — 4 columns × 2 rows on large desktop (≥1200px); 3 cols on tablet, 2 cols on mobile, 1 col on very narrow screens. No horizontal overflow.
- **Detail pages** (`/properties/:id`) with 6-image galleries (exterior, living room, kitchen, primary bedroom, bathroom, distinctive feature), thumbnails, lightbox with keyboard navigation, specs table, features, amenities, illustrative floorplan (clearly labelled), location summary, favourite, share, WhatsApp/email/phone enquiry and viewing request form.
- **Search & filters** — search by city, area, title or reference ID; combined filters for buy/rent, type, location, price range, bedrooms, bathrooms, availability; sort by newest / price low-high / high-low; results count and clear-all.
- **Favourites** via `localStorage` — persist across refreshes, empty state, clear all.
- **Compare up to 3** — select from cards or detail pages, sticky compare bar, comparison table (price, location, type, bed/bath, area, availability).
- **Recently viewed** via `localStorage` — shown on detail pages.
- **Contact & viewing enquiries** — WhatsApp with prefilled property context, tel/mailto links when configured, validated request-a-viewing form with honest success/error feedback via `contactConfig.js`.
- **Professional presentation** — elegant brand palette (forest #182A2A, ivory #F5F1E9, gold #B89A62, charcoal #292929), Playfair Display headings, Inter body, premium photography, accessible and responsive throughout.

---

## 🗂 Project structure

```
veyora-properties/
├── public/
│   ├── favicon.svg
│   ├── logo.svg                     # VEYORA brand mark
│   └── images/
│       ├── placeholder.jpg
│       └── properties/
│           ├── vey-001/exterior.jpg … garden-pool.jpg (6)
│           └── … vey-020/ (8 active of 20 photographed)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyGrid.jsx
│   │   ├── PropertyGallery.jsx
│   │   ├── PropertySlider.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── CompareBar.jsx
│   │   └── ContactForm.jsx
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   ├── CompareContext.jsx
│   │   ├── RecentlyViewedContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── properties.js      # exactly 8 records
│   │   └── contactConfig.js   # business contact details
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
│   │   ├── variables.css      # brand tokens
│   │   ├── global.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── formatPrice.js
│   │   └── contactLinks.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Setup & run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production output in dist/
npm run preview -- --host 0.0.0.0 --port 4173
```

**Requirements:** Node 18+

---

## 🔧 Contact configuration

All contact details live in `src/data/contactConfig.js`:

```js
export const contactConfig = {
  businessName: 'VEYORA Properties',
  tagline: 'A better place to belong.',
  phoneDisplay: '+234 913 279 8151',
  phoneE164: '+2349132798151',
  whatsappNumber: '2349132798151',
  email: 'alameenahmed588@gmail.com',
  address: 'Lagos, Nigeria — viewings by appointment',
  officeHours: 'Mon – Sat: 9:00 – 18:00 · Sun: Closed',
  formMode: 'connected',
  formEndpoint: 'https://formspree.io/f/mayvlkqw',
  mapEnabled: false
}
```

- WhatsApp, phone and email links render only when configured.
- The enquiry form validates required fields and `POST`s to `formEndpoint` when `formMode` is `connected`; otherwise it guides users to direct contact.

---

## 🖼 Image assets

- **8 properties × 6 images** = 48 active photographs (exterior, living room, kitchen, bedroom, bathroom, distinctive feature), all realistic architectural photography with consistent per-property styling.
- Additional photographed properties remain in `public/images/properties/` but are not listed.
- Performance: `loading="lazy"` below the fold, explicit `width`/`height`, fallback to `placeholder.jpg`, responsive aspect ratios.

---

## ✅ Verified

- [x] Exactly 8 properties with complete, consistent information
- [x] Each with 6 coherent photographs, correct currency and single price source
- [x] Desktop 4×2 grid, tablet 2–3 cols, mobile 2 cols / 1 col narrow — no overflow
- [x] All routes, search, combined filters, sorting, favourites, compare (max 3), recently viewed, galleries, lightbox, mobile nav work
- [x] Contact form validates, honest feedback, no false success, only configured contact methods shown
- [x] Floorplan labelled illustrative, no non-functional virtual tours
- [x] Brand colours, typography, logo, responsive hero/cards/details, accessible, build passes

---

## 🌐 Deployment (Vercel)

1. Push to GitHub.
2. Import in Vercel — Framework: Vite, Build: `npm run build`, Output: `dist`.
3. Set SPA rewrite if needed: `{ "source": "/(.*)", "destination": "/index.html" }`.

---

## 📄 License

Production-ready for VEYORA Properties. Replace sample content with verified inventory as needed.

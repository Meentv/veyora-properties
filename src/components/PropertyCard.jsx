import { Link } from 'react-router-dom'
import { Heart, BedDouble, Bath, Maximize2, MapPin, MessageCircle, Eye } from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'
import { useFavorites } from '../context/FavoritesContext'
import { buildWhatsAppLink } from '../utils/contactLinks'
import { useCompare } from '../context/CompareContext'

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isCompared, toggleCompare, canAdd } = useCompare()
  const fav = isFavorite(property.id)
  const compared = isCompared(property.id)

  const cover = property.images[0]

  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/properties/${property.id}`} aria-label={`View ${property.title}`}>
          <img
            src={cover}
            alt={`${property.title} — ${property.propertyType} in ${property.location.city}`}
            loading="lazy"
            width={400}
            height={260}
            onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg' }}
          />
        </Link>
        <div className="pcard-top">
          <span className={`badge ${property.listingType==='sale'?'badge-sale':'badge-rent'}`}>{property.listingType==='sale'?'For Sale':'For Rent'}</span>
          <button
            className={`pcard-fav ${fav?'fav-on':''}`}
            onClick={() => toggleFavorite(property.id)}
            aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
            aria-pressed={fav}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="pcard-availability">
          <span className={`badge ${property.availability==='available'?'badge-available':'badge-reserved'}`}>{property.availability}</span>
        </div>
      </div>

      <div className="pcard-body">
        <div className="pcard-location"><MapPin size={12}/> {property.location.area} · {property.location.city}</div>
        <Link to={`/properties/${property.id}`} className="pcard-title">{property.title}</Link>
        <div className="pcard-price">{formatPrice(property.price, property.currency)} <span className="pcard-type">{property.propertyType} · {property.listingType}</span></div>

        <div className="pcard-facts">
          <span><BedDouble size={14}/> {property.bedrooms} bd</span>
          <span><Bath size={14}/> {property.bathrooms} ba</span>
          <span><Maximize2 size={14}/> {property.areaSqm} m²</span>
        </div>

        <div className="pcard-actions">
          <Link to={`/properties/${property.id}`} className="btn btn-primary btn-sm" style={{flex:1}}><Eye size={14}/> View Details</Link>
          <a
            href={buildWhatsAppLink(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{flex:1}}
          >
            <MessageCircle size={14}/> Enquire
          </a>
        </div>

        <label className="pcard-compare">
          <input
            type="checkbox"
            checked={compared}
            onChange={() => toggleCompare(property.id)}
            disabled={!compared && !canAdd}
          />
          <span>{compared ? 'Added to compare' : canAdd ? 'Compare' : 'Compare full (max 3)'}</span>
        </label>
      </div>

      <style>{`
        .pcard {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display:flex; flex-direction:column;
          transition: box-shadow .18s, transform .18s;
        }
        .pcard:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
        .pcard-media { position:relative; aspect-ratio: 4/2.7; overflow:hidden; background: var(--color-ivory); }
        .pcard-media img { width:100%; height:100%; object-fit:cover; transition: transform .4s; }
        .pcard:hover .pcard-media img { transform: scale(1.04); }
        .pcard-top {
          position:absolute; top:10px; left:10px; right:10px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .pcard-fav {
          width:34px; height:34px; border-radius:999px;
          border:1px solid rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.92);
          display:grid; place-items:center;
          cursor:pointer; color: var(--color-forest);
          backdrop-filter: blur(6px);
        }
        .pcard-fav.fav-on { background: var(--color-forest); color: var(--color-gold); border-color: var(--color-forest); }
        .pcard-availability { position:absolute; bottom:10px; left:10px; }
        .pcard-body { padding:12px 14px 14px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .pcard-location { font-size:11px; color:var(--color-muted); display:flex; gap:6px; align-items:center; letter-spacing:.02em; }
        .pcard-title { font-family: var(--font-serif); font-weight:600; font-size:15px; line-height:1.3; color:var(--color-forest); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; min-height:38px; }
        .pcard-title:hover { color: var(--color-gold-dark); }
        .pcard-price { font-weight:700; font-size:15px; color:var(--color-forest); display:flex; gap:8px; align-items:baseline; flex-wrap:wrap; }
        .pcard-type { font-weight:400; font-size:12px; color:var(--color-muted); text-transform:capitalize; }
        .pcard-facts { display:flex; gap:10px; font-size:12px; color:var(--color-muted); border-top:1px solid var(--color-border); padding-top:8px; margin-top:2px; }
        .pcard-facts span { display:flex; gap:5px; align-items:center; }
        .pcard-actions { display:flex; gap:8px; margin-top:4px; }
        @media(max-width:400px){ .pcard-actions{ flex-direction:column; } .pcard-actions .btn{ width:100%; } }
        .pcard-compare { display:flex; gap:8px; align-items:center; font-size:12px; color:var(--color-muted); cursor:pointer; margin-top:2px; }
        .pcard-compare input { accent-color: var(--color-forest); }
      `}</style>
    </article>
  )
}

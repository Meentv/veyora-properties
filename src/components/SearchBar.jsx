import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <Search size={18} className="searchbar-icon" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search by city, area, title or reference ID…'}
        aria-label="Search properties"
      />
      {value && (
        <button className="searchbar-clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16}/>
        </button>
      )}

      <style>{`
        .searchbar {
          position:relative;
          display:flex; align-items:center;
          background: var(--color-white);
          border:1px solid var(--color-border);
          border-radius: var(--radius-pill);
          padding: 8px 14px;
          gap:10px;
          flex:1;
          max-width: 640px;
        }
        .searchbar:focus-within { border-color: var(--color-forest); box-shadow: 0 0 0 3px rgba(24,42,42,0.08); }
        .searchbar-icon { color: var(--color-muted); flex:none; }
        .searchbar input {
          flex:1; border:none; outline:none;
          font-size:14px; background:transparent;
        }
        .searchbar-clear {
          border:none; background: var(--color-ivory);
          width:28px; height:28px; border-radius:999px;
          display:grid; place-items:center; cursor:pointer;
        }
      `}</style>
    </div>
  )
}

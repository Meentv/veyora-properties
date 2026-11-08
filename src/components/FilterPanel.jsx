import { SlidersHorizontal, X } from 'lucide-react'

export default function FilterPanel({ filters, onChange, onClear, resultCount, locations, propertyTypes }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <aside className="filter-panel">
      <div className="filter-head">
        <h3><SlidersHorizontal size={16}/> Filters</h3>
        <button className="btn btn-outline btn-sm" onClick={onClear}>Clear all</button>
      </div>

      <div className="filter-group">
        <label>Listing type</label>
        <select value={filters.listingType} onChange={e => update('listingType', e.target.value)}>
          <option value="all">All — Buy & Rent</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Property type</label>
        <select value={filters.propertyType} onChange={e => update('propertyType', e.target.value)}>
          <option value="all">All types</option>
          {propertyTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select value={filters.location} onChange={e => update('location', e.target.value)}>
          <option value="all">All locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      <div className="filter-group two">
        <div>
          <label>Min price</label>
          <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => update('minPrice', e.target.value)} />
        </div>
        <div>
          <label>Max price</label>
          <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => update('maxPrice', e.target.value)} />
        </div>
      </div>

      <div className="filter-group two">
        <div>
          <label>Min beds</label>
          <select value={filters.minBeds} onChange={e => update('minBeds', e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div>
          <label>Min baths</label>
          <select value={filters.minBaths} onChange={e => update('minBaths', e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label>Availability</label>
        <select value={filters.availability} onChange={e => update('availability', e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort</label>
        <select value={filters.sort} onChange={e => update('sort', e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="filter-count">{resultCount} {resultCount===1?'property':'properties'} found</div>

      <div className="active-chips">
        {filters.listingType!=='all' && <span className="chip">{filters.listingType} <button onClick={()=>update('listingType','all')}><X size={12}/></button></span>}
        {filters.propertyType!=='all' && <span className="chip">{filters.propertyType} <button onClick={()=>update('propertyType','all')}><X size={12}/></button></span>}
        {filters.location!=='all' && <span className="chip">{filters.location} <button onClick={()=>update('location','all')}><X size={12}/></button></span>}
        {filters.availability!=='all' && <span className="chip">{filters.availability} <button onClick={()=>update('availability','all')}><X size={12}/></button></span>}
      </div>

      <style>{`
        .filter-panel {
          background: var(--color-white);
          border:1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding:16px;
          position:sticky; top:84px;
          height: fit-content;
        }
        .filter-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .filter-head h3 { margin:0; font-size:14px; display:flex; gap:8px; align-items:center; color:var(--color-forest); }
        .filter-group { margin-bottom:14px; }
        .filter-group label { display:block; font-size:12px; font-weight:600; color:var(--color-forest); margin-bottom:6px; letter-spacing:.02em; }
        .filter-group select, .filter-group input {
          width:100%; padding:9px 11px;
          border:1px solid var(--color-border); border-radius: var(--radius-sm);
          font-size:13px; background: var(--color-white);
        }
        .filter-group.two { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .filter-count { font-size:13px; color:var(--color-muted); padding-top:10px; border-top:1px solid var(--color-border); margin-top:6px; }
        .active-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .chip {
          display:inline-flex; align-items:center; gap:6px;
          background: var(--color-ivory); border:1px solid var(--color-border);
          padding:5px 8px; border-radius:999px; font-size:12px;
          text-transform:capitalize;
        }
        .chip button { border:none; background:var(--color-white); width:18px; height:18px; border-radius:999px; display:grid; place-items:center; cursor:pointer; }
        @media(max-width:979px){ .filter-panel{ position:static; } }
      `}</style>
    </aside>
  )
}

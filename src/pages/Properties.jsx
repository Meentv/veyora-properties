import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { properties } from '../data/properties'
import PropertyGrid from '../components/PropertyGrid'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import CompareBar from '../components/CompareBar'
import { useCompare } from '../context/CompareContext'
import { formatPrice } from '../utils/formatPrice'

export default function Properties() {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialType = searchParams.get('type') || 'all'

  const [search, setSearch] = useState(initialSearch)
  const [filters, setFilters] = useState({
    listingType: 'all',
    propertyType: initialType,
    location: 'all',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    minBaths: '',
    availability: 'all',
    sort: 'newest'
  })
  const [visibleCount, setVisibleCount] = useState(12)
  const [showFilters, setShowFilters] = useState(false)

  // sync initial type changes
  useEffect(()=>{ if(initialType!=='all') setFilters(f=>({...f, propertyType: initialType})) },[initialType])
  useEffect(()=>{ if(initialSearch) setSearch(initialSearch) },[initialSearch])

  const locations = useMemo(()=> [...new Set(properties.map(p=> `${p.location.city} — ${p.location.area}`))].sort(),[])
  const propertyTypes = useMemo(()=> [...new Set(properties.map(p=>p.propertyType))].sort(),[])

  const filtered = useMemo(()=>{
    let res = [...properties]

    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.area.toLowerCase().includes(q) ||
        p.location.country.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      )
    }
    if (filters.listingType !== 'all') res = res.filter(p=>p.listingType===filters.listingType)
    if (filters.propertyType !== 'all') res = res.filter(p=>p.propertyType===filters.propertyType)
    if (filters.location !== 'all') res = res.filter(p=> `${p.location.city} — ${p.location.area}`===filters.location)
    if (filters.minPrice) res = res.filter(p=>p.price >= Number(filters.minPrice))
    if (filters.maxPrice) res = res.filter(p=>p.price <= Number(filters.maxPrice))
    if (filters.minBeds) res = res.filter(p=>p.bedrooms >= Number(filters.minBeds))
    if (filters.minBaths) res = res.filter(p=>p.bathrooms >= Number(filters.minBaths))
    if (filters.availability !== 'all') res = res.filter(p=>p.availability===filters.availability)

    if (filters.sort === 'price-asc') res.sort((a,b)=>a.price-b.price)
    if (filters.sort === 'price-desc') res.sort((a,b)=>b.price-a.price)
    if (filters.sort === 'newest') res.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))

    return res
  }, [search, filters])

  const visible = filtered.slice(0, visibleCount)
  const { compareIds } = useCompare()

  const clearAll = () => {
    setSearch('')
    setFilters({
      listingType:'all', propertyType:'all', location:'all',
      minPrice:'', maxPrice:'', minBeds:'', minBaths:'',
      availability:'all', sort:'newest'
    })
    setVisibleCount(12)
  }

  return (
    <div className="page-properties">
      <div className="container">
        <div className="page-head">
          <div>
            <div className="eyebrow">CATALOGUE · 20 SAMPLE LISTINGS</div>
            <h1 className="heading-serif">All properties</h1>
            <p>On wide desktop this catalogue is a 5 × 4 grid (20 cards). It adapts responsively to tablet and phone without horizontal overflow.</p>
          </div>
          <div className="page-head-actions">
            <div className="head-search">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button className="btn btn-outline btn-sm mobile-only" onClick={()=>setShowFilters(v=>!v)}>{showFilters?'Hide filters':'Show filters'}</button>
          </div>
        </div>

        <div className="results-bar">
          <span><strong>{filtered.length}</strong> {filtered.length===1?'result':'results'} {search && <>for “{search}”</>}</span>
          {compareIds.length>=2 && <span className="compare-hint">Compare {compareIds.length} selected — scroll to table</span>}
        </div>

        <div className="filter-layout">
          <div className={`filter-col ${showFilters?'open':''}`}>
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onClear={clearAll}
              resultCount={filtered.length}
              locations={locations}
              propertyTypes={propertyTypes}
            />
          </div>

          <div className="grid-col">
            <PropertyGrid properties={visible} />

            {visible.length < filtered.length && (
              <div style={{textAlign:'center', marginTop:20}}>
                <button className="btn btn-outline" onClick={()=>setVisibleCount(c=>c+8)}>Load more ({filtered.length - visible.length} remaining)</button>
              </div>
            )}

            {/* Compare table */}
            {compareIds.length>=2 && (
              <div id="compare-table" className="compare-table-wrap">
                <h3 className="heading-serif" style={{marginTop:28}}>Compare properties</h3>
                <div className="compare-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        {compareIds.map(id=>{
                          const p=properties.find(x=>x.id===id); if(!p) return null
                          return <th key={id}><img src={p.images[0]} alt={p.title} style={{width:120, height:80, objectFit:'cover', borderRadius:8}}/><div style={{marginTop:6, fontSize:13}}>{p.title}</div><div style={{fontWeight:400, fontSize:12, color:'var(--color-muted)'}}>{p.id}</div></th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Price</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?formatPrice(p.price,p.currency):''}</td>})}</tr>
                      <tr><td>Location</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?`${p.location.area}, ${p.location.city}`:''}</td>})}</tr>
                      <tr><td>Type</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?`${p.propertyType} · ${p.listingType}`:''}</td>})}</tr>
                      <tr><td>Bed / Bath</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?`${p.bedrooms} bd / ${p.bathrooms} ba`:''}</td>})}</tr>
                      <tr><td>Area</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?`${p.areaSqm} m²`:''}</td>})}</tr>
                      <tr><td>Availability</td>{compareIds.map(id=>{const p=properties.find(x=>x.id===id); return <td key={id}>{p?p.availability:''}</td>})}</tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CompareBar />

      <style>{`
        .page-properties { padding: 28px 0 0; }
        .page-head h1 { margin:6px 0 6px; font-size:30px; }
        .page-head p { color: var(--color-muted); font-size:14px; max-width:720px; line-height:1.6; margin:0; }
        .page-head-actions { margin-top:14px; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .head-search { flex:1; max-width:560px; min-width:260px; }
        .results-bar { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:14px 0; border-bottom:1px solid var(--color-border); margin:14px 0 18px; font-size:13px; color: var(--color-muted); }
        .results-bar strong { color: var(--color-forest); }
        .compare-hint { background: var(--color-ivory); border:1px solid var(--color-border); padding:6px 10px; border-radius:999px; font-size:12px; }
        .filter-col { display:none; }
        .filter-col.open { display:block; }
        @media(min-width:980px){ .filter-col{ display:block; } .mobile-only{ display:none !important; } }

        .compare-table-wrap { margin-top:18px; overflow-x:auto; }
        .compare-table { border:1px solid var(--color-border); border-radius:12px; overflow:hidden; background:white; }
        .compare-table table { width:100%; border-collapse:collapse; min-width:520px; }
        .compare-table th, .compare-table td { padding:12px 14px; border-bottom:1px solid var(--color-border); text-align:left; font-size:14px; }
        .compare-table th { background: var(--color-ivory); font-weight:600; color: var(--color-forest); }
        .compare-table td:first-child { font-weight:600; color: var(--color-forest); background:#fcfaf7; width:140px; }
      `}</style>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Scale, X, Eye } from 'lucide-react'
import { useCompare } from '../context/CompareContext'
import { properties } from '../data/properties'
import { formatPrice } from '../utils/formatPrice'

export default function CompareBar() {
  const { compareIds, removeCompare, clearCompare } = useCompare()
  if (!compareIds.length) return null

  const items = compareIds.map(id => properties.find(p=>p.id===id)).filter(Boolean)

  return (
    <div className="compare-bar">
      <div className="container compare-bar-inner">
        <div className="compare-head">
          <Scale size={16}/> Compare <span>({items.length}/3)</span>
          <button className="btn btn-outline btn-sm" onClick={clearCompare}>Clear</button>
        </div>

        <div className="compare-items">
          {items.map(p => (
            <div key={p.id} className="compare-item">
              <img src={p.images[0]} alt={p.title} />
              <div className="compare-item-meta">
                <strong>{p.title}</strong>
                <span>{p.location.city} · {formatPrice(p.price, p.currency)}</span>
              </div>
              <button onClick={()=>removeCompare(p.id)} aria-label={`Remove ${p.title}`}><X size={14}/></button>
            </div>
          ))}
          {items.length < 3 && (
            <div className="compare-placeholder">Add {3-items.length} more to compare</div>
          )}
        </div>

        {items.length >=2 && (
          <button className="btn btn-primary btn-sm" onClick={()=>{
            document.getElementById('compare-table')?.scrollIntoView({behavior:'smooth'})
          }}>
            <Eye size={14}/> View Comparison
          </button>
        )}
      </div>

      <style>{`
        .compare-bar {
          position:sticky; bottom:0; z-index:35;
          background: var(--color-white);
          border-top:1px solid var(--color-border);
          box-shadow: 0 -6px 20px rgba(0,0,0,0.08);
          padding:10px 0;
        }
        .compare-bar-inner { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
        .compare-head { display:flex; gap:8px; align-items:center; font-weight:600; color:var(--color-forest); font-size:14px; }
        .compare-items { display:flex; gap:10px; flex:1; min-width:200px; }
        .compare-item {
          display:flex; gap:8px; align-items:center;
          background: var(--color-ivory); border:1px solid var(--color-border);
          padding:6px 8px; border-radius:10px; flex:1;
          min-width:0;
        }
        .compare-item img { width:40px; height:40px; object-fit:cover; border-radius:6px; flex:none; }
        .compare-item-meta { flex:1; min-width:0; display:flex; flex-direction:column; }
        .compare-item-meta strong { font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--color-forest); }
        .compare-item-meta span { font-size:11px; color:var(--color-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .compare-item button { border:none; background:white; width:24px; height:24px; border-radius:999px; display:grid; place-items:center; cursor:pointer; flex:none; }
        .compare-placeholder { flex:1; border:1px dashed var(--color-border); border-radius:10px; display:grid; place-items:center; font-size:12px; color:var(--color-muted); padding:10px; min-height:52px; }
      `}</style>
    </div>
  )
}

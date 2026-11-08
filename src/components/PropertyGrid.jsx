import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties }) {
  if (!properties.length) {
    return (
      <div className="empty-state">
        <h3>No properties match your search</h3>
        <p>Try adjusting filters, clearing search or viewing all listings.</p>
      </div>
    )
  }
  return (
    <div className="properties-grid">
      {properties.map(p => <PropertyCard key={p.id} property={p} />)}

      <style>{`
        .empty-state {
          text-align:center; padding:48px 20px;
          border:1px dashed var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-ivory);
        }
        .empty-state h3 { font-family: var(--font-serif); margin:0 0 6px; color: var(--color-forest); }
        .empty-state p { margin:0; color: var(--color-muted); font-size:14px; }
      `}</style>
    </div>
  )
}

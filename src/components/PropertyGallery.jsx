import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const next = useCallback(() => setActive(a => (a + 1) % images.length), [images.length])
  const prev = useCallback(() => setActive(a => (a - 1 + images.length) % images.length), [images.length])

  // Keyboard navigation for lightbox + when focused on gallery
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    // Prevent background scroll
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox, next, prev])

  // Reset active if images change (e.g., property switch)
  useEffect(() => setActive(0), [images])

  return (
    <div className="gallery">
      <div className="gallery-main" role="region" aria-label={`${title} gallery`}>
        <img
          src={images[active]}
          alt={`${title} — view ${active+1} of ${images.length}: ${images[active].split('/').pop().replace('.jpg','').replace(/-/g,' ')}`}
          width={900}
          height={600}
          loading="eager"
          decoding="async"
          onError={(e)=>{e.currentTarget.src='/images/placeholder.jpg'}}
        />
        <button className="gallery-nav prev" onClick={prev} aria-label="Previous image"><ChevronLeft size={20}/></button>
        <button className="gallery-nav next" onClick={next} aria-label="Next image"><ChevronRight size={20}/></button>
        <button className="gallery-expand" onClick={()=>setLightbox(true)} aria-label="Open lightbox — enlarged view"><Expand size={16}/> View</button>
        <div className="gallery-count" aria-live="polite">{active+1} / {images.length}</div>
      </div>

      <div className="gallery-thumbs" role="tablist" aria-label="Gallery thumbnails">
        {images.map((src, i) => (
          <button key={src} role="tab" aria-selected={i===active} aria-label={`View image ${i+1} of ${images.length}`} className={`thumb ${i===active?'thumb-active':''}`} onClick={()=>setActive(i)}>
            <img src={src} alt="" width={120} height={80} loading="lazy" decoding="async" onError={e=>e.currentTarget.src='/images/placeholder.jpg'} />
          </button>
        ))}
      </div>
      <div className="gallery-hint">All {images.length} photos depict the same property — {title}. No title cards or stock placeholders in this gallery.</div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} lightbox`} onClick={()=>setLightbox(false)}>
          <div className="lightbox-inner" onClick={e=>e.stopPropagation()}>
            <button className="lightbox-close" onClick={()=>setLightbox(false)} aria-label="Close lightbox"><X size={20}/></button>
            <img src={images[active]} alt={`${title} — enlarged view ${active+1} of ${images.length}`} loading="eager" onError={e=>e.currentTarget.src='/images/placeholder.jpg'} />
            <button className="lb-nav prev" onClick={prev} aria-label="Previous"><ChevronLeft size={24}/></button>
            <button className="lb-nav next" onClick={next} aria-label="Next"><ChevronRight size={24}/></button>
            <div className="lb-count">{active+1} / {images.length} — {title}</div>
            <div className="lb-thumbs" role="tablist" aria-label="Lightbox thumbnails">
              {images.map((s,i)=>(
                <button key={s} role="tab" aria-selected={i===active} aria-label={`Image ${i+1}`} className={i===active?'on':''} onClick={()=>setActive(i)}><img src={s} alt="" loading="lazy" onError={e=>e.currentTarget.src='/images/placeholder.jpg'} /></button>
              ))}
            </div>
            <div className="lb-help">Use arrow keys or swipe · Esc to close</div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-main { position:relative; aspect-ratio: 16/10; overflow:hidden; border-radius: var(--radius-lg); background: var(--color-ivory); }
        .gallery-main img { width:100%; height:100%; object-fit:cover; }
        .gallery-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:40px; height:40px; border-radius:999px;
          border:1px solid rgba(255,255,255,0.9); background: rgba(255,255,255,0.9);
          display:grid; place-items:center; cursor:pointer; color: var(--color-forest);
        }
        .gallery-nav.prev { left:12px; } .gallery-nav.next { right:12px; }
        .gallery-expand {
          position:absolute; bottom:12px; right:12px;
          background: rgba(24,42,42,0.9); color:white; border:none;
          padding:8px 12px; border-radius:999px; display:flex; gap:6px; align-items:center;
          cursor:pointer; font-size:12px; font-weight:600;
        }
        .gallery-count {
          position:absolute; bottom:12px; left:12px;
          background: rgba(255,255,255,0.92); padding:6px 10px; border-radius:999px;
          font-size:12px; font-weight:600; color:var(--color-forest);
        }
        .gallery-thumbs { display:flex; gap:10px; margin-top:12px; overflow-x:auto; padding-bottom:6px; scroll-behavior:smooth; }
        .thumb { border:2px solid transparent; border-radius:10px; overflow:hidden; flex:none; width:96px; aspect-ratio: 4/3; padding:0; cursor:pointer; background: var(--color-ivory); }
        .thumb img { width:100%; height:100%; object-fit:cover; }
        .thumb-active { border-color: var(--color-forest); }
        .gallery-hint { font-size:11px; color: var(--color-muted); margin-top:8px; text-align:center; }

        .lightbox {
          position:fixed; inset:0; z-index:60;
          background: rgba(10,16,16,0.92);
          display:grid; place-items:center; padding:20px;
        }
        .lightbox-inner { position:relative; max-width:1100px; width:100%; display:grid; place-items:center; gap:12px; }
        .lightbox-inner img { max-width:100%; max-height:70vh; border-radius:12px; object-fit:contain; background: #0a1010; }
        .lightbox-close {
          position:absolute; top:-8px; right:-8px;
          width:40px; height:40px; border-radius:999px; border:none;
          background: white; display:grid; place-items:center; cursor:pointer; z-index:2;
        }
        .lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:999px; border:none; background:white;
          display:grid; place-items:center; cursor:pointer;
        }
        .lb-nav.prev { left:-8px; } .lb-nav.next { right:-8px; }
        .lb-count { color:white; font-size:12px; background: rgba(255,255,255,0.14); padding:6px 12px; border-radius:999px; text-align:center; }
        .lb-thumbs { display:flex; gap:8px; overflow-x:auto; max-width:100%; scroll-behavior:smooth; }
        .lb-thumbs button { border:2px solid transparent; border-radius:8px; overflow:hidden; flex:none; width:72px; height:54px; padding:0; cursor:pointer; opacity:.7; }
        .lb-thumbs button.on { border-color: var(--color-gold); opacity:1; }
        .lb-thumbs img { width:100%; height:100%; object-fit:cover; }
        .lb-help { color: #b9c7c5; font-size:11px; }
        @media(max-width:700px){ .lb-nav.prev{left:6px} .lb-nav.next{right:6px} }
      `}</style>
    </div>
  )
}

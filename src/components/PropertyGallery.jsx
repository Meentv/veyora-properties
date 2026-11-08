import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const next = () => setActive(a => (a + 1) % images.length)
  const prev = () => setActive(a => (a - 1 + images.length) % images.length)

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img
          src={images[active]}
          alt={`${title} — view ${active+1} of ${images.length}`}
          width={900}
          height={600}
          onError={(e)=>{e.currentTarget.src='/images/placeholder.jpg'}}
        />
        <button className="gallery-nav prev" onClick={prev} aria-label="Previous image"><ChevronLeft size={20}/></button>
        <button className="gallery-nav next" onClick={next} aria-label="Next image"><ChevronRight size={20}/></button>
        <button className="gallery-expand" onClick={()=>setLightbox(true)} aria-label="Open lightbox"><Expand size={16}/> View</button>
        <div className="gallery-count">{active+1} / {images.length}</div>
      </div>

      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button key={src} className={`thumb ${i===active?'thumb-active':''}`} onClick={()=>setActive(i)} aria-label={`View image ${i+1}`}>
            <img src={src} alt="" width={120} height={80} loading="lazy" onError={e=>e.currentTarget.src='/images/placeholder.jpg'} />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox" onClick={()=>setLightbox(false)}>
          <div className="lightbox-inner" onClick={e=>e.stopPropagation()}>
            <button className="lightbox-close" onClick={()=>setLightbox(false)} aria-label="Close"><X size={20}/></button>
            <img src={images[active]} alt={`${title} expanded view`} />
            <button className="lb-nav prev" onClick={prev}><ChevronLeft size={24}/></button>
            <button className="lb-nav next" onClick={next}><ChevronRight size={24}/></button>
            <div className="lb-count">{active+1} / {images.length}</div>
            <div className="lb-thumbs">
              {images.map((s,i)=>(
                <button key={s} className={i===active?'on':''} onClick={()=>setActive(i)}><img src={s} alt="" /></button>
              ))}
            </div>
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
        .gallery-thumbs { display:flex; gap:10px; margin-top:12px; overflow-x:auto; padding-bottom:6px; }
        .thumb { border:2px solid transparent; border-radius:10px; overflow:hidden; flex:none; width:96px; aspect-ratio: 4/3; padding:0; cursor:pointer; background: var(--color-ivory); }
        .thumb img { width:100%; height:100%; object-fit:cover; }
        .thumb-active { border-color: var(--color-forest); }

        .lightbox {
          position:fixed; inset:0; z-index:60;
          background: rgba(10,16,16,0.92);
          display:grid; place-items:center; padding:20px;
        }
        .lightbox-inner { position:relative; max-width:1100px; width:100%; display:grid; place-items:center; gap:16px; }
        .lightbox-inner img { max-width:100%; max-height:70vh; border-radius:12px; object-fit:contain; }
        .lightbox-close {
          position:absolute; top:-8px; right:-8px;
          width:40px; height:40px; border-radius:999px; border:none;
          background: white; display:grid; place-items:center; cursor:pointer;
        }
        .lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:999px; border:none; background:white;
          display:grid; place-items:center; cursor:pointer;
        }
        .lb-nav.prev { left:-8px; } .lb-nav.next { right:-8px; }
        .lb-count { color:white; font-size:13px; background: rgba(255,255,255,0.14); padding:6px 12px; border-radius:999px; }
        .lb-thumbs { display:flex; gap:8px; overflow-x:auto; max-width:100%; }
        .lb-thumbs button { border:2px solid transparent; border-radius:8px; overflow:hidden; flex:none; width:72px; height:54px; padding:0; cursor:pointer; opacity:.7; }
        .lb-thumbs button.on { border-color: var(--color-gold); opacity:1; }
        .lb-thumbs img { width:100%; height:100%; object-fit:cover; }
        @media(max-width:700px){ .lb-nav.prev{left:6px} .lb-nav.next{right:6px} }
      `}</style>
    </div>
  )
}

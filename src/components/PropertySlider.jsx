import { useRef, useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard'

export default function PropertySlider({ properties, title = 'Featured properties', autoPlay = true }) {
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [paused, setPaused] = useState(false)
  const autoRef = useRef(null)

  const updateState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, clientWidth, scrollWidth } = el
    setCanLeft(scrollLeft > 8)
    setCanRight(scrollLeft + clientWidth < scrollWidth - 8)
    // active index from scroll position
    const itemW = 336 // 320 card + 16 gap
    const idx = Math.round(scrollLeft / itemW)
    setActive(Math.max(0, Math.min(properties.length -1, idx)))
  }, [properties.length])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    updateState()
    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [updateState])

  const scrollTo = (idx) => {
    const el = scrollerRef.current
    if (!el) return
    const itemW = el.firstChild ? el.firstChild.offsetWidth + 16 : 336
    el.scrollTo({ left: idx * itemW, behavior: 'smooth' })
  }

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = el.clientWidth * 0.85
    el.scrollBy({ left: dir === 'left' ? -delta : delta, behavior: 'smooth' })
  }

  // autoplay with pause on hover / touch / interaction
  useEffect(() => {
    if (!autoPlay || paused) return
    autoRef.current = setInterval(() => {
      const el = scrollerRef.current
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
      else el.scrollBy({ left: 360, behavior: 'smooth' })
    }, 3800)
    return () => clearInterval(autoRef.current)
  }, [autoPlay, paused, properties])

  // drag / swipe
  const drag = useRef({ x: 0, scroll: 0, dragging: false })
  const onPointerDown = (e) => {
    const el = scrollerRef.current
    if (!el) return
    drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, scroll: el.scrollLeft, dragging: true }
    el.style.scrollSnapType = 'none'
    el.style.cursor = 'grabbing'
    setPaused(true)
  }
  const onPointerMove = (e) => {
    if (!drag.current.dragging) return
    const el = scrollerRef.current
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    el.scrollLeft = drag.current.scroll - (x - drag.current.x)
  }
  const onPointerUp = () => {
    const el = scrollerRef.current
    if (!el) return
    drag.current.dragging = false
    el.style.scrollSnapType = 'x mandatory'
    el.style.cursor = ''
    setTimeout(()=> setPaused(false), 1200)
  }

  return (
    <div
      className="pslider"
      onMouseEnter={()=> autoPlay && setPaused(true)}
      onMouseLeave={()=> setPaused(false)}
      onTouchStart={()=> setPaused(true)}
      onTouchEnd={()=> setTimeout(()=> setPaused(false), 1500)}
    >
      <div className="pslider-top">
        <div className="pslider-dots" role="tablist" aria-label={title}>
          {properties.map((p,i)=> (
            <button
              key={p.id}
              role="tab"
              aria-selected={i===active}
              aria-label={`Go to ${p.title} ${i+1} of ${properties.length}`}
              className={`dot ${i===active ? 'dot-active' : ''}`}
              onClick={()=> scrollTo(i)}
            />
          ))}
        </div>
        <div className="pslider-progress" aria-hidden="true">
          <div className="pslider-progress-bar" style={{ width: `${((active+1)/properties.length)*100}%` }} />
        </div>
        <div className="pslider-controls">
          <button aria-label="Previous" onClick={()=> scroll('left')} disabled={!canLeft} className="slider-btn">
            <ChevronLeft size={18}/>
          </button>
          <button aria-label="Next" onClick={()=> scroll('right')} disabled={!canRight} className="slider-btn primary">
            <ChevronRight size={18}/>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="pslider-track"
        role="region"
        aria-label={title}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {properties.map(p => (
          <div key={p.id} className="pslider-item">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>

      <div className="pslider-hint">
        <span className="hint-line" />
        <span>Drag, swipe or use arrows — {properties.length} homes</span>
        <span className="hint-line" />
      </div>

      <style>{`
        .pslider { position: relative; }
        .pslider-top {
          display:flex; align-items:center; gap:14px;
          margin-bottom: 14px;
          padding: 0 2px;
        }
        .pslider-dots {
          display:flex; gap:6px; align-items:center; flex-wrap:wrap;
        }
        .dot {
          width:7px; height:7px; border-radius:999px;
          border:none; background: var(--color-border-dark);
          padding:0; cursor:pointer; transition: all .22s ease;
          opacity:.9;
        }
        .dot-active {
          width:28px; height:7px;
          background: var(--color-gold);
          box-shadow: 0 1px 6px rgba(201,168,106,.45);
        }
        .dot:focus-visible { outline:2px solid var(--color-gold); outline-offset:2px; }
        .pslider-progress {
          flex:1; height:2px; background: var(--color-border);
          border-radius:999px; overflow:hidden; max-width: 220px;
        }
        .pslider-progress-bar {
          height:100%; background: var(--color-gold);
          border-radius:999px; transition: width .45s ease;
        }
        .pslider-controls { display:flex; gap:8px; margin-left:auto; }
        .slider-btn {
          width:38px; height:38px; border-radius:999px;
          border:1px solid var(--color-border-dark);
          background: var(--color-card);
          display:grid; place-items:center; cursor:pointer;
          color: var(--color-forest); transition: all .18s;
          box-shadow: var(--shadow-sm);
        }
        .slider-btn:hover:not(:disabled) { border-color: var(--color-forest); transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .slider-btn:disabled { opacity:.32; cursor:default; box-shadow:none; transform:none; }
        .slider-btn.primary { background: var(--color-forest); color: var(--color-white); border-color: var(--color-forest); }
        .slider-btn.primary:hover:not(:disabled) { background: var(--color-forest-light); }

        .pslider-track {
          display:flex; gap:16px;
          overflow-x:auto; overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 6px 4px 14px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          mask-image: linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%);
        }
        .pslider-track::-webkit-scrollbar { display:none; }
        .pslider-track:active { cursor: grabbing; }
        .pslider-item {
          flex: 0 0 320px;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        .pslider-item .pcard { height: 100%; box-shadow: var(--shadow-sm); }
        .pslider-item .pcard:hover { box-shadow: var(--shadow-lg); }

        .pslider-hint {
          display:flex; align-items:center; justify-content:center; gap:10px;
          margin-top: 8px;
          font-size: 11px; letter-spacing:.08em; text-transform: uppercase;
          color: var(--color-muted); font-weight: 600;
        }
        .hint-line { flex:0 0 22px; height:1px; background: var(--color-border); }

        @media(max-width: 768px){
          .pslider-item { flex: 0 0 300px; }
          .pslider-progress { max-width: 120px; }
        }
        @media(max-width: 640px){
          .pslider-top { gap:10px; }
          .pslider-item { flex: 0 0 85vw; max-width: 340px; }
          .pslider-track { gap:12px; padding-left:2px; padding-right:2px; }
          .pslider-progress { display:none; }
          .slider-btn { width:36px; height:36px; }
        }
        @media(max-width: 360px){
          .pslider-item { flex: 0 0 88vw; }
        }
        @media(prefers-reduced-motion: reduce){
          .pslider-track { scroll-behavior: auto; scroll-snap-type: none; }
          .dot, .pslider-progress-bar { transition: none; }
        }
      `}</style>
    </div>
  )
}

import { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard'

export default function PropertySlider({ properties, title = 'Slide through properties', autoPlay = true }) {
  const scrollerRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [properties])

  useEffect(() => {
    if (!autoPlay) return
    const el = scrollerRef.current
    if (!el) return
    const id = setInterval(() => {
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
      else el.scrollBy({ left: 340, behavior: 'smooth' })
    }, 3500)
    return () => clearInterval(id)
  }, [autoPlay, properties])

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  // Touch swipe
  const touchStart = useRef(0)
  const onTouchStart = (e) => touchStart.current = e.touches[0].clientX
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 40) scroll(dx > 0 ? 'left' : 'right')
  }

  return (
    <div className="pslider-wrap">
      <div className="pslider-header">
        <h3>{title}</h3>
        <div className="pslider-controls">
          <button aria-label="Slide left" onClick={() => scroll('left')} disabled={!canLeft} className="slider-btn"><ChevronLeft size={18}/></button>
          <button aria-label="Slide right" onClick={() => scroll('right')} disabled={!canRight} className="slider-btn"><ChevronRight size={18}/></button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="pslider-track"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label={title}
      >
        {properties.map(p => (
          <div key={p.id} className="pslider-item">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
      <div className="pslider-dots" aria-hidden="true">
        <span>Swipe or use arrows to slide →</span>
      </div>
      <style>{`
        .pslider-wrap { position:relative; }
        .pslider-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .pslider-header h3 { margin:0; font-family:var(--font-serif); color:var(--color-forest); font-size:16px; }
        .pslider-controls { display:flex; gap:8px; }
        .slider-btn {
          width:36px; height:36px; border-radius:999px; border:1px solid var(--color-border);
          background:white; display:grid; place-items:center; cursor:pointer;
        }
        .slider-btn:disabled { opacity:0.35; cursor:default; }
        .pslider-track {
          display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory;
          padding-bottom:12px; scrollbar-width:thin; -webkit-overflow-scrolling:touch;
        }
        .pslider-track::-webkit-scrollbar { height:6px; }
        .pslider-track::-webkit-scrollbar-thumb { background: var(--color-border); border-radius:999px; }
        .pslider-item { flex:0 0 300px; scroll-snap-align:start; }
        @media(max-width:640px){ .pslider-item{ flex:0 0 260px; } }
        .pslider-dots { text-align:center; font-size:11px; color:var(--color-muted); letter-spacing:0.05em; }
      `}</style>
    </div>
  )
}

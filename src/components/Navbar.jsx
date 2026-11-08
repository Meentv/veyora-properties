import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, Scale, Search, Phone, Mail, Sun, Moon } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useCompare } from '../context/CompareContext'
import { useTheme } from '../context/ThemeContext'
import { contactConfig } from '../data/contactConfig'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count: favCount } = useFavorites()
  const { count: compareCount } = useCompare()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="VEYORA Properties home">
          <img src="/logo.svg" alt="VEYORA Properties" width="160" height="36" className="brand-logo" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/properties" className={linkClass}>Properties</NavLink>
          <NavLink to="/buy" className={linkClass}>Buy</NavLink>
          <NavLink to="/rent" className={linkClass}>Rent</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <div className="nav-actions-desktop">
          <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${theme==='light'?'dark':'light'} mode`}>
            {theme==='light' ? <Moon size={16}/> : <Sun size={16}/>}
          </button>
          <button className="icon-btn" onClick={() => navigate('/favorites')} aria-label={`Favourites, ${favCount} saved`}>
            <Heart size={18} className={favCount ? 'filled' : ''} />
            {favCount > 0 && <span className="badge-count">{favCount}</span>}
          </button>
          <button className="icon-btn" onClick={() => navigate('/properties')} aria-label={`Compare, ${compareCount} selected`}>
            <Scale size={18} />
            {compareCount > 0 && <span className="badge-count gold">{compareCount}</span>}
          </button>
          <Link to="/contact" className="btn btn-primary btn-sm">Enquire</Link>
        </div>

        <button className="nav-menu-btn icon-btn" onClick={() => setOpen(v => !v)} aria-label="Open menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mobile-drawer">
          <div className="container mobile-drawer-inner">
            <NavLink to="/properties" onClick={() => setOpen(false)}>Properties</NavLink>
            <NavLink to="/buy" onClick={() => setOpen(false)}>Buy</NavLink>
            <NavLink to="/rent" onClick={() => setOpen(false)}>Rent</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <div className="mobile-actions">
              <Link to="/favorites" onClick={() => setOpen(false)} className="btn btn-outline" style={{width:'100%'}}><Heart size={16}/> Favourites {favCount?`(${favCount})`:''}</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{width:'100%'}}>Enquire</Link>
            </div>
            <button onClick={toggle} className="btn btn-outline theme-toggle-mobile">{theme==='light' ? <Moon size={14}/> : <Sun size={14}/>} {theme==='light' ? 'Dark mode' : 'Light mode'} (auto day/night)</button>
            <div className="mobile-contact">
              <a href={`mailto:${contactConfig.email}`}><Mail size={14}/> {contactConfig.email}</a>
              <a href={`tel:${contactConfig.phoneE164}`}><Phone size={14}/> {contactConfig.phoneDisplay}</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky; top:0; z-index:40;
          background: var(--color-nav);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
        }
        .navbar-inner {
          display:flex; align-items:center; justify-content:space-between;
          gap:16px; height:68px;
        }
        .brand { display:flex; align-items:center; }
        .brand-logo { height:36px; width:auto; display:block; }

        .nav-links { gap:22px; align-items:center; }
        .nav-link { font-size:14px; font-weight:500; color: var(--color-charcoal); padding:6px 2px; position:relative; }
        .nav-link-active { color: var(--color-forest); }
        .nav-link-active::after {
          content:''; position:absolute; left:0; right:0; bottom:-6px; height:2px; background: var(--color-gold);
        }
        .nav-actions-desktop { gap:10px; align-items:center; }
        .icon-btn {
          position:relative;
          width:38px; height:38px; border-radius: 999px;
          border:1px solid var(--color-border);
          background: var(--color-card);
          display:grid; place-items:center;
          cursor:pointer; color: var(--color-forest);
        }
        .icon-btn:hover { border-color: var(--color-forest); }
        .badge-count {
          position:absolute; top:-6px; right:-6px;
          background: var(--color-forest); color: white;
          font-size:10px; font-weight:700; min-width:18px; height:18px; padding:0 5px;
          border-radius:999px; display:grid; place-items:center; line-height:1;
        }
        .badge-count.gold { background: var(--color-gold); }
        .filled { fill: currentColor; }

        .mobile-drawer {
          border-top:1px solid var(--color-border);
          background: var(--color-card);
          padding: 16px 0 20px;
        }
        .mobile-drawer .theme-toggle-mobile { margin-top:10px; width:100%; justify-content:center; }
        .mobile-drawer-inner { display:flex; flex-direction:column; gap:2px; }
        .mobile-drawer-inner a { padding:12px 0; font-weight:500; border-bottom:1px solid #f0ece3; min-height:44px; display:flex; align-items:center; }
        .mobile-actions { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:8px; }
        .mobile-contact { display:flex; flex-direction:column; gap:8px; font-size:13px; color:var(--color-muted); margin-top:12px; padding-top:12px; border-top:1px solid var(--color-border); }
        .mobile-contact a { display:flex; gap:8px; align-items:center; padding:0; border:none; color:var(--color-forest); font-weight:500; }
      `}</style>
    </header>
  )
}

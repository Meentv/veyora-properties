import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Buy from './pages/Buy'
import Rent from './pages/Rent'
import About from './pages/About'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import { FavoritesProvider } from './context/FavoritesContext'
import { CompareProvider } from './context/CompareContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'
import { ThemeProvider } from './context/ThemeContext'

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>{ window.scrollTo(0,0) },[pathname])
  return null
}

export default function App(){
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CompareProvider>
          <RecentlyViewedProvider>
            <BrowserRouter>
            <ScrollToTop />
            <div className="app">
              <Navbar />
              <main className="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetails />} />
                  <Route path="/buy" element={<Buy />} />
                  <Route path="/rent" element={<Rent />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </RecentlyViewedProvider>
      </CompareProvider>
    </FavoritesProvider>
    </ThemeProvider>
  )
}

import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'veyora:favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (id) => favorites.includes(id)
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const clearFavorites = () => setFavorites([])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, clearFavorites, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider')
  return ctx
}

import { createContext, useContext, useEffect, useState } from 'react'

const RecentlyViewedContext = createContext(null)
const KEY = 'veyora:recentlyViewed'
const MAX = 6

export function RecentlyViewedProvider({ children }) {
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(recent)) }, [recent])

  const addRecent = (id) => {
    setRecent(prev => {
      const filtered = prev.filter(x => x !== id)
      return [id, ...filtered].slice(0, MAX)
    })
  }

  const clearRecent = () => setRecent([])

  return (
    <RecentlyViewedContext.Provider value={{ recent, addRecent, clearRecent }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx) throw new Error('useRecentlyViewed outside provider')
  return ctx
}

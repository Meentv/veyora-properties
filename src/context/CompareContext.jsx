import { createContext, useContext, useState } from 'react'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([])

  const isCompared = (id) => compareIds.includes(id)
  const canAdd = compareIds.length < 3

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }
  const removeCompare = (id) => setCompareIds(prev => prev.filter(x => x !== id))
  const clearCompare = () => setCompareIds([])

  return (
    <CompareContext.Provider value={{ compareIds, isCompared, toggleCompare, removeCompare, clearCompare, canAdd, count: compareIds.length }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be inside CompareProvider')
  return ctx
}

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  const saved = localStorage.getItem('veyora:theme')
  if (saved === 'light' || saved === 'dark') return saved
  // Auto: light in day (6am-6pm), dark at night
  const hour = new Date().getHours()
  const isDay = hour >= 6 && hour < 18
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // Prefer system if user hasn't chosen, but day/night overrides for demo
  // Day -> light regardless of system, Night -> dark regardless of system for "light in day, dark in night"
  return isDay ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return getInitialTheme() } catch { return 'light' }
  })

  // Apply to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('veyora:theme', theme)
  }, [theme])

  // Auto switch at day/night boundaries + listen to system changes if user hasn't manually overridden recently
  useEffect(() => {
    // Check every minute for day/night transition
    const interval = setInterval(() => {
      const hour = new Date().getHours()
      const shouldBe = hour >= 6 && hour < 18 ? 'light' : 'dark'
      // Only auto-switch if user hasn't manually toggled in last hour? For simplicity, respect manual but still auto-switch day/night
      // We auto-switch but allow toggle to override until next interval
      const lastManual = localStorage.getItem('veyora:theme:manual')
      if (lastManual && Date.now() - parseInt(lastManual,10) < 3600000) return
      setTheme(prev => prev !== shouldBe ? shouldBe : prev)
    }, 60000)

    // Also listen to system preference changes
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const lastManual = localStorage.getItem('veyora:theme:manual')
      if (lastManual && Date.now() - parseInt(lastManual,10) < 3600000) return
      const hour = new Date().getHours()
      const isDay = hour >= 6 && hour < 18
      setTheme(isDay ? 'light' : 'dark')
    }
    mql.addEventListener?.('change', onChange)

    return () => {
      clearInterval(interval)
      mql.removeEventListener?.('change', onChange)
    }
  }, [])

  const toggle = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
    localStorage.setItem('veyora:theme:manual', Date.now().toString())
  }
  const setLight = () => {
    setTheme('light')
    localStorage.setItem('veyora:theme:manual', Date.now().toString())
  }
  const setDark = () => {
    setTheme('dark')
    localStorage.setItem('veyora:theme:manual', Date.now().toString())
  }
  const setAuto = () => {
    localStorage.removeItem('veyora:theme:manual')
    const hour = new Date().getHours()
    setTheme(hour >= 6 && hour < 18 ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, setLight, setDark, setAuto }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

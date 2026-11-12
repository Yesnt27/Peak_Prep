import { useEffect, useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'

// How long the outgoing screen stays mounted for each prototype transition.
const DURATIONS = {
  smart: 300,
  'smart-in': 300,
  'slide-in-left': 300,
  'slide-out-left': 300,
}

/**
 * Renders the route tree, keeping the previous screen mounted underneath (or
 * above) the new one while a Figma-style transition plays. The transition is
 * chosen by the navigation that caused it: `navigate(path, { state: { transition } })`.
 */
export default function AnimatedRoutes({ children }) {
  const location = useLocation()
  const [view, setView] = useState({ current: location, previous: null, transition: null })

  if (location.key !== view.current.key) {
    const transition = location.state?.transition ?? null
    setView({
      current: location,
      previous: transition && DURATIONS[transition] ? view.current : null,
      transition,
    })
  }

  const { current, previous, transition } = view

  useEffect(() => {
    if (!previous) return undefined
    const timer = setTimeout(
      () => setView((v) => (v.previous === previous ? { ...v, previous: null } : v)),
      DURATIONS[transition],
    )
    return () => clearTimeout(timer)
  }, [previous, transition])

  return (
    <>
      {previous && (
        <div key={previous.key} className={`layer layer--out t-${transition}`} aria-hidden="true">
          <Routes location={previous}>{children}</Routes>
        </div>
      )}
      <div key={current.key} className={previous ? `layer layer--in t-${transition}` : 'layer layer--in'}>
        <Routes location={current}>{children}</Routes>
      </div>
    </>
  )
}

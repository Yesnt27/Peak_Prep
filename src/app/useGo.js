import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Prototype navigation. `go('/path')` is an instant change (the Figma default
 * here); pass a transition name ('smart', 'slide-in-left', ...) to animate.
 */
export default function useGo() {
  const navigate = useNavigate()
  return useCallback(
    (path, transition) => navigate(path, transition ? { state: { transition } } : undefined),
    [navigate],
  )
}

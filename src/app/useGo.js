import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Prototype navigation. `go('/path')` is an instant change (the Figma default
 * here); pass a transition name ('smart', 'slide-in-left', ...) to animate.
 * `from` lets a shared screen send its back button to wherever it was opened from.
 */
export default function useGo() {
  const navigate = useNavigate()
  return useCallback(
    (path, transition, from) =>
      navigate(path, transition || from ? { state: { transition, from } } : undefined),
    [navigate],
  )
}

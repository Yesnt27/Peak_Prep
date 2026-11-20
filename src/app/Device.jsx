import { useLayoutEffect, useState } from 'react'

const DESIGN_WIDTH = 402
const DESIGN_HEIGHT = 874
const PHONE_MAX_WIDTH = 500

function measure() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (vw <= PHONE_MAX_WIDTH) {
    // Phone: fill the screen, scaled so the layout is always 402 design px wide.
    // The height is given in design px too (screen height ÷ scale), so the frame exactly fills the
    // screen in every browser (iOS Safari and Chrome handle % sizes inside `zoom` differently).
    // It follows the *visible* viewport: when the on-screen keyboard opens, the frame shrinks to the
    // area above it (pinned bars ride on top of the keyboard) and `top` follows iOS panning the page.
    const scale = vw / DESIGN_WIDTH
    const vv = window.visualViewport
    return { phone: true, scale, height: (vv ? vv.height : vh) / scale, top: vv ? vv.offsetTop : 0 }
  }
  // Larger screens: show the 402 x 874 frame centered, scaled down if too tall.
  return { phone: false, scale: Math.min(1, vh / DESIGN_HEIGHT) }
}

/** After the keyboard opens or closes, keep the field being typed in on screen (its scroll-margin clears pinned bars). */
function revealFocusedField() {
  requestAnimationFrame(() => {
    const el = document.activeElement
    if (el?.matches?.('input, textarea, [contenteditable="true"]')) el.scrollIntoView({ block: 'nearest' })
  })
}

export default function Device({ children }) {
  const [{ phone, scale, height, top }, setLayout] = useState(measure)

  useLayoutEffect(() => {
    const update = () => setLayout(measure())
    const onViewport = () => {
      update()
      revealFocusedField()
    }
    const vv = window.visualViewport
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    vv?.addEventListener('resize', onViewport)
    vv?.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      vv?.removeEventListener('resize', onViewport)
      vv?.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <div className={phone ? 'stage stage--phone' : 'stage'} style={phone && top ? { transform: `translateY(${top}px)` } : undefined}>
      <div className="device" style={phone ? { '--scale': scale, width: DESIGN_WIDTH, height } : { '--scale': scale }}>
        {children}
      </div>
    </div>
  )
}

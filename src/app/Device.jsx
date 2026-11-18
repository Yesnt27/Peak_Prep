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
    const scale = vw / DESIGN_WIDTH
    return { phone: true, scale, height: vh / scale }
  }
  // Larger screens: show the 402 x 874 frame centered, scaled down if too tall.
  return { phone: false, scale: Math.min(1, vh / DESIGN_HEIGHT) }
}

export default function Device({ children }) {
  const [{ phone, scale, height }, setLayout] = useState(measure)

  useLayoutEffect(() => {
    const update = () => setLayout(measure())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return (
    <div className={phone ? 'stage stage--phone' : 'stage'}>
      <div className="device" style={phone ? { '--scale': scale, width: DESIGN_WIDTH, height } : { '--scale': scale }}>
        {children}
      </div>
    </div>
  )
}

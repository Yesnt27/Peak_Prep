import { useLayoutEffect, useState } from 'react'

const DESIGN_WIDTH = 402
const DESIGN_HEIGHT = 874
const PHONE_MAX_WIDTH = 500

function measure() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (vw <= PHONE_MAX_WIDTH) {
    // Phone: fill the screen, scaled so the layout is always 402 design px wide.
    return { phone: true, scale: vw / DESIGN_WIDTH }
  }
  // Larger screens: show the 402 x 874 frame centered, scaled down if too tall.
  return { phone: false, scale: Math.min(1, vh / DESIGN_HEIGHT) }
}

export default function Device({ children }) {
  const [{ phone, scale }, setLayout] = useState(measure)

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
      <div className="device" style={{ '--scale': scale }}>
        {children}
      </div>
    </div>
  )
}

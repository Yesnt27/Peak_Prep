/**
 * Elevation profile drawn from the hike's [km, metres] points (replaces the Brunswick-only
 * Figma export): light-green area, green line, yellow summit dot, dashed teal line where
 * cell signal ends (`signalKm`), and the 0 / summit / end labels underneath.
 */
const W = 334
const H = 110

function smoothPath(pts) {
  // Catmull-Rom → cubic Bézier, for a soft mountain line.
  return pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`
      const p0 = pts[i - 2] ?? pts[i - 1]
      const p1 = pts[i - 1]
      const p3 = pts[i + 1] ?? [x, y]
      const c1 = [p1[0] + (x - p0[0]) / 6, p1[1] + (y - p0[1]) / 6]
      const c2 = [x - (p3[0] - p1[0]) / 6, y - (p3[1] - p1[1]) / 6]
      return `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function ElevationChart({ profile, summit, totalKm, signalKm }) {
  const maxKm = profile[profile.length - 1][0]
  const ms = profile.map(([, m]) => m)
  const lo = Math.min(...ms)
  const hi = Math.max(...ms)
  const x = (km) => (km / maxKm) * W
  const y = (m) => 12 + (1 - (m - lo) / (hi - lo || 1)) * (H - 20)
  const pts = profile.map(([km, m]) => [x(km), y(m)])
  const line = smoothPath(pts)
  const oneWay = summit.km >= maxKm - 0.01
  return (
    <>
      <svg className="hd-elev__svg" viewBox={`0 0 ${W} ${H}`} width="100%" height={H} aria-hidden="true">
        <path d={`${line} L${W},${H} L0,${H} Z`} fill="var(--light-green)" />
        <path d={line} fill="none" stroke="var(--main-green)" strokeWidth="2" strokeLinecap="round" />
        {signalKm != null && (
          <line x1={x(signalKm)} x2={x(signalKm)} y1="4" y2={H} stroke="var(--teal-2)" strokeWidth="1.2" strokeDasharray="4 4" />
        )}
        <circle cx={x(summit.km)} cy={y(summit.m)} r="4.5" fill="var(--yellow-2)" stroke="#fff" strokeWidth="1.5" />
      </svg>
      <div className="hd-elev__axis">
        <p>0 km</p>
        <p>Summit · {summit.km} km</p>
        {!oneWay && <p>{totalKm} km</p>}
      </div>
    </>
  )
}

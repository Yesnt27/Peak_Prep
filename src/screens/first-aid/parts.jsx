import useGo from '../../app/useGo.js'
import { BackButton } from '../../components/controls.jsx'
import fireMask from '../../assets/first-aid/fire-mask.png'
import info27 from '../../assets/first-aid/info-27.svg'
import info19 from '../../assets/first-aid/info-19.svg'
import './FirstAid.css'

/* ---------- Shared pieces ---------- */

export function Back({ to, transition }) {
  const go = useGo()
  return <BackButton darkHover className="fa-back" onClick={() => go(to, transition)} />
}

export function Info({ size = 19 }) {
  return (
    <span className={`fa-info fa-info--${size}`}>
      <img src={size === 27 ? info27 : info19} alt="" />
      <span>i</span>
    </span>
  )
}

export function PracticeHeader() {
  return (
    <>
      <div className="fa-practice__head">
        <p className="fa-practice__kicker">First aid fundamentals</p>
        <div className="fa-practice__title">
          <h1>Practice</h1>
          <p>2:34</p>
        </div>
      </div>
    </>
  )
}

export function ScenarioBar() {
  return (
    <>
      <div className="fa-scenario__count">
        <p>Scenario 2 of 8</p>
        <p>12 of 14</p>
      </div>
      <div className="fa-scenario__tag">
        <span className="fa-fire" style={{ WebkitMaskImage: `url(${fireMask})`, maskImage: `url(${fireMask})` }} />
        <p>Heat-related situations</p>
      </div>
    </>
  )
}

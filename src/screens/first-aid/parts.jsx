import useGo from '../../app/useGo.js'
import { BackButton } from '../../components/controls.jsx'
import info27 from '../../assets/first-aid/info-27.svg'
import info19 from '../../assets/first-aid/info-19.svg'
import './FirstAid.css'

/* ---------- Shared pieces ---------- */

export function Back({ to, transition }) {
  const go = useGo()
  return <BackButton className="fa-back" onClick={() => go(to, transition)} />
}

export function Info({ size = 19 }) {
  return (
    <span className={`fa-info fa-info--${size}`}>
      <img src={size === 27 ? info27 : info19} alt="" />
      <span>i</span>
    </span>
  )
}

/** `seconds` = time left, shown as m:ss; omitted on the results screen (no timer). */
export function PracticeHeader({ seconds }) {
  const timed = seconds !== undefined
  const time = timed ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : ''
  return (
    <div className="fa-practice__head">
      <p className="fa-practice__kicker">First aid fundamentals</p>
      <div className="fa-practice__title">
        <h1>Practice</h1>
        {timed && (
          <p className={seconds === 0 ? 'fa-timer fa-timer--up' : 'fa-timer'} aria-label={`${time} left`}>
            {time}
          </p>
        )}
      </div>
    </div>
  )
}

/** "Scenario n of N" + the lesson's category tag. `index` is omitted on the results screen. */
export function ScenarioBar({ lesson, index }) {
  const icon = lesson.icon
  return (
    <>
      <div className="fa-scenario__count">
        <p>
          {index === undefined
            ? `${lesson.scenarios.length} of ${lesson.scenarios.length} scenarios`
            : `Scenario ${index + 1} of ${lesson.scenarios.length}`}
        </p>
      </div>
      <div className="fa-scenario__tag">
        <span className="fa-fire" style={{ WebkitMaskImage: `url("${icon}")`, maskImage: `url("${icon}")` }} />
        <p>{lesson.tag}</p>
      </div>
    </>
  )
}

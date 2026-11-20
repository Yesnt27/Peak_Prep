import useGo from '../../app/useGo.js'
import { BackButton } from '../../components/controls.jsx'
import Button from '../../components/Button.jsx'
import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import info27 from '../../assets/first-aid/info-27.svg'
import info19 from '../../assets/first-aid/info-19.svg'
import './FirstAid.css'
import './Practice.css'

/* ---------- Shared pieces ---------- */

export function Back({ to, transition }) {
  const go = useGo()
  return <BackButton className="fa-back" onClick={() => go(to, transition)} />
}

/** Figma group 2124:5149: Retry + main button in the nav-bar pill, pinned to the bottom. */
export function ActionBar({ label, onRetry, onNext, className = '' }) {
  return (
    <div className={`fa-bar ${className}`}>
      {/* Same progressive blur as the nav bar: clear at the top, strongest behind the buttons. */}
      <div className="fa-bar__blur">
        <ProgressiveBlur />
      </div>
      {/* Fade to the page grey under the blur, so content never ends abruptly (Round 20). */}
      <div className="fa-bar__fade" />
      <div className="fa-bar__pill" />
      <Button className="fa-bar__retry" onClick={onRetry}>
        Retry
      </Button>
      <Button className="fa-bar__mins" onClick={onNext}>
        {label}
      </Button>
    </div>
  )
}

export function Info({ size = 19 }) {
  return (
    <span className={`fa-info fa-info--${size}`}>
      <img src={size === 27 ? info27 : info19} alt="" />
      <span>i</span>
    </span>
  )
}

/**
 * Figma 2579:6448 header for the practice + results screens: grey 50px back button,
 * "First aid fundamentals / Practice", the teal timer box (`seconds` left, as m:ss; omitted on results)
 * and the lesson tag.
 */
export function PracticeTop({ lesson, back, seconds }) {
  const go = useGo()
  const timed = seconds !== undefined
  const time = timed ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : ''
  return (
    <div className="fa-q__top">
      <BackButton className="fa-q__back" onClick={() => go(back)} />
      <header className="fa-q__head">
        <div>
          <p className="fa-q__kicker">First aid fundamentals</p>
          <h1 className="fa-q__title">Practice</h1>
        </div>
        {timed && (
          <p className={seconds === 0 ? 'fa-q__timer fa-q__timer--up' : 'fa-q__timer'} aria-label={`${time} left`}>
            {time}
          </p>
        )}
      </header>
      <LessonTag lesson={lesson} className="fa-q__tag" />
    </div>
  )
}

/** The lesson's category tag (Figma 2579:6490): icon + e.g. "Heat-related situations" on yellow-3. */
export function LessonTag({ lesson, className = '' }) {
  const icon = lesson.icon
  return (
    <div className={`fa-scenario__tag ${className}`}>
      <span className="fa-fire" style={{ WebkitMaskImage: `url("${icon}")`, maskImage: `url("${icon}")` }} />
      <p>{lesson.tag}</p>
    </div>
  )
}

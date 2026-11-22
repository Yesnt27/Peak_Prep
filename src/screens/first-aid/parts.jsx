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
export function ActionBar({ label, onRetry, onNext, retryLabel = 'Retry', nextVariant = 'green', nextDisabled = false, className = '' }) {
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
        {retryLabel}
      </Button>
      <Button variant={nextVariant} className="fa-bar__mins" disabled={nextDisabled} onClick={onNext}>
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
 * "First aid fundamentals / Practice" and the lesson tag. No timer: it's a learning module (Round 21).
 */
export function PracticeTop({ lesson, back }) {
  const go = useGo()
  return (
    <div className="fa-q__top">
      <BackButton className="fa-q__back" onClick={() => go(back)} />
      <header className="fa-q__head">
        <p className="fa-q__kicker">First aid fundamentals</p>
        <h1 className="fa-q__title">Practice</h1>
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

import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { BackButton } from '../../components/controls.jsx'
import scales from '../../assets/first-aid/scales.svg'
import firstAidIcon from '../../assets/first-aid/first-aid.svg'
import cardChevron from '../../assets/first-aid/card-chevron.svg'
import arrowLeft from '../../assets/first-aid/arrow-left.svg'
import recycle from '../../assets/first-aid/recycle.svg'
import personHike from '../../assets/first-aid/person-hike.svg'
import headphones from '../../assets/first-aid/headphones.svg'
import pawPrint from '../../assets/first-aid/paw-print.svg'
import { useParams, Navigate } from 'react-router-dom'
import { LESSONS, completedLessons } from '../../app/progress.js'
import { lessonBySlug } from '../../data/firstAid.js'
import { Back } from './parts.jsx'

/* ---------- 1646:12184  First aid module (lesson list) ---------- */

const ETIQUETTE = [
  { icon: arrowLeft, rotate: true, title: 'Yield to uphill hikers', body: 'It’s harder to stop downhill momentum. Descending hikers should step aside.' },
  { icon: recycle, title: 'Don’t litter.', body: 'The trail is a shared environment. Keep nature safe and keep your trash.' },
  { icon: personHike, title: 'Passing others.', body: 'Slower hikers should let faster hikers pass. Announce yourself before passing.' },
  { icon: headphones, title: 'Keep noise low', body: 'A shared space means you should use headphones instead of loud music.' },
  { icon: pawPrint, title: 'Leashes on pets', body: 'Keep animals on a leash at all times unless local regulations say otherwise.' },
]

/** Lets a mouse drag the card row sideways (touch already swipes natively). */
function dragScroll(e) {
  if (e.pointerType !== 'mouse') return
  const row = e.currentTarget
  const startX = e.clientX
  const startLeft = row.scrollLeft
  row.classList.add('fa-etiquette--dragging')
  const move = (ev) => { row.scrollLeft = startLeft - (ev.clientX - startX) }
  const up = () => {
    row.classList.remove('fa-etiquette--dragging')
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}

export function FirstAidModule() {
  const go = useGo()
  const done = completedLessons()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ minHeight: 1355 }}>
        <BackButton darkHover className="fa-back fa-back--module" onClick={() => go('/training')} />
        <div className="fa-progress">
          <p>Lessons Completed - {done.length} of {LESSONS.length}</p>
          <div className="fa-progress__bar">
            <div className="fa-progress__fill" style={{ width: `${(done.length / LESSONS.length) * 100}%` }} />
          </div>
        </div>
        <div className="fa-module">
          <h1 className="fa-module__title">Brunswick Mountain Trail Safety</h1>
          <p className="fa-module__sub">Select a lesson to complete:</p>
          <div className="fa-lessons">
            {/* Every lesson is a button with the same states: grey → yellow on hover/press; done = green. */}
            {LESSONS.map(([name, scenarios, slug]) => {
              const isDone = done.includes(name)
              return (
                <button
                  type="button"
                  key={name}
                  className={isDone ? 'fa-lesson fa-lesson--done' : 'fa-lesson'}
                  onClick={() => go(`/first-aid/${slug}`, 'slide-in-left')}
                >
                  <span className="fa-lesson__name">{name}</span>
                  <span>{isDone ? 'COMPLETE' : scenarios}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="fa-further__title">Go Further</p>
        <p className="fa-further__sub">Know your rights and get hands-on training</p>
        <div className="fa-cards">
          <button type="button" className="fa-card" onClick={() => go('/first-aid/legal', 'slide-in-left')}>
            <span className="fa-card__icon fa-card__icon--legal">
              <img src={scales} alt="" />
            </span>
            <span className="fa-card__text fa-card__text--legal">
              <span className="fa-card__title">Legal Basics</span>
              <span className="fa-card__body">Know your rights when you help someone</span>
            </span>
            <span className="fa-card__time">7-10 mins</span>
            <img className="fa-card__chev fa-card__chev--legal" src={cardChevron} alt="" />
          </button>
          <button type="button" className="fa-card" onClick={() => go('/first-aid/certified', 'slide-in-left')}>
            <span className="fa-card__pill">
              <span className="fa-card__pill-fill" />
            </span>
            <span className="fa-card__text fa-card__text--cert">
              <span className="fa-card__title">Get certified</span>
              <span className="fa-card__body">Accredited sources near you</span>
            </span>
            <span className="fa-card__icon fa-card__icon--cert">
              <img src={firstAidIcon} alt="" />
            </span>
            <span className="fa-card__suggested">
              <span>Suggested</span>
              <span>20 hrs</span>
            </span>
            <img className="fa-card__chev fa-card__chev--cert" src={cardChevron} alt="" />
          </button>
        </div>

        <p className="fa-etiquette__title">Trail Etiquette 101</p>
        <div className="fa-etiquette" onPointerDown={dragScroll}>
          {ETIQUETTE.map((item) => (
            <div className="fa-etiquette__card" key={item.title}>
              <div className="fa-etiquette__inner">
                <span className={item.rotate ? 'fa-etiquette__icon fa-etiquette__icon--rotate' : 'fa-etiquette__icon'}>
                  <img src={item.icon} alt="" />
                </span>
                <div className="fa-etiquette__text">
                  <p className="fa-etiquette__name">{item.title}</p>
                  <p className="fa-etiquette__body">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* ---------- 1646:12254  Lesson intro (Heat Exposure layout, used by every lesson) ---------- */

export function LessonIntro() {
  const go = useGo()
  const lesson = lessonBySlug(useParams().lesson)
  if (!lesson) return <Navigate to="/first-aid" replace />
  return (
    <Screen className="fa">
      <div className="fa-page fa-flow">
        <Back to="/first-aid" transition="slide-out-left" />
        <h1 className="fa-module__title">{lesson.name}</h1>
        <div className="fa-heat__photo">
          <img src={lesson.photo} alt="" />
        </div>
        <div className="fa-heat__text">
          {lesson.intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <Button className="fa-flow__cta" onClick={() => go(`/first-aid/${lesson.slug}/practice`)}>
          Start lesson
        </Button>
      </div>
    </Screen>
  )
}

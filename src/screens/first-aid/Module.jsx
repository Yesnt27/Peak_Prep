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
import heatPhoto from '../../assets/first-aid/heat-exposure.png'
import { LESSONS, completedLessons } from '../../app/progress.js'
import { Back } from './parts.jsx'

/* ---------- 1646:12184  First aid module (lesson list) ---------- */

const ETIQUETTE = [
  { icon: arrowLeft, rotate: true, title: 'Yield to uphill hikers', body: 'It’s harder to stop downhill momentum. Descending hikers should step aside.' },
  { icon: recycle, title: 'Don’t litter.', body: 'The trail is a shared environment. Keep nature safe and keep your trash.' },
  { icon: personHike, title: 'Passing others.', body: 'Slower hikers should let faster hikers pass. Announce yourself before passing.' },
  { icon: headphones, title: 'Keep noise low', body: 'A shared space means you should use headphones instead of loud music.' },
  { icon: pawPrint, title: 'Leashes on pets', body: 'Keep animals on a leash at all times unless local regulations say otherwise.' },
]

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
          <h1 className="fa-module__title">Brunsick Mountain Safety</h1>
          <p className="fa-module__sub">Select a lesson to complete:</p>
          <div className="fa-lessons">
            {LESSONS.map(([name, scenarios], i) => {
              const isDone = done.includes(name)
              const cls = ['fa-lesson', i === 0 && 'fa-lesson--first', isDone && 'fa-lesson--done']
              const body = (
                <>
                  <span className="fa-lesson__name">{name}</span>
                  <span>{isDone ? 'COMPLETE' : scenarios}</span>
                </>
              )
              // Heat Exposure is the only lesson with screens in Figma.
              return name === 'Heat Exposure' ? (
                <button
                  type="button"
                  key={name}
                  className={[...cls, !isDone && 'fa-lesson--next'].filter(Boolean).join(' ')}
                  onClick={() => go('/first-aid/heat', 'slide-in-left')}
                >
                  {body}
                </button>
              ) : (
                <div key={name} className={cls.filter(Boolean).join(' ')}>
                  {body}
                </div>
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
        <div className="fa-etiquette">
          {ETIQUETTE.map((item, i) => (
            <div className="fa-etiquette__card" key={item.title}>
              <div className="fa-etiquette__inner">
                <span className={item.rotate ? 'fa-etiquette__icon fa-etiquette__icon--rotate' : 'fa-etiquette__icon'}>
                  <img src={item.icon} alt="" />
                </span>
                <div className={i === 0 ? 'fa-etiquette__text fa-etiquette__text--first' : 'fa-etiquette__text'}>
                  <p className="fa-etiquette__name">{item.title}</p>
                  <p className={i >= 2 ? 'fa-etiquette__body fa-etiquette__body--wide' : 'fa-etiquette__body'}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* ---------- 1646:12254  Heat Exposure (lesson intro) ---------- */

export function HeatExposure() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ minHeight: 900 }}>
        <Back to="/first-aid" transition="slide-out-left" />
        <div className="fa-heat">
          <h1 className="fa-module__title">Heat Exposure</h1>
          <div className="fa-heat__photo">
            <img src={heatPhoto} alt="" />
          </div>
        </div>
        <div className="fa-heat__text">
          <p>
            Heat exposure is caused by overexposure to the sun. On a long climb, hard effort and not enough water can
            add up and effects a lot of people.
          </p>
          <p>&nbsp;</p>
          <p>
            Ways to avoid heat exposure by starting your hike early in the cooler part of the day, drinking water
            consistently, and wearing loose, light clothing. Slow your pace on sunny, exposed sections and rest in the
            shade whenever you can.
          </p>
        </div>
        <Button className="fa-heat__start" onClick={() => go('/first-aid/practice')}>
          Start lesson
        </Button>
      </div>
    </Screen>
  )
}

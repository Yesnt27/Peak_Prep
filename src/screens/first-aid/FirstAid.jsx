import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { BackButton, TagGroup } from '../../components/controls.jsx'
import scales from '../../assets/first-aid/scales.svg'
import firstAidIcon from '../../assets/first-aid/first-aid.svg'
import cardChevron from '../../assets/first-aid/card-chevron.svg'
import arrowLeft from '../../assets/first-aid/arrow-left.svg'
import recycle from '../../assets/first-aid/recycle.svg'
import personHike from '../../assets/first-aid/person-hike.svg'
import headphones from '../../assets/first-aid/headphones.svg'
import pawPrint from '../../assets/first-aid/paw-print.svg'
import heatPhoto from '../../assets/first-aid/heat-exposure.png'
import hiker from '../../assets/first-aid/hiker.png'
import fireMask from '../../assets/first-aid/fire-mask.png'
import questionCircle from '../../assets/first-aid/question-circle.svg'
import info27 from '../../assets/first-aid/info-27.svg'
import info19 from '../../assets/first-aid/info-19.svg'
import tempCircleLeft from '../../assets/first-aid/temp-circle-left.svg'
import tempCircleRight from '../../assets/first-aid/temp-circle-right.svg'
import tempArrow from '../../assets/first-aid/temp-arrow.svg'
import heatWaves from '../../assets/first-aid/heat-waves.svg'
import thermometerMask from '../../assets/first-aid/thermometer-mask.png'
import plusCircle from '../../assets/first-aid/plus-circle.svg'
import plus from '../../assets/first-aid/plus.svg'
import eyeArcTop from '../../assets/first-aid/eye-arc-top.svg'
import eyeArcBottom from '../../assets/first-aid/eye-arc-bottom.svg'
import eyeShape from '../../assets/first-aid/eye-shape.svg'
import eyeIris from '../../assets/first-aid/eye-iris.svg'
import eyePupil from '../../assets/first-aid/eye-pupil.svg'
import eyeGlint from '../../assets/first-aid/eye-glint.svg'
import stepCircle from '../../assets/first-aid/step-circle.svg'
import mapPin from '../../assets/first-aid/map-pin.svg'
import redCross from '../../assets/first-aid/red-cross.png'
import lifesaving from '../../assets/first-aid/lifesaving-society.png'
import stJohns from '../../assets/first-aid/st-johns.png'
import './FirstAid.css'

/* ---------- Shared pieces ---------- */

function Back({ to }) {
  const go = useGo()
  // `to` omitted = the prototype gives this back button a hover state but no link.
  return <BackButton darkHover className="fa-back" onClick={to ? () => go(to) : undefined} />
}

function Info({ size = 19 }) {
  return (
    <span className={`fa-info fa-info--${size}`}>
      <img src={size === 27 ? info27 : info19} alt="" />
      <span>i</span>
    </span>
  )
}

function PracticeHeader() {
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

function ScenarioBar() {
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

/* ---------- 1646:12184  First aid module (lesson list) ---------- */

const LESSONS = [
  ['Dehydration', 'COMPLETE'],
  ['Scramble Safety', 'COMPLETE'],
  ['Heat Exposure', '8 Scenarios'],
  ['Snowy Peaks', '3 Scenarios'],
]

const ETIQUETTE = [
  { icon: arrowLeft, rotate: true, title: 'Yield to uphill hikers', body: 'It’s harder to stop downhill momentum. Descending hikers should step aside.' },
  { icon: recycle, title: 'Don’t litter.', body: 'The trail is a shared environment. Keep nature safe and keep your trash.' },
  { icon: personHike, title: 'Passing others.', body: 'Slower hikers should let faster hikers pass. Announce yourself before passing.' },
  { icon: headphones, title: 'Keep noise low', body: 'A shared space means you should use headphones instead of loud music.' },
  { icon: pawPrint, title: 'Leashes on pets', body: 'Keep animals on a leash at all times unless local regulations say otherwise.' },
]

export function FirstAidModule() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ minHeight: 1355 }}>
        <BackButton darkHover className="fa-back fa-back--module" onClick={() => go('/training')} />
        <div className="fa-progress">
          <p>Lessons Completed - 2 of 4</p>
          <div className="fa-progress__bar">
            <div className="fa-progress__fill" />
          </div>
        </div>
        <div className="fa-module">
          <h1 className="fa-module__title">Brunsick Mountain Safety</h1>
          <p className="fa-module__sub">Select a lesson to complete:</p>
          <div className="fa-lessons">
            {LESSONS.map(([name, status]) =>
              name === 'Heat Exposure' ? (
                <button
                  type="button"
                  key={name}
                  className="fa-lesson fa-lesson--next"
                  onClick={() => go('/first-aid/heat', 'slide-in-left')}
                >
                  <span className="fa-lesson__name">{name}</span>
                  <span>{status}</span>
                </button>
              ) : (
                <div key={name} className="fa-lesson">
                  <span className="fa-lesson__name">{name}</span>
                  <span>{status}</span>
                </div>
              ),
            )}
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
      <div className="fa-page" style={{ minHeight: 876 }}>
        <Back />
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

/* ---------- 1646:12155  Practice (scenario question) ---------- */

export function Practice() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ minHeight: 876 }}>
        <Back to="/first-aid" />
        <div className="fa-practice">
          <PracticeHeader />
          <div className="fa-scenario">
            <ScenarioBar />
            <div className="fa-white fa-white--question">
              <div className="fa-question__top">
                <div className="fa-question__img">
                  <img src={hiker} alt="" />
                </div>
                <div className="fa-question__text">
                  <p className="fa-question__title">First aid scenario</p>
                  <p className="fa-question__body">
                    A hiker is experiencing dizziness, weakness and is barely able to continue in exposed terrain. What
                    do you do?
                  </p>
                </div>
              </div>
              <div className="fa-answer">
                <p className="fa-answer__blank">___</p>
                <span className="fa-answer__q">
                  <img src={questionCircle} alt="" />
                  <span>?</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="fa-skip" onClick={() => go('/first-aid/correct', 'slide-out-left')}>
          Skip
        </button>
      </div>
    </Screen>
  )
}

/* ---------- 1646:12263  Right or wrong (Correct! / Next Steps) ---------- */

export function Correct() {
  const go = useGo()
  return (
    <Screen
      className="fa"
      fixed={
        <div className="fa-bar">
          {/* Figma places this blur behind the bottom buttons; it is pinned with them here. */}
          <div className="fa-bar__blur" />
          <div className="fa-bar__pill" />
          <Button className="fa-bar__retry" onClick={() => go('/first-aid/practice')}>
            Retry
          </Button>
          {/* Hover state only: the prototype gives "20 mins" no destination. */}
          <Button className="fa-bar__mins">20 mins</Button>
        </div>
      }
    >
      <div className="fa-page" style={{ minHeight: 1152 }}>
        <Back to="/first-aid" />
        <div className="fa-practice">
          <PracticeHeader />
          <div className="fa-scenario">
            <ScenarioBar />
            <div className="fa-white fa-white--center">
              <div className="fa-white__head">
                <p>Correct!</p>
                <Info size={27} />
              </div>
              <div className="fa-temp">
                <img className="fa-temp__right" src={tempCircleRight} alt="" />
                <img className="fa-temp__waves" src={heatWaves} alt="" />
                <img className="fa-temp__arrow" src={tempArrow} alt="" />
                <img className="fa-temp__left" src={tempCircleLeft} alt="" />
                <p className="fa-temp__label">36°-41°</p>
                <span
                  className="fa-temp__thermo"
                  style={{ WebkitMaskImage: `url(${thermometerMask})`, maskImage: `url(${thermometerMask})` }}
                />
              </div>
              <div className="fa-white__copy">
                <p>Good call, having heat exhaustion is no joke during a technical hike, its good to recuperate and rest.</p>
                <p>&#8203;</p>
                <p>Hydration and Rest are key to recovery from these conditions.</p>
              </div>
            </div>
            <div className="fa-white fa-white--center">
              <div className="fa-white__head">
                <p>Next Steps</p>
                <span className="fa-plus">
                  <img src={plusCircle} alt="" />
                  <img className="fa-plus__icon" src={plus} alt="" />
                </span>
              </div>
              <div className="fa-white__copy">
                <p>Take a rest, preferably in a shaded area and treat for shock. Reassess every 5-15 mins.</p>
                <p>&#8203;</p>
                <p>Make sure to hydrate sufficiently with water, remembering to keep resources in check</p>
              </div>
              <div className="fa-shock">
                <div className="fa-eye">
                  <img className="fa-eye__bottom" src={eyeArcBottom} alt="" />
                  <img className="fa-eye__top" src={eyeArcTop} alt="" />
                  <img className="fa-eye__shape" src={eyeShape} alt="" />
                  <img className="fa-eye__iris" src={eyeIris} alt="" />
                  <img className="fa-eye__pupil" src={eyePupil} alt="" />
                  <img className="fa-eye__glint" src={eyeGlint} alt="" />
                  <p className="fa-eye__label">5-15 mins</p>
                </div>
                <div className="fa-shock__text">
                  <p className="fa-shock__title">Treating for Shock</p>
                  <div className="fa-shock__list">
                    {[
                      ['W', 'armth'],
                      ['A', 'BCs'],
                      ['R', 'est and Reassure'],
                      ['T', 'reatment'],
                      ['S', 'uitable Position'],
                    ].map(([first, rest]) => (
                      <p key={first}>
                        <span className="fa-shock__cap">{first}</span>
                        {rest}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ---------- 1646:12394  Right or wrong (Legal side) ---------- */

const STEPS = [
  ['1', 'Ask before you help', 'Getting consent', 69],
  ['2', 'Stay within your training', 'Do what you learned, don’t improvise', 79],
  ['3', 'Once you start, stay', 'Don’t leave until help arrives', 74],
]

export function LegalSide() {
  return (
    <Screen
      className="fa"
      fixed={
        // Hover state only: the prototype gives this button no destination.
        <Button className="fa-certify">Get First-aid certified</Button>
      }
    >
      <div className="fa-page" style={{ minHeight: 970 }}>
        <Back to="/first-aid" />
        <div className="fa-legal">
          <div className="fa-legal__head">
            <p className="fa-practice__kicker">First aid fundamentals</p>
            <h1 className="fa-module__title">Legal side</h1>
          </div>
          <div className="fa-legal__cards">
            <div className="fa-note fa-note--legal">
              <Info />
              <p>General information, not legal advice. Law may differ by province.</p>
            </div>
            <div className="fa-act">
              <p className="fa-act__title">You’re protected when you help in good faith</p>
              <div className="fa-act__body">
                <p className="fa-act__text">
                  BC’s <strong>Good Samaritan Act</strong> protecs people who give emergency aid at the scene, unless
                  they are grossly negligent.
                </p>
                <div className="fa-act__source">
                  <Info />
                  <p>Good Samaritan Act, RSBC 1996, c. 172</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fa-steps">
            <p className="fa-section-title">Steps to take</p>
            <div className="fa-steps__list">
              {STEPS.map(([n, title, sub, h]) => (
                <div className="fa-step" key={n} style={{ height: h }}>
                  <span className="fa-step__num">
                    <img src={stepCircle} alt="" />
                    <span>{n}</span>
                  </span>
                  <span className="fa-step__text">
                    <span className="fa-step__title">{title}</span>
                    <span className="fa-step__sub">{sub}</span>
                  </span>
                  <img className="fa-step__chev" src={cardChevron} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ---------- 1646:12465  Right or wrong (Get certified) ---------- */

const LEVELS = [
  ['Standard', 'Day hikers'],
  ['Intermediate', 'Trip leaders'],
  ['Advanced', 'Rescuers'],
]

const COURSES = [
  { logo: redCross, cls: 'red-cross', name: 'Canadian Red Cross', next: 'Next: Aug 15 2026        $150' },
  { logo: lifesaving, cls: 'lifesaving', name: 'Lifesaving Society', next: 'Next: Sep 2 2026        $140' },
  { logo: stJohns, cls: 'st-johns', name: 'St. Johns Ambulance', next: 'Next: Aug 19 2026        $140' },
]

export function GetCertified() {
  const [level, setLevel] = useState(null)
  return (
    <Screen className="fa">
      {/* Figma frame is 923px tall and clips the third course card. */}
      <div className="fa-page fa-page--clip" style={{ height: 923 }}>
        <Back to="/first-aid" />
        <div className="fa-location">
          <span className="fa-location__bg" />
          <span className="fa-location__pin">
            <img src={mapPin} alt="" />
          </span>
          <p>Vancouver, BC</p>
        </div>
        <div className="fa-cert">
          <h1 className="fa-module__title">Get certified</h1>
          <div className="fa-note fa-note--cert">
            <Info />
            <p>The app helps you practice, but real life courses gives you hands-on skills and a certificate.</p>
          </div>
          <div className="fa-levels">
            <p className="fa-section-title">Course level</p>
            <div className="fa-levels__row">
              {LEVELS.map(([name, who], i) => (
                <button
                  type="button"
                  key={name}
                  className={`fa-level ${i === 1 ? 'fa-level--mid' : ''} ${level === name ? 'fa-level--selected' : ''}`}
                  aria-pressed={level === name}
                  onClick={() => setLevel(level === name ? null : name)}
                >
                  <span className="fa-level__name">{name}</span>
                  <span className="fa-level__who">{who}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="fa-section-title fa-categories__title">Categories</p>
        <TagGroup className="fa-categories" options={['CPR', 'Aquatics', 'Waterfront', 'Emergency First-aid']} />
        <p className="fa-section-title fa-courses__title">First aid courses near you</p>
        <div className="fa-courses">
          {COURSES.map((c) => (
            <div className="fa-course" key={c.name}>
              <span className={`fa-course__logo fa-course__logo--${c.cls}`}>
                <img src={c.logo} alt="" />
              </span>
              <span className="fa-course__text">
                <span className="fa-course__name">{c.name}</span>
                <span className="fa-course__line">CPR/AED Level C      2 days</span>
                <span className="fa-course__line fa-course__next">{c.next}</span>
              </span>
              <img className="fa-course__chev" src={cardChevron} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

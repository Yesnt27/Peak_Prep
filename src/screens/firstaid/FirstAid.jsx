import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import { BackButton, TagGroup } from '../../components/controls.jsx'
import scales from '../../assets/firstaid/scales.svg'
import firstAidIcon from '../../assets/firstaid/first-aid.svg'
import chevron from '../../assets/firstaid/card-chevron.svg'
import arrowLeft from '../../assets/firstaid/arrow-left.svg'
import recycle from '../../assets/firstaid/recycle.svg'
import personHike from '../../assets/firstaid/person-hike.svg'
import headphones from '../../assets/firstaid/headphones.svg'
import pawPrint from '../../assets/firstaid/paw-print.svg'
import heatPhoto from '../../assets/firstaid/heat-exposure.png'
import hiker from '../../assets/firstaid/hiker.png'
import questionCircle from '../../assets/firstaid/question-circle.svg'
import infoCircle from '../../assets/firstaid/info-circle.svg'
import infoSmall from '../../assets/firstaid/info-small.svg'
import circleLeft from '../../assets/firstaid/circle-left.svg'
import circleRight from '../../assets/firstaid/circle-right.svg'
import heatWaves from '../../assets/firstaid/heat-waves.svg'
import arrowLine from '../../assets/firstaid/arrow-line.svg'
import plusCircle from '../../assets/firstaid/plus-circle.svg'
import plus from '../../assets/firstaid/plus.svg'
import arcTop from '../../assets/firstaid/arc-top.svg'
import arcBottom from '../../assets/firstaid/arc-bottom.svg'
import eyeShape from '../../assets/firstaid/eye-shape.svg'
import eyeIris from '../../assets/firstaid/eye-iris.svg'
import eyePupil from '../../assets/firstaid/eye-pupil.svg'
import eyeGlint from '../../assets/firstaid/eye-glint.svg'
import stepCircle from '../../assets/firstaid/step-circle.svg'
import mapPin from '../../assets/firstaid/map-pin.svg'
import redCross from '../../assets/firstaid/red-cross.png'
import lifesaving from '../../assets/firstaid/lifesaving.png'
import stJohns from '../../assets/firstaid/st-johns.png'
import './FirstAid.css'

/* ------------------------------------------------------------------ */
/* Overview (1646:12184)                                               */
/* ------------------------------------------------------------------ */

const LESSONS = [
  ['Dehydration', 'COMPLETE', 119],
  ['Scramble Safety', 'COMPLETE', 83],
  ['Heat Exposure', '8 Scenarios', 83, true],
  ['Snowy Peaks', '3 Scenarios', 83],
]

const ETIQUETTE = [
  {
    icon: arrowLeft,
    rotate: true,
    title: 'Yield to uphill hikers',
    text: "It's harder to stop downhill momentum. Descending hikers should step aside.",
    gap: 36,
  },
  { icon: recycle, title: 'Don’t litter.', text: 'The trail is a shared environment. Keep nature safe and keep your trash.' },
  {
    icon: personHike,
    title: 'Passing others.',
    text: 'Slower hikers should let faster hikers pass. Announce yourself before passing.',
    wide: true,
  },
  {
    icon: headphones,
    title: 'Keep noise low',
    text: 'A shared space means you should use headphones instead of loud music.',
    wide: true,
  },
  {
    icon: pawPrint,
    title: 'Leashes on pets',
    text: 'Keep animals on a leash at all times unless local regulations say otherwise.',
    wide: true,
  },
]

export function FirstAidOverview() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ height: 1355 }}>
        <BackButton dark className="fa-abs" style={{ left: 23, top: 52 }} onClick={() => go('/training')} />

        <div className="fa-progress fa-abs" style={{ left: 24, top: 130 }}>
          <p>Lessons Completed - 2 of 4</p>
          <div className="fa-progress__track">
            <div className="fa-progress__fill" />
          </div>
        </div>

        <div className="fa-ov fa-abs" style={{ left: 24, top: 199 }}>
          <div className="fa-ov__head">
            <h1 className="fa-title fa-title--dark">Brunsick Mountain Safety</h1>
            <p className="fa-body">Select a lesson to complete:</p>
          </div>
          <div className="fa-lessons">
            {LESSONS.map(([name, status, gap, active]) =>
              active ? (
                <button
                  type="button"
                  key={name}
                  className="fa-lesson fa-lesson--active"
                  style={{ gap }}
                  onClick={() => go('/first-aid/lesson', 'slide-in-left')}
                >
                  <span className="fa-lesson__name">{name}</span>
                  <span>{status}</span>
                </button>
              ) : (
                <div key={name} className="fa-lesson" style={{ gap }}>
                  <span className="fa-lesson__name">{name}</span>
                  <span>{status}</span>
                </div>
              ),
            )}
          </div>
        </div>

        <p className="fa-subhead fa-abs" style={{ left: 24, top: 678 }}>
          Go Further
        </p>
        <p className="fa-body fa-body--black fa-abs" style={{ left: 23, top: 707, width: 346 }}>
          Know your rights and get hands-on training
        </p>

        <div className="fa-cards fa-abs" style={{ left: 23, top: 752 }}>
          <button type="button" className="fa-card" onClick={() => go('/first-aid/legal', 'slide-in-left')}>
            <span className="fa-card__icon" style={{ left: 16, top: 18 }}>
              <img src={scales} alt="" />
            </span>
            <span className="fa-card__text" style={{ top: 87, height: 89 }}>
              <span className="fa-card__title">Legal Basics</span>
              <span className="fa-card__desc">Know your rights when you help someone</span>
            </span>
            <span className="fa-card__meta">7-10 mins</span>
            <img className="fa-card__chev" style={{ left: 132, top: 26 }} src={chevron} alt="" />
          </button>
          <button type="button" className="fa-card" onClick={() => go('/first-aid/certified', 'slide-in-left')}>
            <span className="fa-card__pill">
              <span />
            </span>
            <span className="fa-card__text" style={{ top: 85, height: 72, gap: 9 }}>
              <span className="fa-card__title">Get certified</span>
              <span className="fa-card__desc">Accredited sources near you</span>
            </span>
            <span className="fa-card__icon" style={{ left: 21, top: 17 }}>
              <img src={firstAidIcon} alt="" />
            </span>
            <span className="fa-card__pill-text">
              <span>Suggested</span>
              <span>20 hrs</span>
            </span>
            <img className="fa-card__chev" style={{ left: 134, top: 25 }} src={chevron} alt="" />
          </button>
        </div>

        <p className="fa-subhead fa-abs fa-etiquette-title">Trail Etiquette 101</p>
        <div className="fa-carousel fa-abs" style={{ left: 0, top: 1070 }}>
          {ETIQUETTE.map((tip) => (
            <div className="fa-tip" key={tip.title}>
              <div className="fa-tip__inner">
                <span className={tip.rotate ? 'fa-tip__icon fa-tip__icon--arrow' : 'fa-tip__icon'}>
                  {tip.rotate ? (
                    <span className="fa-tip__rot">
                      <img src={tip.icon} alt="" />
                    </span>
                  ) : (
                    <img src={tip.icon} alt="" />
                  )}
                </span>
                <div className="fa-tip__text" style={{ gap: tip.gap || 14 }}>
                  <p className={tip.gap ? 'fa-tip__title fa-tip__title--grow' : 'fa-tip__title'}>{tip.title}</p>
                  <p className="fa-tip__desc" style={tip.wide ? { width: 186 } : undefined}>
                    {tip.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------ */
/* Heat Exposure lesson intro (1646:12254)                             */
/* ------------------------------------------------------------------ */

export function FirstAidLesson() {
  const go = useGo()
  return (
    <Screen
      className="fa"
      fixed={
        <Button className="fa-cta btn--instant" onClick={() => go('/first-aid/practice')}>
          Start lesson
        </Button>
      }
    >
      <div className="fa-page" style={{ height: 876 }}>
        {/* Hover only in Figma; no destination is wired. */}
        <BackButton dark className="fa-abs" style={{ left: 23, top: 48 }} />
        <div className="fa-lesson-intro fa-abs" style={{ left: 23, top: 125 }}>
          <h1 className="fa-title fa-title--dark">Heat Exposure</h1>
          <div className="fa-lesson-intro__photo">
            <img src={heatPhoto} alt="" />
          </div>
        </div>
        {/* The body copy is outlined text in Figma, faded out with a gradient. */}
        <div className="fa-masked-copy" />
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------ */
/* Practice question (1646:12155) and answer (1646:12263)              */
/* ------------------------------------------------------------------ */

function PracticeHeader() {
  return (
    <>
      <div className="fa-practice-head">
        <p className="fa-body">First aid fundamentals</p>
        <div className="fa-practice-head__row">
          <h1 className="fa-title">Practice</h1>
          <p className="fa-timer">2:34</p>
        </div>
      </div>
    </>
  )
}

function ScenarioMeta() {
  return (
    <>
      <div className="fa-scenario-row">
        <span>Scenario 2 of 8</span>
        <span>12 of 14</span>
      </div>
      <div className="fa-topic">
        <span className="fa-topic__icon" />
        <span>Heat-related situations</span>
      </div>
    </>
  )
}

export function FirstAidPractice() {
  const go = useGo()
  return (
    <Screen
      className="fa"
      fixed={
        <button type="button" className="fa-skip" onClick={() => go('/first-aid/correct', 'slide-out-left')}>
          Skip
        </button>
      }
    >
      <div className="fa-page" style={{ height: 876 }}>
        <BackButton dark className="fa-abs" style={{ left: 23, top: 48 }} onClick={() => go('/first-aid')} />
        <div className="fa-practice fa-abs" style={{ left: 23, top: 126 }}>
          <PracticeHeader />
          <div className="fa-practice__body">
            <ScenarioMeta />
            <div className="fa-white-card fa-white-card--start">
              <div className="fa-question">
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
                <span className="fa-answer__blank">___</span>
                <span className="fa-answer__help">
                  <img src={questionCircle} alt="" />
                  <span>?</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

const WARTS = [
  ['W', 'armth'],
  ['A', 'BCs'],
  ['R', 'est and Reassure'],
  ['T', 'reatment'],
  ['S', 'uitable Position'],
]

export function FirstAidCorrect() {
  const go = useGo()
  return (
    <Screen
      className="fa"
      fixed={
        <div className="fa-answer-bar">
          <ProgressiveBlur />
          <div className="fa-answer-bar__pill" />
          <Button className="fa-answer-bar__retry" onClick={() => go('/first-aid/practice')}>
            Retry
          </Button>
          <Button className="fa-answer-bar__time">20 mins</Button>
        </div>
      }
    >
      <div className="fa-page" style={{ height: 1152 }}>
        <BackButton dark className="fa-abs" style={{ left: 23, top: 48 }} onClick={() => go('/first-aid')} />
        <div className="fa-practice fa-abs" style={{ left: 23, top: 126 }}>
          <PracticeHeader />
          <div className="fa-practice__body">
            <ScenarioMeta />
            <div className="fa-white-card">
              <div className="fa-card-head">
                <span>Correct!</span>
                <span className="fa-info">
                  <img src={infoCircle} alt="" />
                  <span>i</span>
                </span>
              </div>
              <div className="fa-heat">
                <img className="fa-heat__circle" style={{ left: 124 }} src={circleRight} alt="" />
                <img className="fa-heat__waves" src={heatWaves} alt="" />
                <img className="fa-heat__arrow" src={arrowLine} alt="" />
                <img className="fa-heat__circle" style={{ left: 0 }} src={circleLeft} alt="" />
                <span className="fa-heat__temp">36°-41°</span>
                <span className="fa-heat__thermo" />
              </div>
              <div className="fa-copy">
                <p>Good call, having heat exhaustion is no joke during a technical hike, its good to recuperate and rest.</p>
                <p>&#8203;</p>
                <p>Hydration and Rest are key to recovery from these conditions.</p>
              </div>
            </div>
            <div className="fa-white-card">
              <div className="fa-card-head">
                <span>Next Steps</span>
                <span className="fa-plus">
                  <img src={plusCircle} alt="" />
                  <img className="fa-plus__icon" src={plus} alt="" />
                </span>
              </div>
              <div className="fa-copy">
                <p>Take a rest, preferably in a shaded area and treat for shock. Reassess every 5-15 mins.</p>
                <p>&#8203;</p>
                <p>Make sure to hydrate sufficiently with water, remembering to keep resources in check</p>
              </div>
              <div className="fa-shock">
                <div className="fa-eye">
                  <img className="fa-eye__arc-bottom" src={arcBottom} alt="" />
                  <span className="fa-eye__arc-top">
                    <img src={arcTop} alt="" />
                  </span>
                  <img className="fa-eye__shape" src={eyeShape} alt="" />
                  <img className="fa-eye__iris" src={eyeIris} alt="" />
                  <img className="fa-eye__pupil" src={eyePupil} alt="" />
                  <img className="fa-eye__glint" src={eyeGlint} alt="" />
                  <span className="fa-eye__label">5-15 mins</span>
                </div>
                <div className="fa-shock__list">
                  <p className="fa-shock__title">Treating for Shock</p>
                  <div>
                    {WARTS.map(([letter, rest]) => (
                      <p className="fa-shock__item" key={letter}>
                        <span className="fa-shock__letter">{letter}</span>
                        <span className="fa-shock__rest">{rest}</span>
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

/* ------------------------------------------------------------------ */
/* Legal side (1646:12394)                                             */
/* ------------------------------------------------------------------ */

function InfoSmall() {
  return (
    <span className="fa-info-sm">
      <img src={infoSmall} alt="" />
      <span>i</span>
    </span>
  )
}

const STEPS = [
  ['1', 'Ask before you help', 'Getting consent', 69, 15.85],
  ['2', 'Stay within your training', 'Do what you learned, don’t improvise', 79, 13.85],
  ['3', 'Once you start, stay', 'Don’t leave until help arrives', 74, 13.85],
]

export function FirstAidLegal() {
  const go = useGo()
  return (
    <Screen
      className="fa"
      fixed={
        // Hover only in Figma; no destination is wired.
        <Button className="fa-cta btn--instant">Get First-aid certified</Button>
      }
    >
      <div className="fa-page" style={{ height: 970 }}>
        <BackButton dark className="fa-abs" style={{ left: 23, top: 48 }} onClick={() => go('/first-aid')} />
        <div className="fa-legal fa-abs" style={{ left: 23, top: 126 }}>
          <div className="fa-legal__head">
            <p className="fa-body">First aid fundamentals</p>
            <h1 className="fa-title">Legal side</h1>
          </div>
          <div className="fa-legal__boxes">
            <div className="fa-ybox" style={{ height: 83 }}>
              <div className="fa-ybox__row" style={{ left: 14, top: 26 }}>
                <InfoSmall />
                <p className="fa-micro" style={{ width: 213 }}>
                  General information, not legal advice. Law may differ by province.
                </p>
              </div>
            </div>
            <div className="fa-ybox" style={{ height: 231 }}>
              <p className="fa-ybox__title">You’re protected when you help in good faith</p>
              <div className="fa-ybox__body">
                <p className="fa-small" style={{ width: 298 }}>
                  BC’s <strong>Good Samaritan Act</strong> protecs people who give emergency aid at the scene, unless
                  they are grossly negligent.
                </p>
                <div className="fa-ybox__cite">
                  <InfoSmall />
                  <p className="fa-small">Good Samaritan Act, RSBC 1996, c. 172</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fa-steps">
            <p className="fa-subhead">Steps to take</p>
            <div className="fa-steps__list">
              {STEPS.map(([n, title, sub, height, numLeft]) => (
                <div className="fa-step" key={n} style={{ height }}>
                  <span className="fa-step__num">
                    <img src={stepCircle} alt="" />
                    <span style={{ left: numLeft }}>{n}</span>
                  </span>
                  <span className="fa-step__text">
                    <span className="fa-step__title">{title}</span>
                    <span className="fa-step__sub">{sub}</span>
                  </span>
                  <img className="fa-step__chev" src={chevron} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------ */
/* Get certified (1646:12465)                                          */
/* ------------------------------------------------------------------ */

const LEVELS = [
  ['Standard', 'Day hikers'],
  ['Intermediate', 'Trip leaders'],
  ['Advanced', 'Rescuers'],
]

const PROVIDERS = [
  { name: 'Canadian Red Cross', next: 'Next: Aug 15 2026        $150', logo: redCross, img: { left: -84, top: -28, width: 256, height: 144 } },
  { name: 'Lifesaving Society', next: 'Next: Sep 2 2026        $140', logo: lifesaving, img: { left: -6, top: 0, width: 106, height: 89 } },
  { name: 'St. Johns Ambulance', next: 'Next: Aug 19 2026        $140', logo: stJohns, img: { left: -24, top: -18, width: 135, height: 135 } },
]

export function FirstAidCertified() {
  const go = useGo()
  const [level, setLevel] = useState(null)
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ height: 923, overflow: 'hidden' }}>
        <div className="fa-location fa-abs" style={{ left: 222, top: 39 }}>
          <span className="fa-location__bg" />
          <span className="fa-location__pin">
            <img src={mapPin} alt="" />
          </span>
          <span className="fa-location__text">Vancouver, BC</span>
        </div>
        <BackButton dark className="fa-abs" style={{ left: 23, top: 48 }} onClick={() => go('/first-aid')} />

        <div className="fa-cert fa-abs" style={{ left: 23, top: 126 }}>
          <h1 className="fa-title">Get certified</h1>
          <div className="fa-ybox" style={{ height: 69, marginBottom: 1 }}>
            <div className="fa-ybox__row" style={{ left: 16, top: 19 }}>
              <InfoSmall />
              <p className="fa-micro" style={{ width: 266 }}>
                The app helps you practice, but real life courses gives you hands-on skills and a certificate.
              </p>
            </div>
          </div>
          <div className="fa-levels">
            <p className="fa-subhead">Course level</p>
            <div className="fa-levels__row">
              {LEVELS.map(([name, who], i) => (
                <button
                  type="button"
                  key={name}
                  className={level === i ? 'fa-level fa-level--selected' : 'fa-level'}
                  style={i === 1 ? { paddingLeft: 7 } : undefined}
                  aria-pressed={level === i}
                  onClick={() => setLevel(level === i ? null : i)}
                >
                  <span className="fa-level__name">{name}</span>
                  <span className="fa-level__who">{who}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="fa-subhead fa-abs" style={{ left: 23, top: 432, lineHeight: 1.68 }}>
          Categories
        </p>
        <TagGroup className="fa-abs fa-cats" options={['CPR', 'Aquatics', 'Waterfront', 'Emergency First-aid']} />

        <p className="fa-subhead fa-abs" style={{ left: 27, top: 583 }}>
          First aid courses near you
        </p>
        <div className="fa-providers fa-abs" style={{ left: 27, top: 615 }}>
          {PROVIDERS.map((p) => (
            <div className="fa-provider" key={p.name}>
              <span className="fa-provider__logo">
                <img src={p.logo} alt="" style={p.img} />
              </span>
              <span className="fa-provider__info">
                <span className="fa-provider__name">{p.name}</span>
                <span className="fa-provider__line">CPR/AED Level C      2 days</span>
                <span className="fa-provider__line fa-provider__next">{p.next}</span>
              </span>
              <img className="fa-provider__chev" src={chevron} alt="" />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

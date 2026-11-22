import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { TagGroup } from '../../components/controls.jsx'
import cardChevron from '../../assets/first-aid/card-chevron.svg' // course cards
import stepCircle from '../../assets/first-aid/step-circle.svg'
import mapPin from '../../assets/first-aid/map-pin.svg'
import redCross from '../../assets/first-aid/red-cross.png'
import lifesaving from '../../assets/first-aid/lifesaving-society.png'
import stJohns from '../../assets/first-aid/st-johns.png'
import { COURSES, CATEGORIES } from '../../data/courses.js'
import { Back, Info } from './parts.jsx'

/* ---------- 1646:12394  Right or wrong (Legal side) ---------- */

const STEPS = [
  ['1', 'Ask before you help', 'Getting consent'],
  ['2', 'Stay within your training', 'Do what you learned, don’t improvise'],
  ['3', 'Once you start, stay', 'Don’t leave until help arrives'],
]

export function LegalSide() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page">
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
                  BC’s <strong>Good Samaritan Act</strong> protects people who give emergency aid at the scene, unless
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
              {STEPS.map(([n, title, sub]) => (
                <div className="fa-step" key={n}>
                  <span className="fa-step__num">
                    <img src={stepCircle} alt="" />
                    <span>{n}</span>
                  </span>
                  <span className="fa-step__text">
                    <span className="fa-step__title">{title}</span>
                    <span className="fa-step__sub">{sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Round 19: after the steps (not pinned) so it never covers step 3. */}
          <Button className="fa-certify" onClick={() => go('/first-aid/certified', 'slide-in-left')}>
            Get First-aid certified
          </Button>
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

const ORGS = {
  'red-cross': { logo: redCross, name: 'Canadian Red Cross' },
  lifesaving: { logo: lifesaving, name: 'Lifesaving Society' },
  'st-johns': { logo: stJohns, name: 'St. John Ambulance' },
}

export function GetCertified() {
  const [level, setLevel] = useState(null)
  const [category, setCategory] = useState(null)
  // Level + category filter the list; nothing picked = every course.
  const courses = COURSES.filter((c) => (!level || c.level === level) && (!category || c.categories.includes(category)))
  return (
    <Screen className="fa">
      {/* Figma's frame (923px) clips the third card; it is extended here so every course can be tapped. */}
      <div className="fa-page">
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
            <p>The app helps you practice, but real-life courses give you hands-on skills and a certificate.</p>
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
        {/* Categories + courses flow (Round 18): the list length changes with the filters. */}
        <div className="fa-cert-list">
        <p className="fa-section-title fa-categories__title">Categories</p>
        <TagGroup className="fa-categories" options={CATEGORIES} value={category} onChange={setCategory} />
        <p className="fa-section-title fa-courses__title">First aid courses near you</p>
        <div className="fa-courses">
          {courses.length === 0 && <p className="fa-courses__empty">No courses match. Try another level or category.</p>}
          {courses.map((c) => (
            <a className="fa-course" key={c.name} href={c.url} target="_blank" rel="noopener noreferrer">
              <span className={`fa-course__logo fa-course__logo--${c.org}`}>
                <img src={ORGS[c.org].logo} alt="" />
              </span>
              <span className="fa-course__text">
                <span className="fa-course__name">{c.name}</span>
                <span className="fa-course__line">{ORGS[c.org].name}</span>
                <span className="fa-course__line fa-course__next">
                  {c.length} · See dates
                </span>
              </span>
              <img className="fa-course__chev" src={cardChevron} alt="" />
            </a>
          ))}
        </div>
        </div>
      </div>
    </Screen>
  )
}

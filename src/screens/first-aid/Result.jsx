import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import useGo from '../../app/useGo.js'
import { completeLesson } from '../../app/progress.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { lessonBySlug } from '../../data/firstAid.js'
import tempCircleLeft from '../../assets/first-aid/temp-circle-left.svg'
import tempCircleRight from '../../assets/first-aid/temp-circle-right.svg'
import tempArrow from '../../assets/first-aid/temp-arrow.svg'
import heatWaves from '../../assets/first-aid/heat-waves.svg'
import thermometerMask from '../../assets/first-aid/thermometer-mask.png'
import eyeArcTop from '../../assets/first-aid/eye-arc-top.svg'
import eyeArcBottom from '../../assets/first-aid/eye-arc-bottom.svg'
import eyeShape from '../../assets/first-aid/eye-shape.svg'
import eyeIris from '../../assets/first-aid/eye-iris.svg'
import eyePupil from '../../assets/first-aid/eye-pupil.svg'
import eyeGlint from '../../assets/first-aid/eye-glint.svg'
import { Back, PracticeHeader, ScenarioBar } from './parts.jsx'

/* ---------- 1646:12263  Right or wrong → end of every lesson ---------- */

export function LessonComplete() {
  const go = useGo()
  const lesson = lessonBySlug(useParams().lesson)
  // Finishing a lesson completes it (module list + Training overview turn green).
  useEffect(() => {
    if (lesson) completeLesson(lesson.name)
  }, [lesson])
  if (!lesson) return <Navigate to="/first-aid" replace />
  return (
    <Screen
      className="fa"
      fixed={
        <div className="fa-bar">
          {/* Same progressive blur as the nav bar: clear at the top, strongest behind the buttons. */}
          <div className="fa-bar__blur">
            <ProgressiveBlur />
          </div>
          <div className="fa-bar__pill" />
          <Button className="fa-bar__retry" onClick={() => go(`/first-aid/${lesson.slug}/practice`)}>
            Retry
          </Button>
          <Button className="fa-bar__mins" onClick={() => go('/first-aid', 'smart')}>
            Continue
          </Button>
        </div>
      }
    >
      <div className="fa-page fa-flow fa-flow--bar">
        <Back to="/first-aid" />
        <PracticeHeader />
        <div className="fa-scenario">
          <ScenarioBar lesson={lesson} />
          {lesson.slug === 'heat' ? <HeatResult /> : <Takeaways lesson={lesson} />}
        </div>
      </div>
    </Screen>
  )
}

function Takeaways({ lesson }) {
  return (
    <>
      <div className="fa-white fa-white--center">
        <div className="fa-white__head">
          <p>Lesson complete!</p>
        </div>
        <p className="fa-white__copy">{lesson.result.copy}</p>
      </div>
      <div className="fa-white fa-white--center">
        <div className="fa-white__head">
          <p>Key takeaways</p>
        </div>
        <ul className="fa-takeaways">
          {lesson.result.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

/** Figma 1646:12263 cards (thermometer, Treating for Shock), heading renamed to match the other lessons. */
function HeatResult() {
  return (
    <>
      <div className="fa-white fa-white--center">
        <div className="fa-white__head">
          <p>Lesson complete!</p>
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
    </>
  )
}

import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import { useEffect } from 'react'
import useGo from '../../app/useGo.js'
import { completeLesson } from '../../app/progress.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import hiker from '../../assets/first-aid/hiker.png'
import questionCircle from '../../assets/first-aid/question-circle.svg'
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
import { Back, Info, PracticeHeader, ScenarioBar } from './parts.jsx'

/* ---------- 1646:12155  Practice (scenario question) ---------- */

export function Practice() {
  const go = useGo()
  return (
    <Screen className="fa">
      <div className="fa-page" style={{ minHeight: 876 }}>
        <Back to="/first-aid/heat" />
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
  // Reaching "Correct!" completes the Heat Exposure lesson (module list + training overview turn green).
  useEffect(() => completeLesson('Heat Exposure'), [])
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
          <Button className="fa-bar__retry" onClick={() => go('/first-aid/practice')}>
            Retry
          </Button>
          {/* No destination in the prototype; finishes the lesson back on the module list. */}
          <Button className="fa-bar__mins" onClick={() => go('/first-aid', 'smart')}>
            20 mins
          </Button>
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

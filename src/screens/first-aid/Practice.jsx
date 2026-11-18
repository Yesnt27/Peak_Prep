import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { Tag } from '../../components/controls.jsx'
import { lessonBySlug } from '../../data/firstAid.js'
import { Back, Info, PracticeHeader, ScenarioBar } from './parts.jsx'

const TIME_LIMIT = 3 * 60 // seconds per scenario

/* ---------- 1646:12155  Practice (one scenario at a time, every lesson) ---------- */

export function Practice() {
  const { lesson: slug } = useParams()
  const lesson = lessonBySlug(slug)
  const [index, setIndex] = useState(0)
  if (!lesson) return <Navigate to="/first-aid" replace />
  return (
    <Screen className="fa">
      <Scenario
        key={index}
        lesson={lesson}
        index={index}
        onNext={() => setIndex(index + 1)}
      />
    </Screen>
  )
}

/** Keyed by scenario, so the answer, hint and timer start fresh each time. */
function Scenario({ lesson, index, onNext }) {
  const go = useGo()
  const ref = useRef(null)
  const [answer, setAnswer] = useState('')
  const [hint, setHint] = useState(false)
  const [checked, setChecked] = useState(false)
  const [left, setLeft] = useState(TIME_LIMIT)
  const scenario = lesson.scenarios[index]
  const last = index === lesson.scenarios.length - 1
  const hasAnswer = answer.trim().length > 0

  // New scenario: back to the top of the page.
  useEffect(() => {
    ref.current?.closest('.screen__scroll')?.scrollTo(0, 0)
  }, [])

  // Countdown; stops at 0:00 or once the answer is checked.
  useEffect(() => {
    if (checked || left <= 0) return
    const t = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(t)
  }, [checked, left])

  const next = () => (last ? go(`/first-aid/${lesson.slug}/complete`, 'smart') : onNext())

  return (
    <div className="fa-page fa-flow fa-scn" ref={ref}>
      <Back to={`/first-aid/${lesson.slug}`} />
      <PracticeHeader seconds={left} />
      <div className="fa-scenario">
        <ScenarioBar lesson={lesson} index={index} />
        <div className="fa-white fa-white--question">
          <div className="fa-question__text">
            <p className="fa-question__title">Scenario {index + 1}</p>
            <p className="fa-question__body">{scenario.text}</p>
          </div>
          <div className="fa-answer">
            <textarea
              className="fa-answer__input"
              aria-label="Your answer"
              placeholder="Type your answer…"
              value={answer}
              readOnly={checked}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="fa-hint">
            <Tag compact selected={hint} className="fa-hint__btn" onClick={() => setHint(!hint)}>
              Hint
            </Tag>
            {hint && <p className="fa-hint__text">{scenario.hint}</p>}
          </div>
        </div>

        {checked && (
          <div className="fa-white fa-white--center fa-feedback">
            <div className="fa-white__head">
              <p>Suggested answer</p>
              <Info size={27} />
            </div>
            <p className="fa-white__copy">{scenario.answer}</p>
          </div>
        )}

        <div className="fa-actions">
          {checked ? (
            <Button className="fa-actions__main" onClick={next}>
              {last ? 'See results' : 'Next scenario'}
            </Button>
          ) : (
            <>
              <button type="button" className="fa-skip fa-skip--inline" onClick={next}>
                Skip
              </button>
              <Button className="fa-actions__main" disabled={!hasAnswer} onClick={() => setChecked(true)}>
                Check
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { Tag } from '../../components/controls.jsx'
import { lessonBySlug } from '../../data/firstAid.js'
import Feedback from './Feedback.jsx'
import { ActionBar, Back, PracticeHeader, ScenarioBar } from './parts.jsx'

const TIME_LIMIT = 3 * 60 // seconds per scenario

/* ---------- 1646:12155  Practice → 1646:12263 feedback (one scenario at a time, every lesson) ---------- */

export function Practice() {
  const go = useGo()
  const { lesson: slug } = useParams()
  const lesson = lessonBySlug(slug)
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(0) // Retry → same scenario, fresh answer + timer
  const [checked, setChecked] = useState(false)
  if (!lesson) return <Navigate to="/first-aid" replace />
  const last = index === lesson.scenarios.length - 1

  const next = () => {
    if (last) return go(`/first-aid/${lesson.slug}/complete`, 'smart')
    setChecked(false)
    setIndex(index + 1)
  }
  const retry = () => {
    setChecked(false)
    setAttempt(attempt + 1)
  }

  return (
    <Screen
      className="fa"
      fixed={
        checked && (
          <ActionBar className="fa-bar--in" label={last ? 'See results' : 'Next scenario'} onRetry={retry} onNext={next} />
        )
      }
    >
      <Scenario
        key={`${index}.${attempt}`}
        lesson={lesson}
        index={index}
        checked={checked}
        onCheck={() => setChecked(true)}
        onSkip={next}
      />
    </Screen>
  )
}

/** Keyed by scenario + attempt, so the answer, hint and timer start fresh each time. */
function Scenario({ lesson, index, checked, onCheck, onSkip }) {
  const ref = useRef(null)
  const [answer, setAnswer] = useState('')
  const [hint, setHint] = useState(false)
  const [left, setLeft] = useState(TIME_LIMIT)
  const scenario = lesson.scenarios[index]
  const hasAnswer = answer.trim().length > 0

  // New scenario, or the answer was just checked: back to the top of the page.
  useEffect(() => {
    ref.current?.closest('.screen__scroll')?.scrollTo(0, 0)
  }, [checked])

  // Countdown; stops at 0:00 or once the answer is checked.
  useEffect(() => {
    if (checked || left <= 0) return
    const t = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(t)
  }, [checked, left])

  return (
    <div className={`fa-page fa-flow fa-scn${checked ? ' fa-flow--bar' : ''}`} ref={ref}>
      <Back to={`/first-aid/${lesson.slug}`} />
      <PracticeHeader seconds={left} />
      <div className="fa-scenario">
        <ScenarioBar lesson={lesson} index={index} />
        {checked ? (
          <Feedback scenario={scenario} />
        ) : (
          <>
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

            <div className="fa-actions">
              <button type="button" className="fa-skip fa-skip--inline" onClick={onSkip}>
                Skip
              </button>
              <Button className="fa-actions__main" disabled={!hasAnswer} onClick={onCheck}>
                Check
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

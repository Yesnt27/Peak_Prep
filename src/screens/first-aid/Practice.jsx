import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { lessonBySlug } from '../../data/firstAid.js'
import Feedback from './Feedback.jsx'
import { ActionBar, PracticeTop } from './parts.jsx'
import './Practice.css'

const TIME_LIMIT = 3 * 60 // seconds per scenario

/* ---------- 2579:6448  Practice question → 1646:12263 feedback (one scenario at a time, every lesson) ---------- */

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
        checked ? (
          <ActionBar className="fa-bar--in" label={last ? 'See results' : 'Next scenario'} onRetry={retry} onNext={next} />
        ) : (
          <QuestionBar onSkip={next} onCheck={() => setChecked(true)} />
        )
      }
    >
      <Scenario key={`${index}.${attempt}`} lesson={lesson} index={index} checked={checked} />
    </Screen>
  )
}

/** Figma group 2579:6470: Skip (green) + Check (yellow) in a grey pill, over a white fade so the page never cuts off. */
function QuestionBar({ onSkip, onCheck }) {
  return (
    <div className="fa-qbar">
      <div className="fa-qbar__pill">
        <Button variant="green" className="fa-qbar__skip" onClick={onSkip}>
          Skip
        </Button>
        <Button variant="yellow" className="fa-qbar__check" onClick={onCheck}>
          Check
        </Button>
      </div>
    </div>
  )
}

/** Keyed by scenario + attempt, so the answer, hint and timer start fresh each time. */
function Scenario({ lesson, index, checked }) {
  const ref = useRef(null)
  const [answer, setAnswer] = useState('')
  const [hint, setHint] = useState(false)
  const [left, setLeft] = useState(TIME_LIMIT)
  const scenario = lesson.scenarios[index]
  const count = `Scenario ${index + 1} of ${lesson.scenarios.length}`

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
    <div className="fa-q" ref={ref}>
      <PracticeTop lesson={lesson} back={`/first-aid/${lesson.slug}`} seconds={left} />

      {checked ? (
        <div className="fa-scenario fa-q__feedback">
          <p className="fa-scenario__count">{count}</p>
          <Feedback scenario={scenario} />
        </div>
      ) : (
        <>
          {/* Figma's grey image block (2579:6485): the lesson photo. */}
          <img className="fa-q__photo" src={lesson.photo} alt="" />
          <section className="fa-q__sheet">
            <p className="fa-q__count">{count}</p>
            <p className="fa-q__text">{scenario.text}</p>
            {hint && <p className="fa-q__hint-text">Hint: {scenario.hint}</p>}
            <div className="fa-q__answer">
              <textarea
                className="fa-q__input"
                aria-label="Your answer"
                placeholder="Type your answer___"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                type="button"
                className="fa-q__hint"
                aria-label={hint ? 'Hide hint' : 'Show hint'}
                aria-pressed={hint}
                onClick={() => setHint(!hint)}
              >
                ?
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

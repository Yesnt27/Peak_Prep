import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import { Tag } from '../../components/controls.jsx'
import { lessonBySlug } from '../../data/firstAid.js'
import Feedback from './Feedback.jsx'
import { ActionBar, PracticeTop } from './parts.jsx'
import './Practice.css'

/* ---------- 2579:6448  Practice question → 1646:12263 feedback (one scenario at a time, every lesson) ---------- */

export function Practice() {
  const go = useGo()
  const { lesson: slug } = useParams()
  const lesson = lessonBySlug(slug)
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(0) // Retry → same scenario, fresh answer
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

/** Skip + Check in the same nav-bar pill as Retry / Next (Round 19). */
function QuestionBar({ onSkip, onCheck }) {
  return <ActionBar retryLabel="Skip" label="Check" nextVariant="yellow" onRetry={onSkip} onNext={onCheck} />
}

/** Keyed by scenario + attempt, so the answer and hint start fresh each time. */
function Scenario({ lesson, index, checked }) {
  const ref = useRef(null)
  const [answer, setAnswer] = useState('')
  const [hint, setHint] = useState(false)
  const scenario = lesson.scenarios[index]
  const count = `Scenario ${index + 1} of ${lesson.scenarios.length}`

  // New scenario, or the answer was just checked: back to the top of the page.
  useEffect(() => {
    ref.current?.closest('.screen__scroll')?.scrollTo(0, 0)
  }, [checked])

  return (
    <div className="fa-q" ref={ref}>
      <PracticeTop lesson={lesson} back={`/first-aid/${lesson.slug}`} />

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
            <div className="fa-q__answer">
              <textarea
                className="fa-q__input"
                aria-label="Your answer"
                placeholder="Type your answer. . ."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            {/* Hint below the answer box, as before Round 20: tag toggles the hint text under it. */}
            <div className="fa-hint">
              <Tag compact selected={hint} className="fa-hint__btn" onClick={() => setHint(!hint)}>
                Hint
              </Tag>
              {hint && <p className="fa-hint__text">{scenario.hint}</p>}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

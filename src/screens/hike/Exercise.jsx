import { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import { useAccount, useTraining } from '../../app/account.js'
import { dayKey, doneOn, setDone } from '../../app/workouts.js'
import { EXERCISES, workoutFor } from '../../data/exercises.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton } from '../../components/controls.jsx'
import './Exercise.css'

const LENGTH = 5 * 60 // every exercise starts at 5:00 (Round 20)

const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function fromKey(key) {
  const [y, m, d] = (key ?? '').split('-').map(Number)
  const date = y ? new Date(y, m - 1, d) : new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

const Chevron = ({ left }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={left ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PlayPause = ({ playing }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
    <circle cx="15" cy="15" r="15" fill="#fff" />
    {playing ? (
      <path d="M11.5 9.5v11M18.5 9.5v11" stroke="var(--main-green)" strokeWidth="3" strokeLinecap="round" />
    ) : (
      <path d="M12 9.6l8.4 5.4-8.4 5.4z" fill="var(--main-green)" />
    )}
  </svg>
)

/**
 * "Training - Endurance.png" (Round 20): one exercise from Daily Training. Title = the row's text,
 * subtitle = the day and "Workout n/N", photo / drawing with the timer, progress bar, and
 * previous / start-pause / next. The timer starts at 5:00; finishing ticks the exercise off.
 */
export default function Exercise() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const location = useLocation()
  const go = useGo()
  const training = useTraining()
  const isDemo = useAccount().type === 'demo'
  const date = fromKey(params.get('date'))
  const planned = workoutFor(training, date, isDemo)
  const index = planned.indexOf(id)
  const exercise = EXERCISES[id]

  const [left, setLeft] = useState(LENGTH)
  const [state, setState] = useState('ready') // ready → running ⇄ paused → finished

  // New exercise (prev / next): fresh timer.
  useEffect(() => {
    setLeft(LENGTH)
    setState('ready')
  }, [id])

  useEffect(() => {
    if (state !== 'running') return undefined
    const timer = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [state])

  useEffect(() => {
    if (left > 0 || state !== 'running') return
    setState('finished')
    const done = doneOn(training.hike, date, planned, isDemo)
    if (!done.includes(id)) setDone(training.hike, date, [...done, id])
  }, [left, state]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!exercise) return <Navigate to="/training/schedule" replace />

  const open = (i) => go(`/training/exercise/${planned[i]}?date=${dayKey(date)}`, undefined, location.state?.from)
  const pct = ((LENGTH - left) / LENGTH) * 100
  const day = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  return (
    <Screen className="ex" fixed={<NavBar />}>
      <div className="ex-page">
        <BackButton className="ex-back" onClick={() => go(location.state?.from || '/training/schedule', 'smart')} />
        <h1 className="ex-title">{exercise.label}</h1>
        <p className="ex-sub">
          {day} {index >= 0 && `Workout ${index + 1}/${planned.length}`}
        </p>

        <div className={exercise.drawing ? 'ex-media ex-media--drawing' : 'ex-media'}>
          <img src={exercise.image} alt={`How to do ${exercise.label.split(' · ')[0].toLowerCase()}`} />
          <p className="ex-timer" aria-live="off" role="timer">
            {clock(left)}
          </p>
        </div>

        <div className="ex-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
          <div className="ex-progress__fill" style={{ width: `${pct}%` }} />
          <span className="ex-progress__thumb" style={{ left: `${pct}%` }} />
        </div>

        <div className="ex-controls">
          <button type="button" className="ex-step" aria-label="Previous exercise" disabled={index <= 0} onClick={() => open(index - 1)}>
            <Chevron left />
          </button>
          <button
            type="button"
            className="ex-main"
            aria-label={state === 'running' ? 'Pause' : state === 'ready' ? 'Start' : state === 'finished' ? 'Restart' : 'Play'}
            onClick={() => {
              if (state === 'finished') {
                setLeft(LENGTH)
                setState('running')
              } else setState(state === 'running' ? 'paused' : 'running')
            }}
          >
            {state === 'ready' ? 'Start' : state === 'finished' ? 'Restart' : <PlayPause playing={state === 'running'} />}
          </button>
          <button
            type="button"
            className="ex-step"
            aria-label="Next exercise"
            disabled={index < 0 || index >= planned.length - 1}
            onClick={() => open(index + 1)}
          >
            <Chevron />
          </button>
        </div>

        <p className="ex-how">{exercise.how}</p>
        <p className="ex-credit">
          Image: {exercise.credit.artist},{' '}
          <a href={exercise.credit.source} target="_blank" rel="noopener noreferrer">
            {exercise.credit.license}
          </a>
        </p>
      </div>
    </Screen>
  )
}

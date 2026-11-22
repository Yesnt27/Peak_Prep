import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import { useAccount, useTraining } from '../../app/account.js'
import { dayKey, doneOn, setDone, useWorkouts } from '../../app/workouts.js'
import { EXERCISES, workoutFor } from '../../data/exercises.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { BackButton } from '../../components/controls.jsx'
import { SectionHeader } from './parts.jsx'
import calendarIcon from '../../assets/training/calendar.svg'
import chevLeft from '../../assets/training/chev-left.svg'
import chevRight from '../../assets/training/chev-right.svg'
import rowChevron from '../../assets/icons/chev-right.svg'
import checkDefault from '../../assets/icons/check-default.svg'
import checkGreen from '../../assets/icons/check-green.svg'
import dotDone from '../../assets/training/dot-done.svg'
import dotToday from '../../assets/training/dot-today.svg'
import '../../components/ListItem.css'
import './TrainingOverview.css'
import './TrainingSchedule.css'

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const today = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}
const addDays = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
const sameDay = (a, b) => dayKey(a) === dayKey(b)

/** Today's plan for the opened training, for Training overview's "Training Schedule" card. */
export function useTodaysWorkout() {
  useWorkouts()
  const training = useTraining()
  const isDemo = useAccount().type === 'demo'
  const date = today()
  const planned = workoutFor(training, date, isDemo)
  const done = doneOn(training.hike, date, planned, isDemo)
  return { planned, done, date }
}

/**
 * Figma "Training Schedule" 2068:5154 (Round 20): the week strip starts on this week, with the
 * month + year of the shown week. Dots mark training days (green = all done). A new account
 * only trains on the days picked in New training → Your training schedule.
 */
export default function TrainingSchedule() {
  const go = useGo()
  const location = useLocation()
  useWorkouts()
  const training = useTraining()
  const isDemo = useAccount().type === 'demo'
  const [selected, setSelected] = useState(today)
  const weekStart = addDays(selected, -selected.getDay())
  const week = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const plan = (date) => workoutFor(training, date, isDemo)
  const planned = plan(selected)
  const done = doneOn(training.hike, selected, planned, isDemo)
  const month = selected.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const toggle = (id) =>
    setDone(training.hike, selected, done.includes(id) ? done.filter((d) => d !== id) : [...done, id])

  return (
    <Screen className="to ts" fixed={<NavBar />}>
      <div className="ts-page">
        <BackButton className="ts-back" onClick={() => go(location.state?.from || '/training', 'smart')} />
        <div className="ts-content">
          <section className="to-section ts-daily">
            <h1 className="ts-title">Daily Training</h1>
            <SectionHeader icon={calendarIcon} title={month}>
              <div className="to-cal__nav">
                <button type="button" className="to-cal__arrow" aria-label="Previous week" onClick={() => setSelected(addDays(selected, -7))}>
                  <img src={chevLeft} alt="" />
                </button>
                <button type="button" className="to-cal__arrow" aria-label="Next week" onClick={() => setSelected(addDays(selected, 7))}>
                  <img src={chevRight} alt="" />
                </button>
              </div>
            </SectionHeader>

            <div className="to-week">
              {week.map((date) => {
                const ids = plan(date)
                const allDone = ids.length > 0 && doneOn(training.hike, date, ids, isDemo).length === ids.length
                const isSelected = sameDay(date, selected)
                return (
                  <button
                    type="button"
                    className={isSelected ? 'to-day to-day--today' : 'to-day'}
                    key={dayKey(date)}
                    aria-pressed={isSelected}
                    aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    onClick={() => setSelected(date)}
                  >
                    <p className="to-day__weekday">{WEEKDAY_LETTERS[date.getDay()]}</p>
                    <p className="to-day__date">{String(date.getDate()).padStart(2, '0')}</p>
                    <span className="to-day__dot">
                      {ids.length > 0 && (
                        <img className={allDone || isSelected ? undefined : 'ts-dot--planned'} src={isSelected ? dotToday : dotDone} alt="" />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {planned.length === 0 ? (
              <EmptyState title="Rest day" text="No training planned for this day. Recovery is part of the plan." />
            ) : (
              <>
                <p className="to-daily">
                  Daily training · {done.length} of {planned.length} done
                </p>
                {planned.map((id) => {
                  const checked = done.includes(id)
                  return (
                    <div className={checked ? 'list-item ts-row list-item--checked' : 'list-item ts-row'} key={id}>
                      <button
                        type="button"
                        className="ts-row__check"
                        aria-pressed={checked}
                        aria-label={`Mark ${EXERCISES[id].label} done`}
                        onClick={() => toggle(id)}
                      >
                        <img src={checked ? checkGreen : checkDefault} alt="" />
                      </button>
                      {/* Round 20: the arrow (and name) open the exercise with its timer. */}
                      <button
                        type="button"
                        className="ts-row__open"
                        onClick={() => go(`/training/exercise/${id}?date=${dayKey(selected)}`, 'smart', location.pathname)}
                      >
                        <span className="list-item__label">{EXERCISES[id].label}</span>
                        <img className="ts-chevron" src={rowChevron} alt="" />
                      </button>
                    </div>
                  )
                })}
              </>
            )}
          </section>
        </div>
      </div>
    </Screen>
  )
}

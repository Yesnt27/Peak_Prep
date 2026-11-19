import { useState } from 'react'
import { useAccount } from '../../app/account.js'
import { SectionHeader } from './parts.jsx'
import calendarIcon from '../../assets/training/calendar.svg'
import chevLeft from '../../assets/training/chev-left.svg'
import chevRight from '../../assets/training/chev-right.svg'
import dotDone from '../../assets/training/dot-done.svg'
import dotToday from '../../assets/training/dot-today.svg'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Figma's month and week. [weekday, date, dot]: 'done' = green dot, 'today' = today's dot, null = none.
const BASE_YEAR = 2026
const BASE_MONTH = 9 // October
const FIGMA_WEEK = [
  ['S', '26', 'done'],
  ['M', '27', 'done'],
  ['T', '28', 'today'],
  ['W', '29', null],
  ['T', '30', null],
  ['F', '31', null],
  ['S', '01', null],
]

const pad = (n) => String(n).padStart(2, '0')

/** Sunday-to-Saturday week of `year`/`month` that contains `day` (no training dots outside Figma's week). */
function weekOf(year, month, day) {
  const start = new Date(year, month, day)
  start.setDate(day - start.getDay())
  return WEEKDAYS.map((weekday, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return [weekday, pad(d.getDate()), null]
  })
}

/**
 * "October 2026" header with working ‹ › arrows + the week strip.
 * The arrows step one month back / forward (October → September). The selected day number
 * is kept (clamped to the month's length) and the strip shows the week around it.
 */
export default function TrainingCalendar() {
  const fresh = useAccount().type === 'new'
  const [offset, setOffset] = useState(0) // months away from October 2026
  const [day, setDay] = useState('28')

  const first = new Date(BASE_YEAR, BASE_MONTH + offset, 1)
  const year = first.getFullYear()
  const month = first.getMonth()
  const isBase = offset === 0
  const week = isBase ? FIGMA_WEEK : weekOf(year, month, Number(day))

  const step = (by) => {
    const next = new Date(BASE_YEAR, BASE_MONTH + offset + by, 1)
    const days = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
    setOffset(offset + by)
    setDay(pad(Math.min(Number(day), days)))
  }

  return (
    <>
      <SectionHeader icon={calendarIcon} title={`${MONTHS[month]} ${year}`}>
        <div className="to-cal__nav">
          <button type="button" className="to-cal__arrow" aria-label="Previous month" onClick={() => step(-1)}>
            <img src={chevLeft} alt="" />
          </button>
          <button type="button" className="to-cal__arrow" aria-label="Next month" onClick={() => step(1)}>
            <img src={chevRight} alt="" />
          </button>
        </div>
      </SectionHeader>
      <div className="to-week">
        {week.map(([weekday, date, dot]) => (
          <button
            type="button"
            className={date === day ? 'to-day to-day--today' : 'to-day'}
            key={date}
            aria-pressed={date === day}
            onClick={() => setDay(date)}
          >
            <p className="to-day__weekday">{weekday}</p>
            <p className="to-day__date">{date}</p>
            <span className="to-day__dot">
              {dot && !(fresh && dot === 'done') && <img src={date === day ? dotToday : dotDone} alt="" />}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

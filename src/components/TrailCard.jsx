import { useRef, useState } from 'react'
import useGo from '../app/useGo.js'
import { HIKES } from '../data/hikes.js'
import { toggleLike, useAccount } from '../app/account.js'
import calendarIcon from '../assets/icons/calendar.svg'
import heartOutline from '../assets/icons/heart-outline.svg'
import heartFilled from '../assets/icons/heart-filled.svg'
import starIcon from '../assets/icons/star.svg'
import './TrailCard.css'

const titleCase = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())

/**
 * The app's one hike card ("trail card.png"). With `progress` it becomes the
 * "trail-prep-progress card.png" version (date chip + Prep status bar).
 * - `id`: key in data/hikes.js. Tapping the card opens that hike's details (`/hike/:id`),
 *   unless `onClick` is given (e.g. a training card opens the training plan).
 * - Photos swipe sideways (touch, trackpad or mouse drag); the dots show / pick the photo.
 * - The heart is the account's like for this hike (Round 30), the same one Hike Details shows.
 * - `selected` adds the green ring used when picking a hike in a flow.
 * - `progress`: { pct: 0–100, text: '82% ready · 10 days to go' }.
 */
export default function TrailCard({ id, date, progress, selected = false, onClick }) {
  const go = useGo()
  const hike = HIKES[id]
  const liked = (useAccount().liked ?? []).includes(id)
  const [index, setIndex] = useState(0)
  const photosRef = useRef(null)
  const dragged = useRef(false)
  const [difficulty, type] = hike.tag.split(' • ').map(titleCase)
  const open = onClick ?? (() => go(`/hike/${id}`, 'smart'))

  const showPhoto = (i) => {
    const el = photosRef.current
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  // Mouse drag to swipe photos on a computer; a drag doesn't count as a tap on the card.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = photosRef.current
    const startX = e.clientX
    const startLeft = el.scrollLeft
    el.classList.add('tc-photos--dragging')
    const move = (ev) => {
      if (Math.abs(ev.clientX - startX) > 5) dragged.current = true
      el.scrollLeft = startLeft - (ev.clientX - startX)
    }
    const up = () => {
      el.classList.remove('tc-photos--dragging')
      showPhoto(Math.round(el.scrollLeft / el.clientWidth))
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <div
      className={selected ? 'tc tc--selected' : 'tc'}
      role="button"
      tabIndex={0}
      aria-pressed={selected || undefined}
      aria-label={hike.title}
      // A new press starts fresh (the photo strip's own handler marks real drags as it moves).
      onPointerDownCapture={() => {
        dragged.current = false
      }}
      onClick={() => {
        if (!dragged.current) open()
      }}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          open()
        }
      }}
    >
      <div className="tc-media">
        <div
          className="tc-photos"
          ref={photosRef}
          onPointerDown={onPointerDown}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        >
          {hike.photos.map((src, i) => (
            <img key={src} className="tc-photo" src={src} alt="" draggable="false" loading={i ? 'lazy' : undefined} />
          ))}
        </div>
        <div className="tc-fade" />
        <div className="tc-top">
          <div className="tc-chips">
            {date && (
              <span className="tc-chip tc-chip--date">
                <img src={calendarIcon} alt="" />
                {date}
              </span>
            )}
            <span className="tc-chip tc-chip--level">{difficulty}</span>
            {type && <span className="tc-chip">{type}</span>}
          </div>
          <button
            type="button"
            className="tc-heart"
            aria-pressed={liked}
            aria-label={liked ? `Unlike ${hike.title}` : `Like ${hike.title}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleLike(id)
            }}
          >
            <img src={liked ? heartFilled : heartOutline} alt="" />
          </button>
        </div>
        {hike.photos.length > 1 && (
          <div className="tc-dots">
            {hike.photos.map((src, i) => (
              <button
                type="button"
                key={src}
                className={i === index ? 'tc-dot tc-dot--active' : 'tc-dot'}
                aria-label={`Photo ${i + 1} of ${hike.photos.length}`}
                aria-current={i === index || undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  showPhoto(i)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="tc-body">
        <p className="tc-name">{hike.title}</p>
        <div className="tc-meta">
          <p className="tc-location">{hike.location}</p>
          <span className="tc-rating">
            <img src={starIcon} alt="" />
            {hike.rating}
          </span>
        </div>
        <div className="tc-stats">
          {hike.stats.map(([value, label]) => (
            <div className="tc-stat" key={label}>
              <p className="tc-stat__value">{value}</p>
              <p className="tc-stat__label">{label}</p>
            </div>
          ))}
        </div>
        {progress && (
          <div className="tc-prep">
            <div className="tc-prep__row">
              <p className="tc-prep__label">Prep status</p>
              <p className="tc-prep__text">{progress.text}</p>
            </div>
            <div className="tc-prep__bar">
              <span style={{ width: `${progress.pct}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

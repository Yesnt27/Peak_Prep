import { useState } from 'react'
import useGo from '../../app/useGo.js'
import { setLog, useHikerLog } from '../../app/hikerLog.js'
import HikeCard from '../../components/HikeCard.jsx'
import { HIKES } from '../../data/hikes.js'
import removeItem from '../../assets/icons/remove-item.svg'
import Screen from '../../components/Screen.jsx'
import { Field, Options, SmallIcon, Step as FlowStep } from '../../components/FlowStep.jsx'
import Button from '../../components/Button.jsx'
import { AddItem, BackButton, TagGroup, TypeField } from '../../components/controls.jsx'
import searchIcon from '../../assets/icons/search.png'
import easyIcon from '../../assets/hiker-log/easy.svg'
import mediumIcon from '../../assets/hiker-log/medium.svg'
import difficultIcon from '../../assets/hiker-log/difficult.svg'
import strenuousMask from '../../assets/hiker-log/strenuous-mask.png'
import './HikerLog.css'

function Step(props) {
  return <FlowStep label="Completed Hike" {...props} />
}

/* 1646:11007 */
export function Congrats() {
  const log = useHikerLog()
  return (
    <Step step={1} fill={52} back="/training" next="/log/details" ready={log.picked}>
      <div className="fs-body fs-body--congrats">
        <div className="fs-intro">
          <h1 className="fs-title">Congratulations!</h1>
          <p className="fs-sub">You just completed the following hike.</p>
        </div>
        <div className="hl-congrats__trail">
          <Field label="Search trails:">
            <div className="fs-search">
              <img src={searchIcon} alt="" />
              <TypeField defaultValue="Brunswick Mountain Trail" enterKeyHint="search" />
            </div>
          </Field>
          {/* Same card as Home; tap it to confirm this is the hike you completed (green ring). */}
          <HikeCard {...HIKES.brunswick} saved selected={log.picked} onClick={() => setLog({ picked: !log.picked })} />
        </div>
      </div>
    </Step>
  )
}

/* 1646:11107 */
export function LogDetails() {
  const log = useHikerLog()
  return (
    <Step step={2} fill={85} back="/log/congrats" next="/log/difficulty" ready={Boolean(log.date.trim() && log.time)}>
      <div className="fs-body">
        <h1 className="fs-title">Log details</h1>
        <Field label="Date of completed hike">
          <div className="fs-input">
            <TypeField
              placeholder="MM/DD/YYYY"
              inputMode="numeric"
              defaultValue={log.date}
              onChange={(e) => setLog({ date: e.target.value })}
            />
          </div>
        </Field>
        <Field label="Time to complete the hike">
          <TagGroup
            className="fs-tags fs-tiles"
            options={['1-4 hrs', '4-8 hrs', '8-12 hrs', '12+ hrs']}
            value={log.time}
            onChange={(time) => setLog({ time })}
          />
        </Field>
      </div>
    </Step>
  )
}

/* 1646:11133 */
const FEEL_ICONS = {
  Easy: <SmallIcon src={easyIcon} />,
  Medium: <SmallIcon src={mediumIcon} />,
  Difficult: <SmallIcon src={difficultIcon} />,
  Strenuous: (
    <SmallIcon mask={strenuousMask} maskStyle={{ marginLeft: 1, WebkitMaskPosition: '-0.5px 0', maskPosition: '-0.5px 0' }} />
  ),
}

export function Difficulty() {
  const log = useHikerLog()
  return (
    <Step step={3} fill={180} back="/log/details" next="/log/emergency" ready={Boolean(log.feel)}>
      <div className="fs-body">
        <h1 className="fs-title">How did it feel?</h1>
        <Options
          value={log.feel}
          onChange={(feel) => setLog({ feel })}
          options={Object.entries(FEEL_ICONS).map(([label, icon]) => ({ label, icon }))}
        />
      </div>
    </Step>
  )
}

/* 1646:11189 */
export function EmergencyPrep() {
  const log = useHikerLog()
  const [draft, setDraft] = useState(null) // text being typed, or null
  const commit = () => {
    const text = draft?.trim()
    if (text) setLog({ emergencies: [...log.emergencies, text] })
    setDraft(null)
  }
  return (
    <Step step={4} fill={256} back="/log/difficulty" next="/log/physical" ready={Boolean(log.prep)}>
      <div className="fs-body fs-body--center">
        <h1 className="fs-title fs-title--wrap">How prepared were you for emergencies? </h1>
        <Options
          value={log.prep}
          onChange={(prep) => setLog({ prep })}
          options={[
            { label: 'I felt unprepared' },
            { label: 'I was somewhat prepared' },
            { label: 'I was prepared for everything' },
            { label: 'There was no emergencies' },
          ]}
        />
      </div>
      <Field label="Add a specific emergency you experienced:">
        <div className="hl-list">
          {log.emergencies.map((text, i) => (
            <div className="hl-item" key={`${i}-${text}`}>
              <span>{text}</span>
              <button
                type="button"
                className="hl-item__remove"
                aria-label={`Remove ${text}`}
                onClick={() => setLog({ emergencies: log.emergencies.filter((_, j) => j !== i) })}
              >
                <img src={removeItem} alt="" />
              </button>
            </div>
          ))}
          {draft !== null && (
            <div className="hl-item hl-item--new">
              <input
                className="hl-item__input"
                autoFocus
                placeholder="e.g. Rolled my ankle on the descent"
                aria-label="Emergency you experienced"
                enterKeyHint="done"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur()
                  if (e.key === 'Escape') setDraft(null)
                }}
              />
            </div>
          )}
          <AddItem onClick={() => (draft === null ? setDraft('') : commit())}>Add Emergency</AddItem>
        </div>
      </Field>
    </Step>
  )
}

/* 1646:11151 — answers reworded to be plain and serious. */
const BODY = ['Extremely strenuous', 'Very challenging', 'Moderately challenging', 'Comfortable throughout']

export function PhysicalPrep() {
  const log = useHikerLog()
  return (
    <Step step={5} fill={298} back="/log/emergency" next="/log/notes" ready={Boolean(log.body)}>
      <div className="fs-body fs-body--center">
        <h1 className="fs-title fs-title--wrap">How did your body handle this hike?</h1>
        <Options value={log.body} onChange={(body) => setLog({ body })} options={BODY.map((label) => ({ label }))} />
      </div>
    </Step>
  )
}

/* 1646:11168 */
export function GeneralNotes() {
  const log = useHikerLog()
  return (
    <Step step={6} fill={350} back="/log/physical" next="/log/review" cta="Review" ready={Boolean(log.notes.trim())}>
      <div className="fs-intro">
        <h1 className="fs-title">General notes</h1>
        <p className="fs-sub">Any final thoughts?</p>
      </div>
      <div className="hl-notes">
        <TypeField
          multiline
          tone="notes"
          placeholder="Notes..."
          defaultValue={log.notes}
          onChange={(e) => setLog({ notes: e.target.value })}
        />
      </div>
    </Step>
  )
}

/** One answer on Review Details; unanswered steps say so. */
function Answer({ children }) {
  return children ? <div className="hl-answer">{children}</div> : <div className="hl-answer hl-answer--empty">Not answered</div>
}

/* 1646:11053 — shows what was entered in the steps. */
export function ReviewDetails() {
  const go = useGo()
  const log = useHikerLog()
  const sub = [log.date || 'No date', log.time].filter(Boolean).join(' · ')
  return (
    <Screen
      className="fs hl"
      fixed={
        // No destination in the prototype; the logged hike belongs in Completed hikes.
        <Button className="fs-cta" onClick={() => go('/profile/completed', 'smart')}>
          Done
        </Button>
      }
    >
      <div className="hl-review-page">
        <BackButton className="fs-back" onClick={() => go('/log/notes')} />
        <div className="fs-content hl-content--review">
          <div className="fs-intro">
            <h1 className="fs-title hl-review__title">Brunswick Mountain Trail</h1>
            <p className="fs-sub">{sub}</p>
          </div>
          <HikeCard {...HIKES.brunswick} saved />
          <Field label="How did it feel?">
            <Answer>
              {log.feel && (
                <>
                  {FEEL_ICONS[log.feel]}
                  <span>{log.feel}</span>
                </>
              )}
            </Answer>
          </Field>
          <Field label="How prepared were you for emergencies?">
            <Answer>{log.prep}</Answer>
          </Field>
          {log.emergencies.length > 0 && (
            <Field label="Emergencies you experienced">
              <div className="hl-list">
                {log.emergencies.map((text, i) => (
                  <div className="hl-item" key={`${i}-${text}`}>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Field>
          )}
          <Field label="How did your body handle this hike?">
            <Answer>{log.body}</Answer>
          </Field>
          <Field label="General notes">
            {log.notes.trim() ? (
              <div className="hl-answer-notes">
                <p>{log.notes}</p>
              </div>
            ) : (
              <Answer />
            )}
          </Field>
        </div>
      </div>
    </Screen>
  )
}

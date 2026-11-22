import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Dropdown from '../../components/Dropdown.jsx'
import { BackButton } from '../../components/controls.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import MeasureInput, { UnitDropdown, convertHeight, convertWeight, parseHeight, parseWeight } from '../../components/MeasureInput.jsx'
import { ActivityFields, FieldOptions, HealthFields, SafetyFields } from '../onboarding/Onboarding.jsx'
import '../onboarding/Onboarding.css'
import { updateAccount, useAccount } from '../../app/account.js'
import dashLine from '../../assets/profile/dash-line.svg'
import activityLegend from '../../assets/profile/activity-legend.svg'
import activityChart from '../../assets/profile/activity-chart.svg'
import maskHeart from '../../assets/profile/mask-heart.png'
import maskSleep from '../../assets/profile/mask-sleep.png'
import chevron from '../../assets/profile/chevron.svg'
import './Health.css'

// [label, mask, value parts [text, bold], dot position] from Figma "watah" tiles.
const TILES = [
  ['Heart Rate', maskHeart, [['83', true], [' bpm', false]], 'low'],
  ['Sleep', maskSleep, [['7', true], ['h ', false], ['43', true], ['m', false]], 'high'],
]

const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((g) => ({ id: g, label: g }))

/** A row whose value turns into a text field when tapped (pencil cue), saved on Enter or tapping away. */
function EditRow({ label, initial, inputMode, onSave }) {
  const [value, setValue] = useState(initial)
  const [editing, setEditing] = useState(false)
  const done = (v) => {
    const next = v.trim() || value
    setValue(next)
    onSave?.(next)
    setEditing(false)
  }
  return (
    <div className={editing ? 'hi-row hi-row--editing' : 'hi-row'}>
      <span>{label}</span>
      {editing ? (
        <input
          className="hi-row__input"
          autoFocus
          defaultValue={value}
          inputMode={inputMode}
          enterKeyHint="done"
          aria-label={label}
          onFocus={(e) => e.target.select()}
          onBlur={(e) => done(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
            if (e.key === 'Escape') setEditing(false)
          }}
        />
      ) : (
        <button
          type="button"
          className="hi-row__value"
          aria-label={`Edit ${label}: ${value}`}
          onClick={() => setEditing(true)}
        >
          {value ? <b>{value}</b> : <span className="hi-row__add">Add</span>}
        </button>
      )}
    </div>
  )
}

/** Figma "Health info" 1646:13208, laid out as the "Health info.png" reference: edit in place. */
// Sign-up "Sex" options → this dropdown's options.
const SEX_TO_GENDER = { Male: 'Male', Female: 'Female', Unspecified: 'Prefer not to say' }

/**
 * Weight / Height row (Round 21): tap the number to type it (units stay visible), and pick the
 * unit from the dropdown beside it, which converts the value (186 lbs → 84.4 kg).
 */
function MeasureRow({ label, kind, account }) {
  const key = kind
  const unitKey = `${kind}Unit`
  const value = account[key] ?? ''
  const unit = kind === 'weight' ? parseWeight(value, account[unitKey] ?? 'lbs').unit : parseHeight(value, account[unitKey] ?? 'ft').unit
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const shown = (() => {
    if (kind === 'weight') return parseWeight(value).n
    const h = parseHeight(value)
    return h.unit === 'cm' ? h.cm : h.ft ? `${h.ft} ft ${h.inch || 0}"` : ''
  })()
  const convert = kind === 'weight' ? convertWeight : convertHeight
  return (
    <div className={editing ? 'hi-row hi-row--editing' : 'hi-row'}>
      <span>{label}</span>
      <span className="hi-measure">
        {editing ? (
          <MeasureInput
            kind={kind}
            unit={unit}
            value={draft}
            autoFocus
            showUnit={false}
            onChange={setDraft}
            onBlur={() => {
              updateAccount({ [key]: draft })
              setEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
              if (e.key === 'Escape') setEditing(false)
            }}
          />
        ) : (
          <button
            type="button"
            className="hi-row__value"
            aria-label={`Edit ${label}`}
            onClick={() => {
              setDraft(value)
              setEditing(true)
            }}
          >
            {shown ? <b>{shown}</b> : <span className="hi-row__add">Add</span>}
          </button>
        )}
        <UnitDropdown kind={kind} unit={unit} onChange={(u) => updateAccount({ [unitKey]: u, [key]: convert(value, u) })} />
      </span>
    </div>
  )
}

/**
 * Activity & Health (Round 21): each row shows the sign-up answer; tapping it opens the same
 * sign-up field below the row to change it. These are only edited here (not in Settings).
 */
function SignUpRows({ account }) {
  const [open, setOpen] = useState(null)
  const contact = account.contact ?? {}
  const rows = [
    ['Daily steps', account.steps, <ActivityFields key="s" parts={['steps']} />],
    [
      'Weekly exercise',
      account.noExercise ? 'None' : (account.routine ?? []).map(([name, n]) => `${name} ${n}×`).join(', '),
      <ActivityFields key="r" parts={['routine']} />,
    ],
    ['Injuries', (account.injuries ?? []).join(', '), <HealthFields key="i" parts={['injuries']} />],
    ['Health conditions', (account.healthConditions ?? []).join(', '), <HealthFields key="c" parts={['conditions']} />],
    ['Emergency contact', [contact.name, contact.relationship].filter((v) => v?.trim()).join(', '), <SafetyFields key="e" />],
  ]
  return (
    <>
      <h2 className="hi-subtitle">Activity &amp; Health</h2>
      <div className="hi-rows">
        {rows.map(([label, value, editor]) => {
          const isOpen = open === label
          return (
            <div className={isOpen ? 'hi-edit hi-edit--open' : 'hi-edit'} key={label}>
              <button type="button" className="hi-row hi-row--info hi-row--button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : label)}>
                <span>{label}</span>
                <span className="hi-row__right">
                  {value ? <b className="hi-row__text">{value}</b> : <span className="hi-row__add">Add</span>}
                  <img className={isOpen ? 'hi-chevron dd-arrow dd-arrow--open' : 'hi-chevron dd-arrow'} src={chevron} alt="" />
                </span>
              </button>
              <div className="hi-edit__body">
                <div className="hi-edit__inner onb">
                  <FieldOptions value={{ labels: false, required: false }}>{isOpen && editor}</FieldOptions>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export function HealthInfo() {
  const go = useGo()
  const account = useAccount()
  const isNew = account.type === 'new'
  const [gender, setGenderState] = useState(SEX_TO_GENDER[account.sex] ?? account.sex ?? null)
  const setGender = (g) => {
    setGenderState(g)
    updateAccount({ sex: g === 'Prefer not to say' ? 'Unspecified' : g ?? '' })
  }
  return (
    <Screen className="hi">
      <div className="hi-content">
        <BackButton className="hi-back" onClick={() => go('/profile', 'smart')} />
        <div className="hi-body">
          <h1 className="hi-title">Health Information</h1>
          <h2 className="hi-subtitle">Basic Information</h2>
          <div className="hi-rows">
            <div className="hi-row">
              <span>Gender</span>
              <Dropdown options={GENDERS} value={gender} onChange={setGender} label="Gender" triggerClassName="hi-row__value">
                {(open) => (
                  <>
                    {gender ? <b>{gender}</b> : <span className="hi-row__add">Choose</span>}
                    <img className={open ? 'hi-chevron dd-arrow dd-arrow--open' : 'hi-chevron dd-arrow'} src={chevron} alt="" />
                  </>
                )}
              </Dropdown>
            </div>
            <EditRow label="Age" initial={account.age ?? ''} inputMode="numeric" onSave={(v) => updateAccount({ age: v })} />
            <MeasureRow label="Weight" kind="weight" account={account} />
            <MeasureRow label="Height" kind="height" account={account} />
          </div>

          <SignUpRows account={account} />

          {isNew ? (
            // New account: no tracked activity yet.
            <EmptyState title="No activity yet" text="Your steps and monthly activity will show here once you start training." />
          ) : (
            <>
          <div className="hi-card hi-steps">
            <div className="hi-steps__head">
              <p className="hi-muted-light">TOTAL</p>
              <p className="hi-steps__total">
                <span>2,648</span>
                <span className="hi-muted">steps</span>
              </p>
              <p className="hi-muted">Today</p>
            </div>
            <div className="hi-steps__chart">
              {[20, 56, 92].map((top) => (
                <img key={top} className="hi-steps__line" style={{ top: top - 1 }} src={dashLine} alt="" />
              ))}
              <div className="hi-steps__bars">
                <span style={{ height: 34 }} />
                <span style={{ height: 34 }} />
                <span className="hi-steps__bar--peak" style={{ height: 92 }} />
              </div>
              <span className="hi-steps__y" style={{ top: 81 }}>0</span>
              <span className="hi-steps__y" style={{ top: 46 }}>5000</span>
              <span className="hi-steps__y" style={{ top: 11 }}>20,000</span>
              <div className="hi-steps__x">
                <span>12AM</span>
                <span>6</span>
                <span>12</span>
                <span className="hi-steps__x-last">6</span>
              </div>
            </div>
          </div>

          <div className="hi-card hi-month">
            <div className="hi-month__head">
              <p className="hi-month__title">Monthly Activity</p>
              <p className="hi-muted">You are very active this month</p>
            </div>
            <div className="hi-month__chart">
              <img className="hi-month__legend" src={activityLegend} alt="" />
              <img className="hi-month__line" src={activityChart} alt="" />
              <div className="hi-month__x">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>
          </div>

            </>
          )}

          <div className="hi-grid">
            {TILES.map(([label, mask, parts, dot]) => (
              <div className="hi-tile" key={label}>
                <div className="hi-tile__text">
                  <p className="hi-tile__label">
                    <span className="hi-tile__icon" style={{ WebkitMaskImage: `url(${mask})`, maskImage: `url(${mask})` }} />
                    {label}
                  </p>
                  <p className="hi-tile__value">
                    {(isNew ? [['--', true]] : parts).map(([text, bold], i) => (
                      <span key={i} className={bold ? 'hi-tile__bold' : undefined}>
                        {text}
                      </span>
                    ))}
                  </p>
                </div>
                <span className={`hi-meter hi-meter--${dot}`}>
                  <span className="hi-meter__bar" />
                  <span className="hi-meter__dot" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

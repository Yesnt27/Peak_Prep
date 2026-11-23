import { createContext, useContext, useState } from 'react'
import useGo from '../../app/useGo.js'
import { getAccount, updateAccount, useAccount } from '../../app/account.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import {
  AddItem,
  BackButton,
  CheckRow,
  FieldCard,
  TagGroup,
  ToggleSwitch,
  ToggleTag,
  WorkoutCard,
 TypeField } from '../../components/controls.jsx'
import ProfileCard from '../../components/ProfileCard.jsx'
import searchIcon from '../../assets/icons/search.svg'
import { HIKES } from '../../data/hikes.js'
import Stepper, { SignButton } from '../../components/Stepper.jsx'
import snow from '../../assets/conditions/snow.png'
import rain from '../../assets/conditions/rain.png'
import heat from '../../assets/conditions/heat.png'
import thunderstorm from '../../assets/conditions/thunderstorm.png'
import wind from '../../assets/conditions/wind.png'
import fog from '../../assets/conditions/fog.png'
import bear from '../../assets/conditions/bear.png'
import weightlifting from '../../assets/workouts/weightlifting.png'
import swimming from '../../assets/workouts/swimming.png'
import cycling from '../../assets/workouts/cycling.png'
import running from '../../assets/workouts/running.png'
import boxing from '../../assets/workouts/boxing.png'
import yoga from '../../assets/workouts/yoga.png'
import bouldering from '../../assets/workouts/bouldering.png'
import pilates from '../../assets/workouts/pilates.png'
import basketball from '../../assets/workouts/basketball.png'
import tennis from '../../assets/workouts/tennis.png'
import './Onboarding.css'

/**
 * Shared frame for step-by-step flows (onboarding, hiker log): back button,
 * step label + progress bar, title, green button at the end of the page (Round 25). `back`/`next` are
 * routes; leave one out when Figma has no connection for it.
 */
export function Step({
  step,
  label = `Onboarding - STEP ${step} OF 5`,
  fill,
  fillColor = 'var(--main-green)',
  title,
  back,
  next,
  nextTransition,
  cta = 'Continue',
  ready = true,
  skip = false,
  tight = false,
  bodyGap,
  overlay,
  children,
}) {
  const go = useGo()
  return (
    <Screen className="onb" fixed={overlay}>
      <BackButton className="onb__back" onClick={back ? () => go(back) : undefined} />
      <div className={tight ? 'onb__content onb__content--tight' : 'onb__content'}>
        <div className="onb__progress">
          <p className="onb__step">{label}</p>
          <div className="onb__track">
            <div className="onb__fill" style={{ width: fill, background: fillColor }} />
          </div>
        </div>
        <div className="onb__body" style={bodyGap ? { gap: bodyGap } : undefined}>
          {title}
          {children}
        </div>
        {/* Round 25: not pinned. At the screen bottom on short steps, after the content on long ones. */}
        <Button className="onb__cta" disabled={!ready} onClick={next ? () => go(next, nextTransition) : undefined}>
          {skip ? SKIP_LABEL : cta}
        </Button>
      </div>
    </Screen>
  )
}

// Round 18: optional steps say this while nothing is entered, so nobody feels they must fill everything in now.
const SKIP_LABEL = 'Skip for now'

/** `required` = an asterisk before the title; that step's button stays grey until it is filled. */
/**
 * Round 21: where the shared field groups are reused, `FieldOptions` can hide the labels
 * (Health Information rows already name them) and the required asterisks (Manage Profile).
 */
const FieldOptionsContext = createContext({ labels: true, required: true })
export const FieldOptions = FieldOptionsContext.Provider

function Field({ label, required: isRequired = false, children }) {
  const options = useContext(FieldOptionsContext)
  const required = isRequired && options.required
  if (!options.labels) return <div className="onb__field">{children}</div>
  return (
    <div className="onb__field">
      <p className="onb__label">
        {required && (
          <span className="onb__req" aria-hidden="true">
            *{' '}
          </span>
        )}
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </p>
      {children}
    </div>
  )
}



export function OnboardingWelcome() {
  const account = useAccount()
  return (
    <Step
      step={1}
      fill={52}
      back="/welcome"
      next="/onboarding/experience"
      ready={Boolean(account.name?.trim())}
      title={
        <div className="onb__intro">
          <h1 className="onb__title">Welcome</h1>
          <p className="onb__lead">
            Let’s get to know you.
            <br />
            This helps us tailor trails to you.
          </p>
        </div>
      }
    >
      <div className="onb__fields">
        <Field label="Name:" required>
          <div className="onb__input">
            <TypeField
              tone="light"
              placeholder="John Smith"
              autoComplete="name"
              defaultValue={account.name}
              onChange={(e) => updateAccount({ name: e.target.value })}
            />
          </div>
        </Field>
        <Field label="Hiker profile:">
          <ProfileCard />
        </Field>
      </div>
    </Step>
  )
}

const NONE = 'None of these'

const CONDITIONS = [
  ['Snow', snow],
  ['Rain', rain],
  ['Heat', heat],
  ['Thunderstorm', thunderstorm],
  ['Wind', wind],
  ['Fog', fog],
  ['Bear Country', bear],
]

export function ExperienceFields() {
  const account = useAccount()
  // Conditions are multi-select; "None of these" clears them, and picking a condition clears "None of these".
  const conditions = account.hikedIn ?? []
  const setConditions = (list) => updateAccount({ hikedIn: list })
  const toggleCondition = (name) =>
    setConditions(conditions.includes(name) ? conditions.filter((c) => c !== name) : [...conditions.filter((c) => c !== NONE), name])
  const toughest = account.toughest ?? {}
  const [sheet, setSheet] = useState(false)
  return (
    <>
      {/* Not in Figma: added so a new account's profile can show years of experience + level. */}
      <Field label="Years hiking:" required>
        {/* Round 22: − / + like the app's other steppers (grey 0 until the first tap). */}
        <Stepper value={account.years} min={0} max={70} label="years hiking" onChange={(v) => updateAccount({ years: String(v) })} />
      </Field>
      <Field label="How often do you hike?">
        <TagGroup
          className="onb__tags"
          options={['Never', 'A few times a year', 'Monthly', 'Weekly']}
          value={account.frequency || null}
          onChange={(v) => updateAccount({ frequency: v ?? '' })}
        />
      </Field>
      <Field label="Toughest hike:">
        {/* Round 18: search for the hike (bottom sheet); or fill in the rows below. */}
        {toughest.hike ? (
          <div className="onb__chosen onb__chosen--hike onb__chosen--removable">
            <SignButton
              sign="minus"
              label={`Remove ${HIKES[toughest.hike].title}`}
              onClick={() => updateAccount({ toughest: { ...toughest, hike: null } })}
            />
            <button type="button" className="onb__chosen-name onb__hike-pick" onClick={() => setSheet(true)}>
              <img className="onb__hike-thumb" src={HIKES[toughest.hike].image} alt="" />
              <span>{HIKES[toughest.hike].title}</span>
            </button>
          </div>
        ) : (
          <button type="button" className="onb__search" onClick={() => setSheet(true)}>
            <img src={searchIcon} alt="" />
            <span>Search for your toughest hike</span>
          </button>
        )}
        <FieldCard
          values={{ Distance: toughest.distance, 'Elevation gain': toughest.elevation, Time: toughest.time }}
          onChange={(label, v) => updateAccount({ toughest: { ...toughest, [TOUGHEST_KEYS[label]]: v } })}
          rows={[
            { label: 'Distance', options: ['<5km', '5-10km', '10-20km', '>20km'] },
            { label: 'Elevation gain', options: ['<300m', '300-800m', '800-1500m', '>1,500m'] },
            { label: 'Time', options: ['<4hr', '4-8hr', 'Full day', 'Multi-day'] },
          ]}
        />
      </Field>
      <Field label="Conditions you’ve hiked in:">
        <div className="onb__conditions">
          {CONDITIONS.map(([name, icon]) => (
            <ToggleTag key={name} icon={icon} selected={conditions.includes(name)} onChange={() => toggleCondition(name)}>
              {name}
            </ToggleTag>
          ))}
          <ToggleTag
            selected={conditions.includes(NONE)}
            onChange={() => setConditions(conditions.includes(NONE) ? [] : [NONE])}
          >
            {NONE}
          </ToggleTag>
        </div>
      </Field>
        <ToughestHikeSheet
          open={sheet}
          picked={toughest.hike}
          onClose={() => setSheet(false)}
          onDone={(key) => {
            // Picking a hike fills in its distance, elevation and time.
            updateAccount({ toughest: key ? { hike: key, ...bucketsFor(HIKES[key]) } : { ...toughest, hike: null } })
            setSheet(false)
          }}
        />
    </>
  )
}

const TOUGHEST_KEYS = { Distance: 'distance', 'Elevation gain': 'elevation', Time: 'time' }

/** A hike's stats → the Toughest hike rows' options. */
function bucketsFor(hike) {
  const km = parseFloat(hike.stats[0][0].replace(/,/g, ''))
  const m = parseFloat(hike.stats[1][0].replace(/,/g, ''))
  const [time, unit] = hike.stats[2]
  const hours = Math.max(...time.split(/[–-]/).map(parseFloat))
  return {
    distance: km < 5 ? '<5km' : km <= 10 ? '5-10km' : km <= 20 ? '10-20km' : '>20km',
    elevation: m < 300 ? '<300m' : m <= 800 ? '300-800m' : m <= 1500 ? '800-1500m' : '>1,500m',
    time: unit.startsWith('DAY') ? 'Multi-day' : hours < 4 ? '<4hr' : hours <= 8 ? '4-8hr' : 'Full day',
  }
}

/** "Toughest hike" search: the Explore hikes in a bottom sheet, like Invite Friends. One can be picked. */
function ToughestHikeSheet({ open, picked, onClose, onDone }) {
  const [query, setQuery] = useState('')
  const [choice, setChoice] = useState(picked ?? null)
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    // Each time it opens: start from what is saved, with an empty search.
    setWasOpen(open)
    if (open) {
      setChoice(picked ?? null)
      setQuery('')
    }
  }
  const q = query.trim().toLowerCase()
  const hikes = Object.entries(HIKES).filter(([, h]) => !q || `${h.title} ${h.location}`.toLowerCase().includes(q))
  return (
    <BottomSheet
      open={open}
      title="Toughest Hike"
      searchPlaceholder="Search hikes"
      onSearch={setQuery}
      onClose={onClose}
      onDone={() => onDone(choice)}
    >
      <div className="sheet__list">
        {hikes.length === 0 && <p className="onb__sheet-empty">No hikes found.</p>}
        {hikes.map(([key, h]) => (
          <button
            type="button"
            key={key}
            className={choice === key ? 'onb-hike onb-hike--selected' : 'onb-hike'}
            aria-pressed={choice === key}
            onClick={() => setChoice(choice === key ? null : key)}
          >
            <img className="onb-hike__img" src={h.image} alt="" />
            <span className="onb-hike__text">
              <span className="onb-hike__title">{h.title}</span>
              <span className="onb-hike__sub">{h.location}</span>
              <span className="onb-hike__sub">
                {h.stats[0][0]} km · {h.stats[1][0]} m · {h.stats[2][0]} {h.stats[2][1].toLowerCase()}
              </span>
            </span>
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}

const WORKOUTS = [
  ['Weightlifting', weightlifting],
  ['Swimming', swimming],
  ['Cycling', cycling],
  ['Running', running],
  ['Boxing', boxing],
  ['Yoga', yoga],
  ['Bouldering', bouldering],
  ['Pilates', pilates],
  ['Basketball', basketball],
  ['Tennis', tennis],
]

/** `parts`: which questions to show (Health Information shows one per row). */
export function ActivityFields({ parts = ['steps', 'routine'] }) {
  const account = useAccount()
  const [sheet, setSheet] = useState(false)
  const routine = account.routine ?? [] // [[name, times per week], ...]
  // "None" (Round 19) answers the required question for people who don't work out; adding a workout clears it.
  const none = Boolean(account.noExercise)
  const setRoutine = (r) => updateAccount({ routine: r, ...(r.length ? { noExercise: false } : {}) })
  const [picked, setPicked] = useState([]) // names ticked in the open sheet
  const open = () => {
    setPicked(routine.map(([name]) => name))
    setSheet(true)
  }
  const done = () => {
    // Keep counts for workouts already in the routine; new ones start at 1.
    setRoutine(picked.map((name) => routine.find(([n]) => n === name) ?? [name, 1]))
    setSheet(false)
  }
  const setCount = (name, count) => setRoutine(routine.map((r) => (r[0] === name ? [name, count] : r)))
  return (
    <>
      {parts.includes('steps') && (
      <Field label="Your daily steps:" required>
        <TagGroup
          className="onb__tags"
          options={['< 3,000 steps', '3,000 to 7,000 steps', '7-10,000 steps', '>10,000 steps']}
          value={account.steps || null}
          onChange={(v) => updateAccount({ steps: v ?? '' })}
        />
      </Field>
      )}
      {parts.includes('routine') && (
      <Field label="Weekly exercise routine:" required>
        {routine.map(([name, count]) => (
          <div className="onb__chosen" key={name}>
            <div className="onb__chosen-name">
              <img className="onb__chosen-icon" src={WORKOUTS.find(([n]) => n === name)[1]} alt="" />
              <span>{name}</span>
            </div>
            {/* Times per week: 1–7. */}
            <Stepper value={count} min={1} max={7} label={`${name} sessions per week`} onChange={(c) => setCount(name, c)} />
          </div>
        ))}
        <AddItem onClick={open}>Add Workout</AddItem>
        <ToggleTag selected={none} onChange={() => updateAccount({ noExercise: !none, ...(!none ? { routine: [] } : {}) })}>
          None
        </ToggleTag>
      </Field>
      )}
        <BottomSheet open={sheet} title="Add Workouts" onClose={() => setSheet(false)} onDone={done}>
          <div className="sheet__grid">
            {WORKOUTS.map(([name, icon]) => (
              <WorkoutCard
                key={name}
                icon={icon}
                selected={picked.includes(name)}
                onChange={() => setPicked(picked.includes(name) ? picked.filter((n) => n !== name) : [...picked, name])}
              >
                {name}
              </WorkoutCard>
            ))}
          </div>
        </BottomSheet>
    </>
  )
}

const INJURIES = [
  'Ankle Sprain',
  'Blisters',
  'Knee Injury',
  'Muscle Strain',
  'Wrist Sprain',
  'Hip Pain',
  'Shoulder Injury',
  'Lower Back Pain',
  'Stress Fracture',
]

export const HEALTH_CONDITIONS = [
  'Heart Conditions',
  'Pregnancy',
  'Low Blood Pressure',
  'High Blood Pressure',
  'Anemia',
  'Chronic Fatigue',
  'Pollen Allergy',
  'Grass Allergy',
  'Diabetes',
]

/** Bottom sheet with a list of selectable rows (injuries, health conditions). */
export function ListSheet({ open, title, items, onClose, picked, onPick, onDone }) {
  return (
    <BottomSheet open={open} title={title} onClose={onClose} onDone={onDone}>
      <div className="sheet__list">
        {items.map((item) => (
          <CheckRow
            key={item}
            {...(picked ? { selected: picked.includes(item), onChange: () => onPick(item) } : {})}
          >
            {item}
          </CheckRow>
        ))}
      </div>
    </BottomSheet>
  )
}

/** A list picked in a sheet: nothing chosen at first; ticks only count once Done is pressed. */
function usePickList(field) {
  const chosen = useAccount()[field] ?? []
  const setChosen = (list) => updateAccount({ [field]: list })
  const [picked, setPicked] = useState([])
  return {
    chosen,
    picked,
    start: () => setPicked(chosen),
    toggle: (item) => setPicked(picked.includes(item) ? picked.filter((i) => i !== item) : [...picked, item]),
    commit: () => setChosen(picked),
    remove: (item) => setChosen(chosen.filter((i) => i !== item)),
  }
}

/** Chosen items (Round 23): white rows with the app's "−" on the left, like Packing → Edit. */
function Chosen({ items, onRemove }) {
  return items.map((item) => (
    <div className="onb__chosen onb__chosen--removable" key={item}>
      <SignButton sign="minus" label={`Remove ${item}`} onClick={() => onRemove(item)} />
      <span className="onb__chosen-label">{item}</span>
    </div>
  ))
}

export function HealthFields({ parts = ['injuries', 'conditions'] }) {
  const [sheet, setSheet] = useState(null)
  const injuries = usePickList('injuries')
  const conditions = usePickList('healthConditions')
  const close = () => setSheet(null)
  return (
    <>
      {parts.includes('injuries') && (
      <Field label="Injuries to plan around:">
        <Chosen items={injuries.chosen} onRemove={injuries.remove} />
        <AddItem
          onClick={() => {
            injuries.start()
            setSheet('injury')
          }}
        >
          Add Injury
        </AddItem>
      </Field>
      )}
      {parts.includes('conditions') && (
      <Field label="Health Conditions:">
        <Chosen items={conditions.chosen} onRemove={conditions.remove} />
        <AddItem
          onClick={() => {
            conditions.start()
            setSheet('health')
          }}
        >
          Add Health Conditions
        </AddItem>
      </Field>
      )}
        <>
          <ListSheet
            open={sheet === 'injury'}
            title="Add Injuries"
            items={INJURIES}
            picked={injuries.picked}
            onPick={injuries.toggle}
            onClose={close}
            onDone={() => {
              injuries.commit()
              close()
            }}
          />
          <ListSheet
            open={sheet === 'health'}
            title="Add Health Conditions"
            items={HEALTH_CONDITIONS}
            picked={conditions.picked}
            onPick={conditions.toggle}
            onClose={close}
            onDone={() => {
              conditions.commit()
              close()
            }}
          />
        </>
    </>
  )
}

// Round 18: example contact is grey placeholder text ("Jane Doe"), saved to the account once typed.
const CONTACT = [
  ['NAME', 'name', 'Jane Doe', undefined],
  ['PHONE NUMBER', 'phone', '+1', 'tel'],
  ['RELATIONSHIP', 'relationship', 'Friend', undefined],
]

export function SafetyFields() {
  const account = useAccount()
  const contact = account.contact ?? {}
  return (
    <>
      <Field label="Emergency Contact:">
        {CONTACT.map(([label, key, placeholder, inputMode]) => (
          <div className="onb__contact" key={label}>
            <p className="onb__contact-label">{label}</p>
            <TypeField
              tone="light"
              className="onb__contact-value"
              placeholder={placeholder}
              defaultValue={contact[key]}
              inputMode={inputMode}
              aria-label={label}
              onChange={(e) => updateAccount({ contact: { ...(getAccount().contact ?? {}), [key]: e.target.value } })}
            />
          </div>
        ))}
        <AddItem>Add Emergency Contact</AddItem>
        <div className="onb__share">
          <span>Share my trip plan with them</span>
          <ToggleSwitch label="Share my trip plan with them" on={Boolean(account.shareTrip)} onChange={(on) => updateAccount({ shareTrip: on })} />
        </div>
      </Field>
    </>
  )
}

/* ---------- Sign-up steps (Round 20: fields live in *Fields components, shared with Settings → Manage Profile) ---------- */

const has = (list) => (list ?? []).length > 0

export function OnboardingExperience() {
  const account = useAccount()
  return (
    <Step
      step={2}
      fill={91}
      fillColor="#80ac3c"
      back="/onboarding/welcome"
      next="/onboarding/activity"
      ready={Boolean(String(account.years ?? '').trim())}
      title={<h1 className="onb__title">Hiking Experience</h1>}
    >
      <ExperienceFields />
    </Step>
  )
}

export function OnboardingActivity() {
  const account = useAccount()
  return (
    <Step
      step={3}
      fill={175}
      fillColor="#80ac3c"
      tight
      back="/onboarding/experience"
      next="/onboarding/health"
      ready={Boolean(account.steps) && (has(account.routine) || Boolean(account.noExercise))}
      title={<h1 className="onb__title">Current Activity</h1>}
    >
      <ActivityFields />
    </Step>
  )
}

export function OnboardingHealth() {
  const account = useAccount()
  return (
    <Step
      step={4}
      fill={267}
      back="/onboarding/activity"
      next="/onboarding/safety"
      skip={!has(account.injuries) && !has(account.healthConditions)}
      title={<h1 className="onb__title">Body &amp; Health</h1>}
    >
      <HealthFields />
    </Step>
  )
}

export function OnboardingSafety() {
  const contact = useAccount().contact ?? {}
  return (
    <Step
      step={5}
      fill={344}
      back="/onboarding/health"
      next="/home/training"
      cta="Done"
      skip={!CONTACT.some(([, key]) => contact[key]?.trim())}
      title={<h1 className="onb__title">Safety Setup</h1>}
    >
      <SafetyFields />
    </Step>
  )
}

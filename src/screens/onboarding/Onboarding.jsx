import { useState } from 'react'
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
import pencil from '../../assets/icons/pencil.png'
import stepperMinus from '../../assets/icons/stepper-minus.svg'
import stepperPlus from '../../assets/icons/stepper-plus.svg'
import removeItem from '../../assets/icons/remove-item.svg'
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
 * step label + progress bar, title, pinned green button. `back`/`next` are
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
  tight = false,
  bodyGap,
  overlay,
  children,
}) {
  const go = useGo()
  return (
    <Screen
      className="onb"
      fixed={
        <>
          <Button className="onb__cta" onClick={next ? () => go(next, nextTransition) : undefined}>
            {cta}
          </Button>
          {overlay}
        </>
      }
    >
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
      </div>
    </Screen>
  )
}

function Field({ label, children }) {
  return (
    <div className="onb__field">
      <p className="onb__label">{label}</p>
      {children}
    </div>
  )
}

// FieldCard row label → account field.
const PROFILE_FIELDS = { Age: 'age', Weight: 'weight', Height: 'height', Sex: 'sex' }

export function OnboardingWelcome() {
  const account = getAccount()
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.entries(PROFILE_FIELDS).map(([label, key]) => [label, account[key] || undefined])),
  )
  return (
    <Step
      step={1}
      fill={52}
      back="/welcome"
      next="/onboarding/experience"
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
        <Field label="Name:">
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
          <FieldCard
            values={values}
            onChange={(label, value) => {
              setValues({ ...values, [label]: value })
              updateAccount({ [PROFILE_FIELDS[label]]: value ?? '' })
            }}
            rows={[
              { label: 'Age', icon: pencil, inputMode: 'numeric' },
              { label: 'Weight', icon: pencil },
              { label: 'Height', icon: pencil },
              { label: 'Sex', options: ['Male', 'Female', 'Unspecified'], compact: true },
            ]}
          />
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

export function OnboardingExperience() {
  const account = useAccount()
  const isNew = account.type === 'new'
  // Conditions are multi-select; "None of these" clears them, and picking a condition clears "None of these".
  const [conditions, setConditions] = useState([])
  const toggleCondition = (name) =>
    setConditions(conditions.includes(name) ? conditions.filter((c) => c !== name) : [...conditions.filter((c) => c !== NONE), name])
  return (
    <Step
      step={2}
      fill={91}
      fillColor="#80ac3c"
      back="/onboarding/welcome"
      next="/onboarding/activity"
      title={<h1 className="onb__title">Hiking Experience</h1>}
    >
      {/* Not in Figma: added so a new account's profile can show years of experience + level. */}
      <Field label="Years hiking:">
        <div className="onb__input">
          <TypeField
            tone="light"
            placeholder="e.g. 2"
            inputMode="decimal"
            defaultValue={account.years}
            onChange={(e) => updateAccount({ years: e.target.value.trim() })}
          />
        </div>
      </Field>
      <Field label="How often you hike:">
        <TagGroup
          className="onb__tags"
          options={['Never', 'A few times a year', 'Monthly', 'Weekly']}
          {...(isNew ? { value: account.frequency || null, onChange: (v) => updateAccount({ frequency: v ?? '' }) } : {})}
        />
      </Field>
      <Field label="Toughest hike:">
        <FieldCard
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
    </Step>
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

export function OnboardingActivity() {
  const [sheet, setSheet] = useState(false)
  const [routine, setRoutine] = useState([]) // [[name, times per week], ...]
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
    <Step
      step={3}
      fill={175}
      fillColor="#80ac3c"
      tight
      back="/onboarding/experience"
      next="/onboarding/health"
      title={<h1 className="onb__title">Current Activity</h1>}
      overlay={
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
      }
    >
      <Field label="Your daily steps:">
        <TagGroup
          className="onb__tags"
          options={['< 3,000 steps', '3,000 to 7,000 steps', '7-10,000 steps', '>10,000 steps']}
        />
      </Field>
      <Field label="Weekly Exercise routine:">
        {routine.map(([name, count]) => (
          <div className="onb__chosen" key={name}>
            <div className="onb__chosen-name">
              <img className="onb__chosen-icon" src={WORKOUTS.find(([n]) => n === name)[1]} alt="" />
              <span>{name}</span>
            </div>
            {/* Times per week: 1–7. */}
            <div className="onb__stepper">
              <button
                type="button"
                className="onb__stepper-btn"
                aria-label={`Fewer ${name} sessions`}
                disabled={count <= 1}
                onClick={() => setCount(name, count - 1)}
              >
                <img src={stepperMinus} alt="" />
              </button>
              <span aria-live="polite">{count}</span>
              <button
                type="button"
                className="onb__stepper-btn"
                aria-label={`More ${name} sessions`}
                disabled={count >= 7}
                onClick={() => setCount(name, count + 1)}
              >
                <img src={stepperPlus} alt="" />
              </button>
            </div>
          </div>
        ))}
        <AddItem onClick={open}>Add Workout</AddItem>
      </Field>
    </Step>
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
  'Lowe Back Pain',
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
function usePickList() {
  const [chosen, setChosen] = useState([])
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

function Chosen({ items, onRemove }) {
  return items.map((item) => (
    <div className="onb__chosen" key={item}>
      <span>{item}</span>
      <button type="button" className="onb__remove-btn" aria-label={`Remove ${item}`} onClick={() => onRemove(item)}>
        <img className="onb__remove" src={removeItem} alt="" />
      </button>
    </div>
  ))
}

export function OnboardingHealth() {
  const [sheet, setSheet] = useState(null)
  const injuries = usePickList()
  const conditions = usePickList()
  const close = () => setSheet(null)
  return (
    <Step
      step={4}
      fill={267}
      back="/onboarding/activity"
      next="/onboarding/safety"
      title={<h1 className="onb__title">Body &amp; Health</h1>}
      overlay={
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
      }
    >
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
    </Step>
  )
}

export function OnboardingSafety() {
  return (
    <Step
      step={5}
      fill={344}
      back="/onboarding/health"
      next="/home/saved"
      cta="Done"
      title={<h1 className="onb__title">Safety Setup</h1>}
    >
      <Field label="Emergency Contact:">
        {[
          ['NAME', 'Sarah Lee'],
          ['PHONE NUMBER', '+1'],
          ['RELATIONSHIP', 'Friend'],
        ].map(([label, value]) => (
          <div className="onb__contact" key={label}>
            <p className="onb__contact-label">{label}</p>
            <TypeField
              tone="light"
              className="onb__contact-value"
              defaultValue={value}
              inputMode={label === 'PHONE NUMBER' ? 'tel' : undefined}
              aria-label={label}
            />
          </div>
        ))}
        <AddItem>Add Emergency Contact</AddItem>
        <div className="onb__share">
          <span>Share my trip plan with them</span>
          <ToggleSwitch label="Share my trip plan with them" />
        </div>
      </Field>
    </Step>
  )
}

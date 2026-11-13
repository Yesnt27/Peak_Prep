import { useState } from 'react'
import useGo from '../../app/useGo.js'
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

export function OnboardingWelcome() {
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
            <TypeField tone="light" placeholder="John Smith" autoComplete="name" />
          </div>
        </Field>
        <Field label="Hiker profile:">
          <FieldCard
            rows={[
              { label: 'Age', icon: pencil },
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
  return (
    <Step
      step={2}
      fill={91}
      fillColor="#80ac3c"
      back="/onboarding/welcome"
      next="/onboarding/activity"
      title={<h1 className="onb__title">Hiking Experience</h1>}
    >
      <Field label="How often you hike:">
        <TagGroup className="onb__tags" options={['Never', 'A few times a year', 'Monthly', 'Weekly']} />
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
            <ToggleTag key={name} icon={icon}>
              {name}
            </ToggleTag>
          ))}
          <ToggleTag>None of these</ToggleTag>
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
        <BottomSheet open={sheet} title="Workouts" onClose={() => setSheet(false)}>
          <div className="sheet__grid">
            {WORKOUTS.map(([name, icon]) => (
              <WorkoutCard key={name} icon={icon}>
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
        <div className="onb__chosen">
          <div className="onb__chosen-name">
            <img className="onb__chosen-icon" src={weightlifting} alt="" />
            <span>Weight Lifting</span>
          </div>
          <div className="onb__stepper">
            <img src={stepperMinus} alt="" />
            <span>2</span>
            <img src={stepperPlus} alt="" />
          </div>
        </div>
        <AddItem onClick={() => setSheet(true)}>Add Workout</AddItem>
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
export function ListSheet({ open, title, items, onClose }) {
  return (
    <BottomSheet open={open} title={title} onClose={onClose}>
      <div className="sheet__list">
        {items.map((item) => (
          <CheckRow key={item}>{item}</CheckRow>
        ))}
      </div>
    </BottomSheet>
  )
}

export function OnboardingHealth() {
  const [sheet, setSheet] = useState(null)
  return (
    <Step
      step={4}
      fill={267}
      back="/onboarding/activity"
      next="/onboarding/safety"
      title={<h1 className="onb__title">Body &amp; Health</h1>}
      overlay={
        <>
          <ListSheet open={sheet === 'injury'} title="Injuries" items={INJURIES} onClose={() => setSheet(null)} />
          <ListSheet
            open={sheet === 'health'}
            title="Health Conditions"
            items={HEALTH_CONDITIONS}
            onClose={() => setSheet(null)}
          />
        </>
      }
    >
      <Field label="Injuries to plan around:">
        <div className="onb__chosen">
          <span>Knee Injury</span>
          <img className="onb__remove" src={removeItem} alt="" />
        </div>
        <AddItem onClick={() => setSheet('injury')}>Add Injury</AddItem>
      </Field>
      <Field label="Health Conditions:">
        <AddItem onClick={() => setSheet('health')}>Add Health Conditions</AddItem>
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
            <TypeField tone="light" className="onb__contact-value" placeholder={value} inputMode={label === 'PHONE NUMBER' ? 'tel' : undefined} />
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

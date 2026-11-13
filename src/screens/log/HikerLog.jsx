import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { AddItem, BackButton, OptionGroup, TagGroup } from '../../components/controls.jsx'
import { Step } from '../onboarding/Onboarding.jsx'
import searchIcon from '../../assets/icons/search.png'
import trailPhoto from '../../assets/log/black-tusk-view.png'
import cardBase from '../../assets/log/card-base.svg'
import selectedCheck from '../../assets/log/selected-check.svg'
import completedCheck from '../../assets/log/completed-check.svg'
import easyIcon from '../../assets/log/easy.svg'
import mediumIcon from '../../assets/log/medium.svg'
import difficultIcon from '../../assets/log/difficult.svg'
import nightIcon from '../../assets/log/night.png'
import './HikerLog.css'

const LABEL = (n) => `Completed Hike - STEP ${n} OF 6`

function Field({ label, children }) {
  return (
    <div className="onb__field">
      <p className="onb__label">{label}</p>
      {children}
    </div>
  )
}

/** The Black Tusk trail card used on Congrats (selected) and Review (completed). */
function TrailCard({ variant }) {
  const review = variant === 'review'
  return (
    <div className="log-card">
      <img className="log-card__photo" src={trailPhoto} alt="" />
      {!review && <div className="log-card__fade" />}
      <img className="log-card__base" src={cardBase} alt="" />
      <p className={review ? 'log-card__name log-card__name--black' : 'log-card__name'}>The Black Tusk</p>
      <p className="log-card__loc">{review ? 'Garibaldi Provincial Park, BC' : 'Garibaldi Provincial Park, B'}</p>
      <p className="log-card__meta">Hard · 26.4 km · Elev. 1763 m · Est. 7-9 hours</p>
      {review ? (
        <>
          <div className="log-card__bars">
            <span style={{ left: 144.91, width: 8.357 }} />
            <span style={{ left: 154.94, width: 8.357 }} />
            <span className="log-card__bar--current" style={{ left: 164.96, width: 20.057 }} />
            <span style={{ left: 186.69, width: 8.357 }} />
            <span style={{ left: 196.72, width: 6.686 }} />
            <span style={{ left: 205.08, width: 5.014 }} />
          </div>
          <span className="log-card__completed">
            <img src={completedCheck} alt="" />
            <span>Completed</span>
          </span>
        </>
      ) : (
        <>
          <div className="log-card__dots">
            <span />
            <span />
            <span className="log-card__dot--current" />
            <span />
            <span />
            <span />
          </div>
          <span className="log-card__selected">
            <img src={selectedCheck} alt="" />
            <span>Selected</span>
          </span>
        </>
      )}
    </div>
  )
}

/** Figma "Hiker Log - Congrats" (1646:11007). Its back button has no connection. */
export function LogCongrats() {
  return (
    <Step
      label={LABEL(1)}
      fill={52}
      next="/log/details"
      title={
        <div className="onb__intro">
          <h1 className="onb__title">Congratulations!</h1>
          <p className="onb__lead">You just completed the following hike.</p>
        </div>
      }
    >
      <div className="onb__fields">
        <Field label="Search trails:">
          <div className="log-search">
            <img src={searchIcon} alt="" />
            <span>Black Tusk</span>
          </div>
        </Field>
        <TrailCard variant="congrats" />
      </div>
    </Step>
  )
}

/** Figma "Hiker Log - Details" (1646:11107). */
export function LogDetails() {
  return (
    <Step
      label={LABEL(2)}
      fill={85}
      back="/log/congrats"
      next="/log/difficulty"
      bodyGap={25}
      title={<h1 className="onb__title">Log details</h1>}
    >
      <Field label="Date of completed hike">
        <div className="log-input">MM/DD/YYYY</div>
      </Field>
      <Field label="Time to complete the hike">
        <TagGroup className="onb__tags" options={['1-4 hrs', '4-8 hrs', '8-12 hrs', '12+ hrs']} />
      </Field>
    </Step>
  )
}

/** Figma "Hiker Log - Difficulty" (1646:11133). */
export function LogDifficulty() {
  return (
    <Step
      label={LABEL(3)}
      fill={180}
      back="/log/details"
      next="/log/emergency"
      bodyGap={25}
      title={<h1 className="onb__title">How did it feel?</h1>}
    >
      <OptionGroup
        options={[
          { label: 'Easy', icon: <img className="log-icon" src={easyIcon} alt="" /> },
          { label: 'Medium', icon: <img className="log-icon" src={mediumIcon} alt="" /> },
          { label: 'Difficult', icon: <img className="log-icon" src={difficultIcon} alt="" /> },
          { label: 'Strenuous', icon: <span className="log-icon log-icon--strenuous" /> },
        ]}
      />
    </Step>
  )
}

/** Figma "Hiker Log - Emergency Prep." (1646:11189). */
export function LogEmergency() {
  return (
    <Step
      label={LABEL(4)}
      fill={256}
      back="/log/difficulty"
      next="/log/physical"
      bodyGap={25}
      title={<h1 className="onb__title">How prepared were you for emergencies? </h1>}
    >
      <OptionGroup
        options={['I felt unprepared', 'I was somewhat prepared', 'I was prepared for everything', 'There was no emergencies']}
      />
      <Field label="Add a specific emergency you experienced:">
        <AddItem>Add Emergency</AddItem>
      </Field>
    </Step>
  )
}

/** Figma "Hiker Log - Physical Prep." (1646:11151). */
export function LogPhysical() {
  return (
    <Step
      label={LABEL(5)}
      fill={298}
      back="/log/emergency"
      next="/log/notes"
      bodyGap={25}
      title={<h1 className="onb__title">How did your body handle this hike?</h1>}
    >
      <OptionGroup
        options={[
          'I thought my legs were going to fall off',
          'I had to push to keep going',
          'I could have trained harder',
          'I was prepared for all physical challenges',
        ]}
      />
    </Step>
  )
}

/** Figma "Hiker Log - General Notes" (1646:11168). */
export function LogNotes() {
  return (
    <Step
      label={LABEL(6)}
      fill={350}
      back="/log/physical"
      next="/log/review"
      cta="Review"
      title={
        <div className="onb__intro">
          <h1 className="onb__title">General notes</h1>
          <p className="onb__lead">Any final thoughts?</p>
        </div>
      }
    >
      <div className="log-notes">
        <span>Notes...</span>
      </div>
    </Step>
  )
}

/** Figma "Hiker Log - Review Details" (1646:11053). Its Done button has no connection. */
export function LogReview() {
  const go = useGo()
  return (
    <Screen className="onb" fixed={<Button className="onb__cta">Done</Button>}>
      <BackButton className="onb__back" onClick={() => go('/log/notes')} />
      <div className="log-review">
        <h1 className="onb__title log-review__title">The Black Tusk</h1>
        <p className="onb__lead">MM/DD/YYYY, 8-12 hrs</p>
        <TrailCard variant="review" />
        <Field label="How did it feel?">
          <div className="log-answer">
            <img className="log-icon" src={nightIcon} alt="" />
            <span>Medium</span>
          </div>
        </Field>
        <Field label="How prepared were you for emergencies?">
          <div className="log-answer">I was somewhat prepared</div>
        </Field>
        <Field label="How did your body handle this hike?">
          <div className="log-answer">I had to push to keep going</div>
        </Field>
        <Field label="General notes">
          <div className="log-review__notes">
            <p>
              I felt like i was fairly well prepared except my legs cramped up a couple times and I couldn’t remember
              what I was supposed to do when that happens. there were no major emergencies, however the sun was kinda
              annoying sometimes... I think I should bring a hat next time. Overall pretty good tho.
            </p>
          </div>
        </Field>
      </div>
    </Screen>
  )
}

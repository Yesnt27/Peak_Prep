import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import { Field, Options, SmallIcon, Step as FlowStep } from '../../components/FlowStep.jsx'
import Button from '../../components/Button.jsx'
import { AddItem, BackButton, TagGroup } from '../../components/controls.jsx'
import searchIcon from '../../assets/icons/search.png'
import trailPhoto from '../../assets/hiker-log/trail-photo.png'
import cardBase from '../../assets/hiker-log/card-base.svg'
import selectedCheck from '../../assets/hiker-log/selected-check.svg'
import completedCheck from '../../assets/hiker-log/completed-check.svg'
import easyIcon from '../../assets/hiker-log/easy.svg'
import mediumIcon from '../../assets/hiker-log/medium.svg'
import difficultIcon from '../../assets/hiker-log/difficult.svg'
import strenuousMask from '../../assets/hiker-log/strenuous-mask.png'
import nightIcon from '../../assets/hiker-log/night.png'
import './HikerLog.css'

/** The trail card used on Congrats (selected) and Review (completed). */
function TrailCard({ review = false }) {
  return (
    <div className={review ? 'hl-card hl-card--review' : 'hl-card'}>
      <img className="hl-card__photo" src={trailPhoto} alt="" />
      {!review && <div className="hl-card__shade" />}
      <img className="hl-card__base" src={cardBase} alt="" />
      <p className="hl-card__name">The Black Tusk</p>
      <p className="hl-card__loc">{review ? 'Garibaldi Provincial Park, BC' : 'Garibaldi Provincial Park, B'}</p>
      <p className="hl-card__stats">Hard · 26.4 km · Elev. 1763 m · Est. 7-9 hours</p>
      {review ? (
        <>
          <div className="hl-card__bars">
            <span style={{ left: 144.91, width: 8.357 }} />
            <span style={{ left: 154.94, width: 8.357 }} />
            <span className="hl-card__bar--current" style={{ left: 164.96, width: 20.057 }} />
            <span style={{ left: 186.69, width: 8.357 }} />
            <span style={{ left: 196.72, width: 6.686 }} />
            <span style={{ left: 205.08, width: 5.014 }} />
          </div>
          <div className="hl-card__completed">
            <img src={completedCheck} alt="" />
            <span>Completed</span>
          </div>
        </>
      ) : (
        <>
          <div className="hl-card__dots">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={i === 2 ? 'hl-card__dot hl-card__dot--current' : 'hl-card__dot'} />
            ))}
          </div>
          <div className="hl-card__selected">
            <img src={selectedCheck} alt="" />
            <span>Selected</span>
          </div>
        </>
      )}
    </div>
  )
}

function Step(props) {
  return <FlowStep label="Completed Hike" {...props} />
}

/* 1646:11007 */
export function Congrats() {
  return (
    <Step step={1} fill={52} back="/training" next="/log/details">
      <div className="fs-body fs-body--congrats">
        <div className="fs-intro">
          <h1 className="fs-title">Congratulations!</h1>
          <p className="fs-sub">You just completed the following hike.</p>
        </div>
        <div className="hl-congrats__trail">
          <Field label="Search trails:">
            <div className="fs-search">
              <img src={searchIcon} alt="" />
              <span>Black Tusk</span>
            </div>
          </Field>
          <TrailCard />
        </div>
      </div>
    </Step>
  )
}

/* 1646:11107 */
export function LogDetails() {
  return (
    <Step step={2} fill={85} back="/log/congrats" next="/log/difficulty">
      <div className="fs-body">
        <h1 className="fs-title">Log details</h1>
        <Field label="Date of completed hike">
          <div className="fs-input">MM/DD/YYYY</div>
        </Field>
        <Field label="Time to complete the hike">
          <TagGroup className="fs-tags" options={['1-4 hrs', '4-8 hrs', '8-12 hrs', '12+ hrs']} />
        </Field>
      </div>
    </Step>
  )
}

/* 1646:11133 */
export function Difficulty() {
  return (
    <Step step={3} fill={180} back="/log/details" next="/log/emergency">
      <div className="fs-body">
        <h1 className="fs-title">How did it feel?</h1>
        <Options
          options={[
            { label: 'Easy', icon: <SmallIcon src={easyIcon} /> },
            { label: 'Medium', icon: <SmallIcon src={mediumIcon} /> },
            { label: 'Difficult', icon: <SmallIcon src={difficultIcon} /> },
            { label: 'Strenuous', icon: <SmallIcon mask={strenuousMask} maskStyle={{ marginLeft: 1, WebkitMaskPosition: '-0.5px 0', maskPosition: '-0.5px 0' }} /> },
          ]}
        />
      </div>
    </Step>
  )
}

/* 1646:11189 */
export function EmergencyPrep() {
  return (
    <Step step={4} fill={256} back="/log/difficulty" next="/log/physical">
      <div className="fs-body fs-body--center">
        <h1 className="fs-title fs-title--wrap">How prepared were you for emergencies? </h1>
        <Options
          options={[
            { label: 'I felt unprepared' },
            { label: 'I was somewhat prepared' },
            { label: 'I was prepared for everything' },
            { label: 'There was no emergencies' },
          ]}
        />
      </div>
      <Field label="Add a specific emergency you experienced:">
        <AddItem>Add Emergency</AddItem>
      </Field>
    </Step>
  )
}

/* 1646:11151 */
export function PhysicalPrep() {
  return (
    <Step step={5} fill={298} back="/log/emergency" next="/log/notes">
      <div className="fs-body fs-body--center">
        <h1 className="fs-title fs-title--wrap">How did your body handle this hike?</h1>
        <Options
          options={[
            { label: 'I thought my legs were going to fall off' },
            { label: 'I had to push to keep going' },
            { label: 'I could have trained harder' },
            { label: 'I was prepared for all physical challenges' },
          ]}
        />
      </div>
    </Step>
  )
}

/* 1646:11168 */
export function GeneralNotes() {
  return (
    <Step step={6} fill={350} back="/log/physical" next="/log/review" cta="Review">
      <div className="fs-intro">
        <h1 className="fs-title">General notes</h1>
        <p className="fs-sub">Any final thoughts?</p>
      </div>
      {/* Static, like the prototype (see open question 4). */}
      <div className="hl-notes">
        <span>Notes...</span>
      </div>
    </Step>
  )
}

/* 1646:11053 */
export function ReviewDetails() {
  const go = useGo()
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
          <h1 className="fs-title fs-title--review">The Black Tusk</h1>
          <p className="fs-sub">MM/DD/YYYY, 8-12 hrs</p>
          <TrailCard review />
          <Field label="How did it feel?">
            <div className="hl-answer">
              <img className="hl-answer__icon" src={nightIcon} alt="" />
              <span>Medium</span>
            </div>
          </Field>
          <Field label="How prepared were you for emergencies?">
            <div className="hl-answer">I was somewhat prepared</div>
          </Field>
          <Field label="How did your body handle this hike?">
            <div className="hl-answer">I had to push to keep going</div>
          </Field>
          <Field label="General notes">
            <div className="hl-answer-notes">
              <p>
                I felt like i was fairly well prepared except my legs cramped up a couple times and I couldn’t remember
                what I was supposed to do when that happens. there were no major emergencies, however the sun was kinda
                annoying sometimes... I think I should bring a hat next time. Overall pretty good tho.
              </p>
            </div>
          </Field>
        </div>
      </div>
    </Screen>
  )
}

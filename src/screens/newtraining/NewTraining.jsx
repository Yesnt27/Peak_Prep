import { useState } from 'react'
import BottomSheet from '../../components/BottomSheet.jsx'
import HikeCard from '../../components/HikeCard.jsx'
import { AddItem, MaskIcon, OptionGroup, TagGroup, ToggleSwitch, ToggleTag } from '../../components/controls.jsx'
import { Step } from '../onboarding/Onboarding.jsx'
import searchIcon from '../../assets/icons/search.png'
import blackTusk from '../../assets/home/black-tusk.jpg'
import yearArrow from '../../assets/newtraining/year-arrow.png'
import sunMask from '../../assets/log/strenuous-mask.png'
import overnightMask from '../../assets/newtraining/overnight-mask.png'
import multidayMask from '../../assets/newtraining/multiday-mask.png'
import summitIcon from '../../assets/newtraining/summit.png'
import flagMask from '../../assets/newtraining/flag-mask.png'
import heartMask from '../../assets/newtraining/heart-mask.png'
import clockMask from '../../assets/newtraining/clock-mask.png'
import groupMask from '../../assets/newtraining/group-mask.png'
import linkIcon from '../../assets/friends/link.png'
import joannaBrown from '../../assets/friends/joanna-brown.png'
import joanneBlue from '../../assets/friends/joanne-blue.png'
import johnBo from '../../assets/friends/john-bo.png'
import amberKenz from '../../assets/friends/amber-kenz.png'
import eliEifler from '../../assets/friends/eli-eifler.png'
import owenInterino from '../../assets/friends/owen-interino.png'
import './NewTraining.css'

const LABEL = (n) => `New Training - STEP ${n} OF 6`

function Field({ label, children }) {
  return (
    <div className="onb__field">
      <p className="onb__label">{label}</p>
      {children}
    </div>
  )
}

function Title({ children, lead }) {
  const title = <h1 className="onb__title nt-title">{children}</h1>
  if (!lead) return title
  return (
    <div className="onb__intro">
      {title}
      <p className="onb__lead">{lead}</p>
    </div>
  )
}

/** Figma "new training 19" (1646:5644): target hike. */
export function NewTrainingHike() {
  return (
    <Step
      label={LABEL(1)}
      fill={52}
      back="/home/saved"
      next="/new-training/date"
      title={<Title lead="The hike you’re training for.">Target Hike</Title>}
    >
      <div className="onb__fields">
        <Field label="Search trails:">
          <div className="nt-search">
            <img src={searchIcon} alt="" />
            <span>Black Tusk</span>
          </div>
        </Field>
        <HikeCard
          image={blackTusk}
          tag="STRENUOUS • SCRAMBLE"
          title="The Black Tusk"
          location="Garibaldi Provincial Park, BC"
          rating="4.5 (690)"
          stats={[['26.4', 'KM'], ['1,763', 'M ELEV'], ['9–11', 'HOURS']]}
        />
        <p className="nt-link">Not sure yet? See hikes for your level</p>
      </div>
    </Step>
  )
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** Figma "new training 20" (1646:5688): hike date. Only July is interactive in the Figma component. */
export function NewTrainingDate() {
  const [july, setJuly] = useState(false)
  return (
    <Step label={LABEL(2)} fill={85} back="/new-training" next="/new-training/trip" title={<Title>Hike Date</Title>}>
      <Field label="Year">
        <div className="nt-year">
          <span className="nt-year__btn">
            <img src={yearArrow} alt="" style={{ left: 5.08 }} />
          </span>
          <span className="nt-year__value">2027</span>
          <span className="nt-year__btn nt-year__btn--next">
            <img src={yearArrow} alt="" style={{ left: 4.92 }} />
          </span>
        </div>
      </Field>
      <Field label="Month">
        <div className="nt-months">
          {MONTHS.map((month) =>
            month === 'July' ? (
              <button
                type="button"
                key={month}
                className={july ? 'nt-month nt-month--selected' : 'nt-month nt-month--live'}
                aria-pressed={july}
                onClick={() => setJuly(!july)}
              >
                {month}
              </button>
            ) : (
              <span key={month} className="nt-month">
                {month}
              </span>
            ),
          )}
        </div>
      </Field>
      <Field label="Exact date (optional)">
        <div className="onb__input">30</div>
      </Field>
    </Step>
  )
}

/** Figma "new training 21" (1646:5714): trip type. */
export function NewTrainingTrip() {
  return (
    <Step
      label={LABEL(3)}
      fill={180}
      back="/new-training/date"
      next="/new-training/group"
      title={<Title lead="Day trip or a few nights out?">Trip Type</Title>}
    >
      <OptionGroup
        options={[
          { label: 'Day hike', icon: <MaskIcon src={sunMask} /> },
          { label: 'Overnight', icon: <MaskIcon src={overnightMask} /> },
          { label: 'Multi-day trek', icon: <MaskIcon src={multidayMask} /> },
          { label: 'Summit hike', icon: <img className="nt-icon" src={summitIcon} alt="" /> },
        ]}
      />
    </Step>
  )
}

const FRIENDS = [
  ['Joanna Brown', '@joannabrown32', joannaBrown],
  ['Joanne Blue', '@joanne.blue', joanneBlue],
  ['John Bo', '@john_bo2', johnBo],
  ['Amber Kenz', '@john_bo2', amberKenz],
  ['Eli Eifler', '@john_bo2', eliEifler],
  ['Owen Interino', '@john_bo2', owenInterino],
]

/** Figma "new training 23" (1646:5788): who's coming, with the Invite Friends sheet (2175:7829). */
export function NewTrainingGroup() {
  const [sheet, setSheet] = useState(false)
  return (
    <Step
      label={LABEL(4)}
      fill={256}
      back="/new-training/trip"
      next="/new-training/goal"
      title={<Title>Who’s coming?</Title>}
      overlay={
        <BottomSheet
          open={sheet}
          title="Invite Friends"
          onClose={() => setSheet(false)}
          belowSearch={
            <div className="nt-invite-link">
              <img src={linkIcon} alt="" />
              <span>copy invite link</span>
            </div>
          }
        >
          <div className="nt-friends">
            {FRIENDS.map(([name, handle, photo]) => (
              <div className="nt-friend" key={name}>
                <div className="nt-friend__who">
                  <img src={photo} alt="" />
                  <div className="nt-friend__text">
                    <p className="nt-friend__name">{name}</p>
                    <p className="nt-friend__handle">{handle}</p>
                  </div>
                </div>
                <button type="button" className="nt-add">
                  Add
                </button>
              </div>
            ))}
          </div>
        </BottomSheet>
      }
    >
      <OptionGroup options={['Solo', 'With a partner', 'Small group (3 to 5)', 'Big group (6+)']} />
      <Field label="Invite friends to train together:">
        <AddItem onClick={() => setSheet(true)}>Add Friend</AddItem>
      </Field>
    </Step>
  )
}

/** Figma "new training 8" (1646:5732): goal (each card toggles on its own). */
export function NewTrainingGoal() {
  return (
    <Step label={LABEL(5)} fill={298} back="/new-training/group" next="/new-training/schedule" title={<Title>Goal</Title>}>
      <OptionGroup
        multi
        options={[
          { label: 'Reach the top', icon: <MaskIcon src={flagMask} /> },
          { label: 'Feel good after', icon: <MaskIcon src={heartMask} /> },
          { label: 'Beat the clock', icon: <MaskIcon src={clockMask} /> },
          { label: 'Keep up with the group', icon: <MaskIcon src={groupMask} /> },
        ]}
      />
    </Step>
  )
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** Figma "new training 22" (1646:5749): training schedule. Done → Training overview. */
export function NewTrainingSchedule() {
  return (
    <Step
      label={LABEL(6)}
      fill={350}
      back="/new-training/goal"
      next="/training"
      nextTransition="smart"
      cta="Done"
      title={<Title lead="We’ll build the plan around your life.">Your training schedule</Title>}
    >
      <Field label="Training start date">
        <div className="onb__input nt-date">10/30/2027</div>
      </Field>
      <Field label="Training Availability">
        <div className="nt-days">
          {DAYS.map((day) => (
            <ToggleTag key={day}>{day}</ToggleTag>
          ))}
        </div>
      </Field>
      <Field label="Time per session:">
        <TagGroup className="onb__tags" options={['15-30 min', '30-60 min', '1hr+']} />
      </Field>
      <div className="onb__share">
        <span>Include practice hikes</span>
        <ToggleSwitch label="Include practice hikes" />
      </div>
    </Step>
  )
}

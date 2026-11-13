import { useState } from 'react'
import { Field, Options, SmallIcon, Step as FlowStep } from '../../components/FlowStep.jsx'
import HikeCard from '../../components/HikeCard.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import { AddItem, Tag, TagGroup, ToggleSwitch, TypeField } from '../../components/controls.jsx'
import { HIKES } from '../../data/hikes.js'
import searchIcon from '../../assets/icons/search.png'
import yearArrow from '../../assets/new-training/year-arrow.png'
import linkIcon from '../../assets/new-training/link.png'
import dayHike from '../../assets/new-training/day-hike-mask.png'
import overnight from '../../assets/new-training/overnight-mask.png'
import multiDay from '../../assets/new-training/multi-day-mask.png'
import summit from '../../assets/new-training/summit.png'
import reachTop from '../../assets/new-training/reach-top-mask.png'
import feelGood from '../../assets/new-training/feel-good-mask.png'
import beatClock from '../../assets/new-training/beat-clock-mask.png'
import keepUp from '../../assets/new-training/keep-up-mask.png'
import joanna from '../../assets/friends/joanna.jpg'
import joanne from '../../assets/friends/joanne.jpg'
import john from '../../assets/friends/john.jpg'
import amber from '../../assets/friends/amber.jpg'
import eli from '../../assets/friends/eli.jpg'
import owen from '../../assets/friends/owen.jpg'
import './NewTraining.css'

function Step(props) {
  return <FlowStep label="New Training" {...props} />
}

function Intro({ title, sub }) {
  return (
    <div className="fs-intro">
      <h1 className="fs-title nt-title">{title}</h1>
      {sub && <p className="fs-sub">{sub}</p>}
    </div>
  )
}

/* 1646:5644  new training 19 */
export function TargetHike() {
  return (
    <Step step={1} fill={52} back="/home/saved" next="/new-training/date">
      <div className="fs-body nt-body">
        <Intro title="Target Hike" sub="The hike you’re training for." />
        <div className="nt-target">
          <Field label="Search trails:">
            <div className="fs-search nt-search">
              <img src={searchIcon} alt="" />
              <TypeField defaultValue="Black Tusk" enterKeyHint="search" />
            </div>
          </Field>
          <HikeCard {...HIKES.blackTusk} />
          {/* No link in the prototype. */}
          <p className="nt-link">Not sure yet? See hikes for your level</p>
        </div>
      </div>
    </Step>
  )
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/* 1646:5688  new training 20 */
export function HikeDate() {
  return (
    <Step step={2} fill={85} back="/new-training" next="/new-training/trip">
      <div className="fs-body nt-body">
        <Intro title="Hike Date" />
        <Field label="Year">
          {/* The year arrows have no interaction in the prototype. */}
          <div className="nt-year">
            <span className="nt-year__arrow">
              <img src={yearArrow} alt="" />
            </span>
            <span>2027</span>
            <span className="nt-year__arrow nt-year__arrow--next">
              <img src={yearArrow} alt="" />
            </span>
          </div>
        </Field>
        <Field label="Month">
          <div className="nt-months">
            {MONTHS.map((m) => (
              // Figma: only "July" has a hover state; no month is clickable.
              <span key={m} className={m === 'July' ? 'nt-month nt-month--hover' : 'nt-month'}>
                {m}
              </span>
            ))}
          </div>
        </Field>
        <Field label="Exact date (optional)">
          <div className="nt-exact">
            <TypeField tone="light" placeholder="30" inputMode="numeric" />
          </div>
        </Field>
      </div>
    </Step>
  )
}

/* 1646:5714  new training 21 */
export function TripType() {
  return (
    <Step step={3} fill={180} back="/new-training/date" next="/new-training/who">
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Trip Type" sub="Day trip or a few nights out?" />
        <Options
          options={[
            {
              label: 'Day hike',
              icon: <SmallIcon mask={dayHike} maskStyle={{ left: 0.5, right: -0.5, WebkitMaskPosition: '-0.5px 0', maskPosition: '-0.5px 0' }} />,
            },
            { label: 'Overnight', icon: <SmallIcon mask={overnight} /> },
            {
              label: 'Multi-day trek',
              icon: <SmallIcon mask={multiDay} maskStyle={{ inset: '1.92px 0 -0.96px 0.96px', WebkitMaskPosition: '-0.96px -1.92px', maskPosition: '-0.96px -1.92px' }} />,
            },
            { label: 'Summit hike', icon: <SmallIcon src={summit} /> },
          ]}
        />
      </div>
    </Step>
  )
}

const FRIENDS = [
  [joanna, 'Joanna Brown', '@joannabrown32'],
  [joanne, 'Joanne Blue', '@joanne.blue'],
  [john, 'John Bo', '@john_bo2'],
  [amber, 'Amber Kenz', '@john_bo2'],
  [eli, 'Eli Eifler', '@john_bo2'],
  [owen, 'Owen Interino', '@john_bo2'],
]

/* 1646:5788  new training 23 (+ overlay 2175:7829) */
export function WhosComing() {
  const [sheet, setSheet] = useState(false)
  return (
    <Step
      step={4}
      fill={256}
      back="/new-training/trip"
      next="/new-training/goal"
      overlay={
        <BottomSheet open={sheet} title="Invite Friends" onClose={() => setSheet(false)}>
          <div className="nt-invite-link">
            <img src={linkIcon} alt="" />
            <span>copy invite link</span>
          </div>
          <div className="nt-friends">
            {FRIENDS.map(([photo, name, handle]) => (
              <div className="nt-friend" key={name}>
                <div className="nt-friend__who">
                  <img className="nt-friend__photo" src={photo} alt="" />
                  <div className="nt-friend__text">
                    <p className="nt-friend__name">{name}</p>
                    <p className="nt-friend__handle">{handle}</p>
                  </div>
                </div>
                {/* Figma "view tag gr": hover state only. */}
                <span className="nt-friend__add">Add</span>
              </div>
            ))}
          </div>
        </BottomSheet>
      }
    >
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Who’s coming?" />
        <Options
          options={[
            { label: 'Solo' },
            { label: 'With a partner' },
            { label: 'Small group (3 to 5)' },
            { label: 'Big group (6+)' },
          ]}
        />
        <Field label="Invite friends to train together:">
          <AddItem onClick={() => setSheet(true)}>Add Friend</AddItem>
        </Field>
      </div>
    </Step>
  )
}

/* 1646:5732  new training 8 */
export function Goal() {
  return (
    <Step step={5} fill={298} back="/new-training/who" next="/new-training/schedule">
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Goal" />
        {/* These rows only have a hover state in the prototype. */}
        <Options
          selectable={false}
          options={[
            {
              label: 'Reach the top',
              icon: <SmallIcon mask={reachTop} maskStyle={{ inset: '0.96px 0.96px 0 0', WebkitMaskPosition: '0 -0.96px', maskPosition: '0 -0.96px' }} />,
            },
            {
              label: 'Feel good after',
              icon: <SmallIcon mask={feelGood} maskStyle={{ inset: '1px 0 -1px 0', WebkitMaskPosition: '0 -1px', maskPosition: '0 -1px' }} />,
            },
            {
              label: 'Beat the clock',
              icon: <SmallIcon mask={beatClock} maskStyle={{ inset: '0 -1px 1px 2px', WebkitMaskPosition: '-2px 0', maskPosition: '-2px 0' }} />,
            },
            {
              label: 'Keep up with the group',
              icon: <SmallIcon mask={keepUp} maskStyle={{ inset: '0 1px 1px 0' }} />,
            },
          ]}
        />
      </div>
    </Step>
  )
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/* 1646:5749  new training 22 */
export function Schedule() {
  return (
    <Step step={6} fill={350} back="/new-training/goal" next="/training" nextTransition="smart" cta="Done">
      <div className="fs-body fs-body--center nt-body">
        <Intro title="Your training schedule" sub="We’ll build the plan around your life." />
        <Field label="Training start date">
          <div className="fs-input">
            <TypeField defaultValue="10/30/2027" inputMode="numeric" />
          </div>
        </Field>
        <Field label="Training Availability">
          {/* Day tags only have a hover state in the prototype. */}
          <div className="nt-days">
            {DAYS.map((d) => (
              <Tag key={d}>{d}</Tag>
            ))}
          </div>
        </Field>
        <Field label="Time per session:">
          <TagGroup className="fs-tags" options={['15-30 min', '30-60 min', '1hr+']} />
        </Field>
        <div className="nt-toggle-row">
          <span>Include practice hikes</span>
          <ToggleSwitch label="Include practice hikes" />
        </div>
      </div>
    </Step>
  )
}

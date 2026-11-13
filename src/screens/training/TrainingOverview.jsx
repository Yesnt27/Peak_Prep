import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import Button from '../../components/Button.jsx'
import ListItem from '../../components/ListItem.jsx'
import BagStats from '../../components/BagStats.jsx'
import HikeHero, { Chip, KeyStats, SectionHead } from '../../components/HikeHero.jsx'
import ringTrack from '../../assets/training/ring-track.svg'
import ringProgress from '../../assets/training/ring-progress.svg'
import calIcon from '../../assets/training/cal.svg'
import chevLeft from '../../assets/training/chev-left.svg'
import chevRight from '../../assets/training/chev-right.svg'
import dotDone from '../../assets/training/dot-done.svg'
import dotToday from '../../assets/training/dot-today.svg'
import bagIcon from '../../assets/training/bag.svg'
import shieldIcon from '../../assets/training/shield.svg'
import checkIcon from '../../assets/training/check.svg'
import './TrainingOverview.css'

const WEEK = [
  ['S', '26', 'done'],
  ['M', '27', 'done'],
  ['T', '28', 'today'],
  ['W', '29'],
  ['T', '30'],
  ['F', '31'],
  ['S', '01'],
]

/** Figma "Training overview (hi-fi)" (1780:3125). */
export default function TrainingOverview() {
  const go = useGo()
  return (
    <Screen className="to" fixed={<NavBar />}>
      <div className="to-page">
        {/* The back button has no prototype connection in Figma. */}
        <HikeHero
          chips={
            <>
              <Chip tone="yellow" tall>
                Hard
              </Chip>
              <Chip tall>Sat, Dec 12</Chip>
            </>
          }
        />

        <div className="to-content">
          <KeyStats
            stats={[
              ['1,539', 'm', 'in elevation'],
              ['14.3', 'km', 'in distance'],
              ['7–9', 'hrs', 'est. time'],
            ]}
          />

          <div className="to-prep">
            <div className="to-ring">
              <img src={ringTrack} alt="" />
              <img src={ringProgress} alt="" />
              <p className="to-ring__value">82%</p>
              <p className="to-ring__label">ready</p>
            </div>
            <div className="to-prep__rows">
              {[
                ['Prep status', 'On optimal track'],
                ['Training completed', '3 of 6 weeks'],
                ['Elevation goal', '3,389 / 4,120 m'],
              ].map(([label, value]) => (
                <div className="to-prep__row" key={label}>
                  <span className="to-prep__label">{label}</span>
                  <span className="to-prep__value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="hd-section">
            <div className="hd-head">
              <div className="hd-head__title">
                <img src={calIcon} alt="" />
                <h2>October 2026</h2>
              </div>
              <div className="to-month-nav">
                <span>
                  <img src={chevLeft} alt="" />
                </span>
                <span>
                  <img src={chevRight} alt="" />
                </span>
              </div>
            </div>
            <div className="to-week">
              {WEEK.map(([letter, day, state], i) => (
                <div className={state === 'today' ? 'to-day to-day--today' : 'to-day'} key={i}>
                  <span className="to-day__letter">{letter}</span>
                  <span className="to-day__num">{day}</span>
                  <span className="to-day__dot">
                    {state === 'done' && <img src={dotDone} alt="" />}
                    {state === 'today' && <img src={dotToday} alt="" />}
                  </span>
                </div>
              ))}
            </div>
            <p className="to-daily">Daily training · 2 of 3 done</p>
            <ListItem label="Stair Climber · lv.6" meta="40 min" />
            <ListItem label="Weighted Walk · 15kg" meta="20 min" />
            <ListItem label="Endurance" meta="20 min" />
            {/* Hover only in Figma; no destination is wired. */}
            <Button className="to-btn">View Training Schedule</Button>
          </section>

          <section className="hd-section">
            <SectionHead
              icon={bagIcon}
              title="Bag check"
              sub="Osprey Talon 33L"
              align="end"
              right={
                <Chip tone="cream" tall>
                  10.2 / 12 kg
                </Chip>
              }
            />
            <BagStats />
            <Button className="to-btn" onClick={() => go('/packing/all')}>
              Packing List
            </Button>

            <div className="to-safety">
              <SectionHead
                icon={shieldIcon}
                title="Hiking safety"
                sub="Brunswick Mountain Safety"
                align="end"
                right={
                  <Chip tone="yellow" tall>
                    2 of 4
                  </Chip>
                }
              />
              <div className="to-safety__card">
                <div className="to-steps">
                  <span className="to-step to-step--done">
                    <img src={checkIcon} alt="" />
                  </span>
                  <span className="to-step__line" />
                  <span className="to-step to-step--done">
                    <img src={checkIcon} alt="" />
                  </span>
                  <span className="to-step__line" />
                  <span className="to-step to-step--current">3</span>
                  <span className="to-step__line to-step__line--todo" />
                  <span className="to-step to-step--todo">4</span>
                </div>
                <div className="to-next">
                  <div>
                    <p className="to-next__eyebrow">Up next</p>
                    <p className="to-next__title">Heat Exposure</p>
                  </div>
                  <Chip tone="yellow" tall>
                    8 scenarios
                  </Chip>
                </div>
                <button type="button" className="to-round-btn" onClick={() => go('/first-aid')}>
                  Continue lesson
                </button>
              </div>
            </div>
          </section>

          <button type="button" className="to-round-btn" onClick={() => go('/log/congrats')}>
            Hike Completed!
          </button>
        </div>
      </div>
    </Screen>
  )
}

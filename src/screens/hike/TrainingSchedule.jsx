import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import ListItem from '../../components/ListItem.jsx'
import { BackButton } from '../../components/controls.jsx'
import { SectionHeader } from './parts.jsx'
import { PrepStatus, WeekStrip } from './TrainingOverview.jsx'
import calendarIcon from '../../assets/training/calendar.svg'
import chevLeft from '../../assets/training/chev-left.svg'
import chevRight from '../../assets/training/chev-right.svg'
import rowChevron from '../../assets/icons/chev-right.svg'
import './TrainingOverview.css'
import './TrainingSchedule.css'

const chevron = <img className="ts-chevron" src={rowChevron} alt="" />

/** Figma "Training Schedule" 2068:5154 (opened from Training overview). */
export default function TrainingSchedule() {
  const go = useGo()
  return (
    <Screen className="to ts" fixed={<NavBar />}>
      <div className="ts-page">
        <BackButton className="ts-back" onClick={() => go('/training', 'smart')} />
        <div className="ts-content">
          <div className="ts-head">
            <h1 className="ts-title">Training</h1>
            <p className="ts-sub">Black Tusk Winter Hike Training Schedule</p>
            <PrepStatus />
          </div>
          <section className="to-section ts-daily">
            <h2 className="ts-title">Daily Training</h2>
            <SectionHeader icon={calendarIcon} title="October 2026">
              <div className="to-cal__nav">
                <span className="to-cal__arrow">
                  <img src={chevLeft} alt="" />
                </span>
                <span className="to-cal__arrow">
                  <img src={chevRight} alt="" />
                </span>
              </div>
            </SectionHeader>
            <WeekStrip />
            <p className="to-daily">Daily training · 2 of 3 done</p>
            <ListItem tone="green" label="Stair Climber · lv. 6" meta={chevron} defaultChecked />
            <ListItem tone="green" label="Weighted Walk · 15kg" meta={chevron} defaultChecked />
            <ListItem tone="green" label="Endurance" meta={chevron} />
          </section>
        </div>
      </div>
    </Screen>
  )
}

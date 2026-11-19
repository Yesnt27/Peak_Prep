import { useLocation } from 'react-router-dom'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import ListItem from '../../components/ListItem.jsx'
import { BackButton } from '../../components/controls.jsx'
import { PrepStatus } from './TrainingOverview.jsx'
import TrainingCalendar from './TrainingCalendar.jsx'
import rowChevron from '../../assets/icons/chev-right.svg'
import './TrainingOverview.css'
import './TrainingSchedule.css'

const chevron = <img className="ts-chevron" src={rowChevron} alt="" />

/** Figma "Training Schedule" 2068:5154 (opened from Training overview). */
export default function TrainingSchedule() {
  const go = useGo()
  const location = useLocation()
  return (
    <Screen className="to ts" fixed={<NavBar />}>
      <div className="ts-page">
        <BackButton className="ts-back" onClick={() => go(location.state?.from || '/training', 'smart')} />
        <div className="ts-content">
          <section className="to-section ts-daily">
            <h1 className="ts-title">Daily Training</h1>
            <TrainingCalendar />
            <p className="to-daily">Daily training · 2 of 3 done</p>
            <ListItem tone="green" label="Stair Climber · lv. 6" meta={chevron} defaultChecked />
            <ListItem tone="green" label="Weighted Walk · 15kg" meta={chevron} defaultChecked />
            <ListItem tone="green" label="Endurance" meta={chevron} />
          </section>
          <PrepStatus />
        </div>
      </div>
    </Screen>
  )
}

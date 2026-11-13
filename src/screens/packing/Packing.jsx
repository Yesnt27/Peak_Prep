import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
import ListItem from '../../components/ListItem.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import { AddItem, BackButton } from '../../components/controls.jsx'
import winterGear from '../../assets/packing/winter-gear.svg'
import healthSafety from '../../assets/packing/health-safety.svg'
import foodWater from '../../assets/packing/food-water.svg'
import electronics from '../../assets/packing/electronics.svg'
import editButton from '../../assets/packing/edit-button.svg'
import doneButton from '../../assets/packing/done-button.svg'
import pencil from '../../assets/packing/pencil.svg'
import help from '../../assets/packing/help.svg'
import stepperMinus from '../../assets/icons/stepper-minus.svg'
import stepperPlus from '../../assets/icons/stepper-plus.svg'
import './Packing.css'

// Data as shown in Figma "Packing - All Items" (1646:11433). [name, weight, packed]
const GROUPS = [
  {
    icon: winterGear,
    name: 'Winter Gear',
    count: '2 of 3',
    items: [
      ['Microspikes', '0.4 kg', true],
      ['Windbreaker', '0.7 kg', true],
      ['Mittens', '0.0 kg', false],
    ],
  },
  {
    icon: healthSafety,
    name: 'Health & Safety',
    count: '2 of 2',
    items: [
      ['First Aid Kit', '0.2 kg', true],
      ['Knee Brace', '0.4 kg', true],
    ],
  },
  {
    icon: foodWater,
    name: 'Food & Water',
    count: '2 of 3',
    items: [
      ['Water (3.5L)', '0.5 kg', true],
      ['Trail Mix (500 cal)', '0.2 kg', true],
      ['Thermos Flask', '0.0 kg', false],
    ],
  },
  {
    icon: electronics,
    name: 'Electronics',
    count: '1 of 2',
    items: [
      ['Power Bank', '0.2 kg', true],
      ['Headlamp', '0.0 kg', false],
    ],
  },
]

const TABS = [
  { id: 'all', label: 'All', color: '#414141' },
  { id: 'to-pack', label: 'To Pack' },
  { id: 'packed', label: 'Packed' },
]

// Figma frame heights, so each screen scrolls exactly as far as its frame.
const HEIGHTS = { all: 1315, 'to-pack': 875, packed: 1138, edit: 1442 }

function GroupHead({ icon, name, count }) {
  return (
    <div className="pk-group__head">
      <span className="pk-group__name">
        <img src={icon} alt="" />
        {name}
      </span>
      <span className="pk-group__count">{count}</span>
    </div>
  )
}

function Title({ edit }) {
  return (
    <div className="pk-title">
      <div className={edit ? 'pk-title__row pk-title__row--edit' : 'pk-title__row'}>
        <h1>Packing</h1>
        {edit ? (
          <img className="pk-title__pencil" src={pencil} alt="" />
        ) : (
          // Figma "Group 1410103755": hover swaps to the darker yellow, no click action.
          <span className="pk-help">
            <img src={help} alt="" />
            <span>?</span>
          </span>
        )}
      </div>
      <p className="pk-title__sub">Black Tusk Winter Hike Packing List</p>
    </div>
  )
}

function BagStats() {
  return (
    <div className="pk-stats">
      <div className="pk-stat">
        <p className="pk-stat__title">Packed</p>
        <p className="pk-stat__value">
          <span className="pk-stat__num">8</span>
          <span className="pk-stat__unit">of 11</span>
        </p>
        <p className="pk-stat__note">3 left to pack</p>
        <div className="pk-stat__bar">
          <div className="pk-stat__fill" style={{ flex: 'none', width: 101 }} />
        </div>
      </div>
      <div className="pk-stat">
        <p className="pk-stat__title">Weight</p>
        <p className="pk-stat__value">
          <span className="pk-stat__num">7.8</span>
          <span className="pk-stat__unit">kg</span>
        </p>
        <p className="pk-stat__note">85% of 12 kg limit</p>
        <div className="pk-stat__bar">
          <div className="pk-stat__fill" />
        </div>
      </div>
    </div>
  )
}

/** Figma "Packing - All Items" 1646:11433, "To Pack" 11597, "Packed" 11656. */
export function PackingList({ tab }) {
  const go = useGo()
  const [selected, setSelected] = useState(tab)
  const filter = tab === 'all' ? () => true : tab === 'packed' ? (item) => item[2] : (item) => !item[2]
  const groups = GROUPS.map((g) => ({ ...g, items: g.items.filter(filter) })).filter((g) => g.items.length)

  return (
    <Screen className="pk" fixed={<NavBar />}>
      <div className="pk-page" style={{ minHeight: HEIGHTS[tab] }}>
        <BackButton className="pk-back" onClick={() => go('/training')} />
        <button type="button" className="pk-corner pk-corner--edit" aria-label="Edit packing list" onClick={() => go('/packing/edit', 'smart')}>
          <img src={editButton} alt="" />
        </button>
        <div className="pk-content">
          <Title />
          <BagStats />
          <SegmentedTabs
            className="pk-tabs"
            tabs={TABS}
            value={selected}
            animated
            onChange={(id) => {
              setSelected(id)
              go(`/packing/${id}`, 'smart')
            }}
          />
          {groups.map((g) => (
            <div className="pk-group" key={g.name}>
              <GroupHead {...g} />
              {g.items.map(([name, weight, packed]) => (
                <ListItem key={name} label={name} meta={weight} defaultChecked={packed} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

/** Figma "Packing - Edit" 1646:11507. */
export function PackingEdit() {
  const go = useGo()
  const [unit, setUnit] = useState('kg')
  return (
    <Screen
      className="pk"
      fixed={
        <Button className="pk-save" onClick={() => go('/packing/all', 'smart')}>
          Save Changes
        </Button>
      }
    >
      <div className="pk-page" style={{ minHeight: HEIGHTS.edit }}>
        <button type="button" className="pk-corner pk-corner--done" aria-label="Done" onClick={() => go('/packing/packed', 'smart')}>
          <img src={doneButton} alt="" />
        </button>
        <div className="pk-content">
          <Title edit />
          <div className="pk-max">
            <p className="pk-max__label">Maximum packing weight</p>
            <div className="pk-max__row">
              {/* The stepper has no interaction in the prototype. */}
              <div className="pk-stepper">
                <img src={stepperMinus} alt="" />
                <span>10</span>
                <img src={stepperPlus} alt="" />
              </div>
              <SegmentedTabs
                className="pk-unit"
                tabs={[
                  { id: 'kg', label: 'kg', color: '#414141' },
                  { id: 'lb', label: 'lb' },
                ]}
                value={unit}
                animated
                onChange={setUnit}
              />
            </div>
          </div>
          {GROUPS.map((g) => (
            <div className="pk-group" key={g.name}>
              <GroupHead {...g} />
              {g.items.map(([name, weight, packed]) => (
                <ListItem key={name} label={name} meta={weight} defaultChecked={packed} />
              ))}
              <AddItem>Add Item</AddItem>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

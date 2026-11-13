<<<<<<< Updated upstream
import { useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
=======
import { useEffect, useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import Button from '../../components/Button.jsx'
import BagStats from '../../components/BagStats.jsx'
>>>>>>> Stashed changes
import ListItem from '../../components/ListItem.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import { AddItem, BackButton } from '../../components/controls.jsx'
import winterGear from '../../assets/packing/winter-gear.svg'
import healthSafety from '../../assets/packing/health-safety.svg'
import foodWater from '../../assets/packing/food-water.svg'
import electronics from '../../assets/packing/electronics.svg'
<<<<<<< Updated upstream
import editButton from '../../assets/packing/edit-button.svg'
import doneButton from '../../assets/packing/done-button.svg'
import pencil from '../../assets/packing/pencil.svg'
import help from '../../assets/packing/help.svg'
=======
import helpCircle from '../../assets/packing/help.svg'
import editButton from '../../assets/packing/edit-button.svg'
import doneButton from '../../assets/packing/done-button.svg'
import titlePencil from '../../assets/packing/title-pencil.svg'
>>>>>>> Stashed changes
import stepperMinus from '../../assets/icons/stepper-minus.svg'
import stepperPlus from '../../assets/icons/stepper-plus.svg'
import './Packing.css'

<<<<<<< Updated upstream
// Data as shown in Figma "Packing - All Items" (1646:11433). [name, weight, packed]
const GROUPS = [
  {
    icon: winterGear,
    name: 'Winter Gear',
=======
// [name, weight, packed]
const CATEGORIES = [
  {
    name: 'Winter Gear',
    icon: winterGear,
>>>>>>> Stashed changes
    count: '2 of 3',
    items: [
      ['Microspikes', '0.4 kg', true],
      ['Windbreaker', '0.7 kg', true],
      ['Mittens', '0.0 kg', false],
    ],
  },
  {
<<<<<<< Updated upstream
    icon: healthSafety,
    name: 'Health & Safety',
=======
    name: 'Health & Safety',
    icon: healthSafety,
>>>>>>> Stashed changes
    count: '2 of 2',
    items: [
      ['First Aid Kit', '0.2 kg', true],
      ['Knee Brace', '0.4 kg', true],
    ],
  },
  {
<<<<<<< Updated upstream
    icon: foodWater,
    name: 'Food & Water',
=======
    name: 'Food & Water',
    icon: foodWater,
>>>>>>> Stashed changes
    count: '2 of 3',
    items: [
      ['Water (3.5L)', '0.5 kg', true],
      ['Trail Mix (500 cal)', '0.2 kg', true],
      ['Thermos Flask', '0.0 kg', false],
    ],
  },
  {
<<<<<<< Updated upstream
    icon: electronics,
    name: 'Electronics',
=======
    name: 'Electronics',
    icon: electronics,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
// Figma frame heights, so each screen scrolls as far as its prototype frame.
const HEIGHTS = { all: 1315, 'to-pack': 875, packed: 1138 }

function CategoryHead({ icon, name, count }) {
  return (
    <div className="pk-cat__head">
      <span className="pk-cat__name">
        <img src={icon} alt="" />
        {name}
      </span>
      <span className="pk-cat__count">{count}</span>
>>>>>>> Stashed changes
    </div>
  )
}

<<<<<<< Updated upstream
function Title({ edit }) {
=======
function Item({ name, weight, packed }) {
  // Packed rows carry a green check override in Figma; rows packed later use the component's yellow one.
  return <ListItem label={name} meta={weight} defaultChecked={packed} tone={packed ? 'green' : 'yellow'} />
}

function Title({ edit = false }) {
>>>>>>> Stashed changes
  return (
    <div className="pk-title">
      <div className={edit ? 'pk-title__row pk-title__row--edit' : 'pk-title__row'}>
        <h1>Packing</h1>
        {edit ? (
<<<<<<< Updated upstream
          <img className="pk-title__pencil" src={pencil} alt="" />
        ) : (
          // Figma "Group 1410103755": hover swaps to the darker yellow, no click action.
          <span className="pk-help">
            <img src={help} alt="" />
            <span>?</span>
          </span>
=======
          <img className="pk-title__pencil" src={titlePencil} alt="" />
        ) : (
          <button type="button" className="pk-help" aria-label="Help">
            <img src={helpCircle} alt="" />
            <span>?</span>
          </button>
>>>>>>> Stashed changes
        )}
      </div>
      <p className="pk-title__sub">Black Tusk Winter Hike Packing List</p>
    </div>
  )
}

<<<<<<< Updated upstream
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
=======
/** Figma "Packing - All Items" / "To Pack" / "Packed" (1646:11433, 11597, 11656). */
export function PackingList({ filter }) {
  const go = useGo()
  // The tab colour cross-fades first (300ms), then the screen changes with a smart animate.
  const [selected, setSelected] = useState(filter)

  useEffect(() => {
    if (selected === filter) return undefined
    const timer = setTimeout(() => go(`/packing/${selected}`, 'smart'), 300)
    return () => clearTimeout(timer)
  }, [selected, filter, go])

  const onBack = {
    all: () => go('/training'),
    'to-pack': () => go('/packing/all'),
    packed: () => {}, // Figma: scrolls to its own back button (no visible change).
  }[filter]

  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(([, , packed]) => filter === 'all' || (filter === 'packed' ? packed : !packed)),
  })).filter((cat) => cat.items.length > 0)

  return (
    <Screen className="pk" fixed={<NavBar />}>
      <div className="pk-page" style={{ minHeight: HEIGHTS[filter] }}>
        <BackButton className="pk-back" onClick={onBack} />
        <button type="button" className="pk-edit" aria-label="Edit packing list" onClick={() => go('/packing/edit', 'smart')}>
          <span className="pk-edit__inner">
            <img src={editButton} alt="" />
          </span>
>>>>>>> Stashed changes
        </button>
        <div className="pk-content">
          <Title />
          <BagStats />
<<<<<<< Updated upstream
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
=======
          <SegmentedTabs className="pk-tabs" tabs={TABS} value={selected} onChange={setSelected} fade />
          {categories.map((cat) => (
            <section className="pk-cat" key={cat.name}>
              <CategoryHead {...cat} />
              {cat.items.map(([name, weight, packed]) => (
                <Item key={name} name={name} weight={weight} packed={packed} />
              ))}
            </section>
>>>>>>> Stashed changes
          ))}
        </div>
      </div>
    </Screen>
  )
}

<<<<<<< Updated upstream
/** Figma "Packing - Edit" 1646:11507. */
=======
const UNITS = [
  { id: 'kg', label: 'kg', color: '#414141' },
  { id: 'lb', label: 'lb' },
]

/** Figma "Packing - Edit" (1646:11507). */
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <div className="pk-page" style={{ minHeight: HEIGHTS.edit }}>
        <button type="button" className="pk-corner pk-corner--done" aria-label="Done" onClick={() => go('/packing/packed', 'smart')}>
=======
      <div className="pk-page" style={{ minHeight: 1442 }}>
        <button type="button" className="pk-done" aria-label="Done editing" onClick={() => go('/packing/packed', 'smart')}>
>>>>>>> Stashed changes
          <img src={doneButton} alt="" />
        </button>
        <div className="pk-content">
          <Title edit />
          <div className="pk-max">
            <p className="pk-max__label">Maximum packing weight</p>
            <div className="pk-max__row">
<<<<<<< Updated upstream
              {/* The stepper has no interaction in the prototype. */}
=======
>>>>>>> Stashed changes
              <div className="pk-stepper">
                <img src={stepperMinus} alt="" />
                <span>10</span>
                <img src={stepperPlus} alt="" />
              </div>
<<<<<<< Updated upstream
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
=======
              <SegmentedTabs className="pk-units" tabs={UNITS} value={unit} onChange={setUnit} fade />
            </div>
          </div>
          {CATEGORIES.map((cat) => (
            <section className="pk-cat" key={cat.name}>
              <CategoryHead {...cat} />
              {cat.items.map(([name, weight, packed]) => (
                <Item key={name} name={name} weight={weight} packed={packed} />
              ))}
              <AddItem>Add Item</AddItem>
            </section>
>>>>>>> Stashed changes
          ))}
        </div>
      </div>
    </Screen>
  )
}

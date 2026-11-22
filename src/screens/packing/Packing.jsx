import { useEffect, useRef, useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import NavBar from '../../components/NavBar.jsx'
import ListItem from '../../components/ListItem.jsx'
import SegmentedTabs from '../../components/SegmentedTabs.jsx'
import Stepper, { SignButton } from '../../components/Stepper.jsx'
import { AddItem, BackButton, IconButton, TypeField } from '../../components/controls.jsx'
import help from '../../assets/packing/help.svg'
import checkDefault from '../../assets/icons/check-default.svg'
import { guessWeight, packState, updatePack, usePacking } from '../../app/packing.js'
import { useAccount, useTraining } from '../../app/account.js'
import { packingFor } from '../../data/packing.js'
import { HIKES } from '../../data/hikes.js'
import '../../components/FlowStep.css'
import './Packing.css'

const TABS = [
  { id: 'all', label: 'All', color: '#414141' },
  { id: 'to-pack', label: 'To Pack' },
  { id: 'packed', label: 'Packed' },
]

const kgOf = (weight) => parseFloat(weight) || 0

/**
 * The opened training's list (Round 20): items from data/packing.js for this hike, date and trip
 * type, plus items added on Edit. Packed ticks, bag and weight limit are kept per training.
 */
function usePackList() {
  usePacking()
  const training = useTraining()
  const account = useAccount()
  const state = packState(training.hike)
  const groups = packingFor(training, account.injuries ?? []).map((g) => ({
    ...g,
    items: [...g.items.map((name) => [name, guessWeight(name)]), ...(state.added[g.name] ?? [])]
      .filter(([name]) => !(state.removed ?? []).includes(name)) // removed on Edit (Round 21)
      .map(([name, weight]) => ({ name, weight, packed: state.packed.includes(name) })),
  }))
  const all = groups.flatMap((g) => g.items)
  const packed = all.filter((i) => i.packed)
  const toggle = (name) =>
    updatePack(training.hike, {
      packed: state.packed.includes(name) ? state.packed.filter((n) => n !== name) : [...state.packed, name],
    })
  return {
    training,
    hike: HIKES[training.hike],
    state,
    groups,
    toggle,
    total: all.length,
    packedCount: packed.length,
    weight: packed.reduce((sum, i) => sum + kgOf(i.weight), 0),
  }
}

/** For Training overview's Bag Check tile. */
export function usePackSummary() {
  const { total, packedCount } = usePackList()
  return { total, packedCount }
}

function GroupHead({ icon, smallIcon, name, items }) {
  return (
    <div className="pk-group__head">
      <span className="pk-group__name">
        <img src={icon} alt="" className={smallIcon ? 'pk-group__icon--small' : undefined} />
        {name}
      </span>
      <span className="pk-group__count">
        {items.filter((i) => i.packed).length} of {items.length}
      </span>
    </div>
  )
}

/** "?" next to the title: tap to open the explanation, tap again or anywhere else to close. */
function HelpButton() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])
  return (
    <span className="pk-help-wrap" ref={ref}>
      <button
        type="button"
        className={open ? 'pk-help pk-help--open' : 'pk-help'}
        aria-label="About this packing list"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <img src={help} alt="" />
        <span>?</span>
      </button>
      <span className={open ? 'pk-pop pk-pop--open' : 'pk-pop'} role="tooltip">
        This packing list is recommended based on your health data and potential trail hazards
      </span>
    </span>
  )
}

function Title({ edit, list }) {
  return (
    <div className="pk-title">
      <div className={edit ? 'pk-title__row pk-title__row--edit' : 'pk-title__row'}>
        <h1>Packing</h1>
        {/* Edit mode shows just the title; the list shows the "?" help. */}
        {!edit && <HelpButton />}
      </div>
      <p className="pk-title__sub">{list.hike.title} Packing List</p>
      {/* Round 20: which bag you're packing (kept per training). */}
      <label className="pk-bag">
        <span className="pk-bag__label">Bag</span>
        <span className="fs-input pk-bag__input">
          <TypeField
            placeholder="e.g. 30L daypack"
            defaultValue={list.state.bag}
            onChange={(e) => updatePack(list.training.hike, { bag: e.target.value })}
          />
        </span>
      </label>
    </div>
  )
}

function BagStats({ list }) {
  const { total, packedCount, weight, state } = list
  const limit = state.unit === 'lb' ? state.max * 0.4536 : state.max
  const pctPacked = total ? (packedCount / total) * 100 : 0
  const pctWeight = Math.min(100, (weight / limit) * 100)
  return (
    <div className="pk-stats">
      <div className="pk-stat">
        <p className="pk-stat__title">Packed</p>
        <p className="pk-stat__value">
          <span className="pk-stat__num">{packedCount}</span>
          <span className="pk-stat__unit">of {total}</span>
        </p>
        <p className="pk-stat__note">{total - packedCount} left to pack</p>
        <div className="pk-stat__bar">
          <div className="pk-stat__fill" style={{ width: `${pctPacked}%` }} />
        </div>
      </div>
      <div className="pk-stat">
        <p className="pk-stat__title">Weight</p>
        <p className="pk-stat__value">
          <span className="pk-stat__num">{weight.toFixed(1)}</span>
          <span className="pk-stat__unit">kg</span>
        </p>
        <p className="pk-stat__note">
          {Math.round((weight / limit) * 100)}% of {state.max} {state.unit} limit
        </p>
        <div className="pk-stat__bar">
          <div className="pk-stat__fill" style={{ width: `${pctWeight}%` }} />
        </div>
      </div>
    </div>
  )
}

/** Figma "Packing - All Items" 1646:11433, "To Pack" 11597, "Packed" 11656. Opens on To Pack (Round 20). */
export function PackingList({ tab }) {
  const go = useGo()
  const list = usePackList()
  const [selected, setSelected] = useState(tab)
  const filter = tab === 'all' ? () => true : tab === 'packed' ? (i) => i.packed : (i) => !i.packed
  const groups = list.groups.map((g) => ({ ...g, shown: g.items.filter(filter) })).filter((g) => g.shown.length)

  return (
    <Screen className="pk" fixed={<NavBar />}>
      <div className="pk-page">
        <BackButton className="pk-back" onClick={() => go('/training')} />
        <IconButton icon="pencil" label="Edit packing list" className="pk-corner pk-corner--edit" onClick={() => go('/packing/edit', 'smart')} />
        <div className="pk-content">
          <Title list={list} />
          <BagStats list={list} />
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
          {groups.length === 0 && (
            <p className="pk-empty">{tab === 'packed' ? 'Nothing packed yet.' : 'Everything is packed. Have a great hike!'}</p>
          )}
          {groups.map((g) => (
            <div className="pk-group" key={g.name}>
              <GroupHead {...g} />
              {g.shown.map((item) => (
                <ListItem key={item.name} label={item.name} meta={item.weight} checked={item.packed} onChange={() => list.toggle(item.name)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

const KG_PER_LB = 0.4536

/** Figma "Packing - Edit" 1646:11507. */
export function PackingEdit() {
  const go = useGo()
  const list = usePackList()
  const { max, unit } = list.state
  const set = (patch) => updatePack(list.training.hike, patch)
  const switchUnit = (next) => {
    if (next === unit) return
    // Keep the same limit when switching units, rounded to a whole number.
    set({ unit: next, max: Math.max(1, Math.round(next === 'lb' ? max / KG_PER_LB : max * KG_PER_LB)) })
  }
  return (
    <Screen
      className="pk"
      fixed={
        <Button className="pk-save" onClick={() => go('/packing/to-pack', 'smart')}>
          Save Changes
        </Button>
      }
    >
      <div className="pk-page">
        <IconButton icon="check" label="Done editing" className="pk-corner pk-corner--done" onClick={() => go('/packing/to-pack', 'smart')} />
        <div className="pk-content">
          <Title edit list={list} />
          <div className="pk-max">
            <p className="pk-max__label">Maximum packing weight</p>
            <div className="pk-max__row">
              <Stepper value={max} min={1} max={99} label="maximum weight" onChange={(v) => set({ max: v })} />
              <SegmentedTabs
                className="pk-unit"
                tabs={[
                  { id: 'kg', label: 'kg', color: '#414141' },
                  { id: 'lb', label: 'lb' },
                ]}
                value={unit}
                animated
                onChange={switchUnit}
              />
            </div>
          </div>
          {list.groups.map((g) => (
            <EditGroup key={g.name} group={g} list={list} />
          ))}
        </div>
      </div>
    </Screen>
  )
}

/** One category on the Edit screen: its items, items the user added, and "Add Item". */
function EditGroup({ group, list }) {
  const [draft, setDraft] = useState(null) // text of the row being typed, or null
  const remove = (name) => {
    const { added, removed = [], packed } = list.state
    const own = added[group.name] ?? []
    updatePack(list.training.hike, {
      // Added items are dropped; suggested ones are hidden for this training.
      added: { ...added, [group.name]: own.filter(([n]) => n !== name) },
      removed: own.some(([n]) => n === name) ? removed : [...removed, name],
      packed: packed.filter((n) => n !== name),
    })
  }
  const commit = () => {
    const name = draft?.trim()
    if (name) {
      const added = list.state.added[group.name] ?? []
      updatePack(list.training.hike, {
        added: { ...list.state.added, [group.name]: [...added, [name, guessWeight(name)]] },
        removed: (list.state.removed ?? []).filter((n) => n !== name), // re-adding a removed item brings it back
      })
    }
    setDraft(null)
  }
  return (
    <div className="pk-group">
      <GroupHead {...group} />
      {/* Round 21: on Edit, the circle is a "−" that removes the item from this list. */}
      {group.items.map((item) => (
        <div className="list-item pk-edit-row" key={item.name}>
          <SignButton sign="minus" label={`Remove ${item.name}`} onClick={() => remove(item.name)} />
          <span className="list-item__label">{item.name}</span>
          <span className="list-item__meta pk-edit-row__meta">{item.weight}</span>
        </div>
      ))}
      {draft !== null && (
        <div className="list-item pk-new">
          <img className="pk-new__box" src={checkDefault} alt="" />
          <input
            className="pk-new__input"
            autoFocus
            placeholder="New item"
            aria-label={`New ${group.name} item`}
            enterKeyHint="done"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
              if (e.key === 'Escape') setDraft(null)
            }}
          />
          <span className="list-item__meta pk-new__meta">{guessWeight(draft)}</span>
        </div>
      )}
      <AddItem onClick={() => (draft === null ? setDraft('') : commit())}>Add Item</AddItem>
    </div>
  )
}

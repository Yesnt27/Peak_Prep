import Dropdown from './Dropdown.jsx'
import chevDown from '../assets/icons/chev-down.svg'
import './MeasureInput.css'

/**
 * Weight / height text with units that stay visible while typing (Round 20).
 * Stored as one string: weight "150 lbs" / "68 kg"; height `5ft 8"` / "173 cm".
 */
const nums = (v) => String(v ?? '').match(/\d+(?:\.\d+)?/g) ?? []

export function parseWeight(v, fallbackUnit = 'lbs') {
  const s = String(v ?? '')
  return { n: nums(s)[0] ?? '', unit: /kg/i.test(s) ? 'kg' : /lb/i.test(s) ? 'lbs' : fallbackUnit }
}

export function parseHeight(v, fallbackUnit = 'ft') {
  const s = String(v ?? '')
  const unit = /cm/i.test(s) ? 'cm' : /ft|'|"|”/.test(s) ? 'ft' : fallbackUnit
  const [a = '', b = ''] = nums(s)
  return unit === 'cm' ? { unit, cm: a } : { unit, ft: a, inch: b }
}

export const formatWeight = ({ n, unit }) => (n ? `${n} ${unit}` : '')
export const formatHeight = (h) => (h.unit === 'cm' ? (h.cm ? `${h.cm} cm` : '') : h.ft ? `${h.ft}ft ${h.inch || 0}"` : '')

const round1 = (n) => String(Math.round(n * 10) / 10)

/** Same weight in the other unit, e.g. "186 lbs" → "84.4 kg". */
export function convertWeight(v, unit) {
  const w = parseWeight(v)
  if (!w.n || w.unit === unit) return formatWeight({ ...w, unit })
  const n = parseFloat(w.n)
  return formatWeight({ unit, n: round1(unit === 'kg' ? n * 0.4536 : n / 0.4536) })
}

/** Same height in the other unit, e.g. `6ft 3"` → "191 cm". */
export function convertHeight(v, unit) {
  const h = parseHeight(v)
  if (h.unit === unit) return formatHeight(h)
  if (unit === 'cm') {
    const cm = h.ft ? Math.round((parseFloat(h.ft) * 12 + (parseFloat(h.inch) || 0)) * 2.54) : ''
    return formatHeight({ unit: 'cm', cm: String(cm) })
  }
  if (!h.cm) return ''
  const inches = Math.round(parseFloat(h.cm) / 2.54)
  return formatHeight({ unit: 'ft', ft: String(Math.floor(inches / 12)), inch: String(inches % 12) })
}

const UNIT_OPTIONS = {
  weight: [
    { id: 'lbs', label: 'lbs' },
    { id: 'kg', label: 'kg' },
  ],
  height: [
    { id: 'ft', label: 'ft / in' },
    { id: 'cm', label: 'cm' },
  ],
}

/** Unit picker in the app's dropdown style (Home "Sort"), Round 21. */
export function UnitDropdown({ kind, unit, onChange }) {
  const options = UNIT_OPTIONS[kind]
  return (
    <Dropdown options={options} value={unit} onChange={onChange} label={`${kind} unit`} triggerClassName="unit-dd">
      {(open) => (
        <>
          <span>{options.find((o) => o.id === unit)?.label}</span>
          <img className={open ? 'dd-arrow dd-arrow--open' : 'dd-arrow'} src={chevDown} alt="" />
        </>
      )}
    </Dropdown>
  )
}

/** One number box with its unit beside it. */
function Box({ value, unit, label, placeholder, onChange, width = 56, autoFocus, onKeyDown, showUnit = true }) {
  return (
    <label className="measure__box">
      <input
        className="measure__input"
        style={{ width }}
        inputMode="decimal"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
        onKeyDown={onKeyDown}
      />
      {showUnit && <span className="measure__unit">{unit}</span>}
    </label>
  )
}

/** `kind` = "weight" | "height". `value` / `onChange` use the stored string. */
export default function MeasureInput({ kind, value, unit, onChange, autoFocus, onBlur, onKeyDown, showUnit = true }) {
  // `showUnit={false}`: a UnitDropdown beside it already names lbs / kg / cm (feet + inches keep their marks).
  const events = { onKeyDown, showUnit }
  // Leaving the whole field (not moving from feet to inches) counts as blur.
  const blur = onBlur ? (e) => !e.currentTarget.contains(e.relatedTarget) && onBlur(e) : undefined
  if (kind === 'weight') {
    const w = parseWeight(value, unit)
    return (
      <span className="measure" onBlur={blur}>
        <Box {...events} autoFocus={autoFocus} label="Weight" placeholder={w.unit === 'kg' ? '68' : '150'} value={w.n} unit={w.unit} onChange={(n) => onChange(formatWeight({ ...w, n }))} />
      </span>
    )
  }
  const h = parseHeight(value, unit)
  if (h.unit === 'cm')
    return (
      <span className="measure" onBlur={blur}>
        <Box {...events} autoFocus={autoFocus} label="Height in centimetres" placeholder="173" value={h.cm} unit="cm" onChange={(cm) => onChange(formatHeight({ ...h, cm }))} />
      </span>
    )
  return (
    <span className="measure" onBlur={blur}>
      <Box {...events} showUnit autoFocus={autoFocus} label="Height, feet" placeholder="5" width={28} value={h.ft} unit="ft" onChange={(ft) => onChange(formatHeight({ ...h, ft }))} />
      <Box {...events} showUnit label="Height, inches" placeholder="8" width={28} value={h.inch} unit={'"'} onChange={(inch) => onChange(formatHeight({ ...h, ft: h.ft || '0', inch }))} />
    </span>
  )
}

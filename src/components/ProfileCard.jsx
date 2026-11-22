import { updateAccount, useAccount } from '../app/account.js'
import { FieldCard } from './controls.jsx'
import Stepper from './Stepper.jsx'
import MeasureInput, { UnitDropdown, convertHeight, convertWeight, parseHeight, parseWeight } from './MeasureInput.jsx'

const SEXES = ['Female', 'Male', 'Intersex', 'Prefer not to say']

// Earlier sessions: 'Unspecified' was renamed; 'Non-binary' was removed (not the same as Intersex, so it shows "Choose").
const sexOption = (saved) => (saved === 'Unspecified' ? 'Prefer not to say' : SEXES.includes(saved) ? saved : null)

/**
 * Sex / Age / Weight / Height (Round 25): the one card for sign-up "Hiker profile" and
 * Health Information "Basic Information". Saves as you go.
 */
export default function ProfileCard() {
  const account = useAccount()
  const weightUnit = parseWeight(account.weight, account.weightUnit).unit
  const heightUnit = parseHeight(account.height, account.heightUnit).unit
  return (
    <FieldCard
      values={{ Sex: sexOption(account.sex) }}
      onChange={(_, value) => updateAccount({ sex: value })}
      rows={[
        { label: 'Sex', options: SEXES },
        {
          label: 'Age',
          render: () => (
            <Stepper
              className="stepper--compact"
              value={account.age}
              min={1}
              max={120}
              label="age"
              onChange={(v) => updateAccount({ age: String(v) })}
            />
          ),
        },
        {
          label: 'Weight',
          render: () => (
            <MeasureInput kind="weight" unit={weightUnit} value={account.weight} showUnit={false} onChange={(v) => updateAccount({ weight: v })} />
          ),
          unitControl: (
            <UnitDropdown kind="weight" unit={weightUnit} onChange={(u) => updateAccount({ weightUnit: u, weight: convertWeight(account.weight, u) })} />
          ),
        },
        {
          label: 'Height',
          render: () => (
            <MeasureInput kind="height" unit={heightUnit} value={account.height} showUnit={false} onChange={(v) => updateAccount({ height: v })} />
          ),
          unitControl: (
            <UnitDropdown kind="height" unit={heightUnit} onChange={(u) => updateAccount({ heightUnit: u, height: convertHeight(account.height, u) })} />
          ),
        },
      ]}
    />
  )
}

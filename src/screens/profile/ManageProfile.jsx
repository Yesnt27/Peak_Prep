import useGo from '../../app/useGo.js'
import { updateAccount, useAccount } from '../../app/account.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import { BackButton, TypeField } from '../../components/controls.jsx'
import { ExperienceFields, FieldOptions } from '../onboarding/Onboarding.jsx'
import '../onboarding/Onboarding.css'
import './Profile.css'

/**
 * Settings → Manage Profile (Round 20/21): the sign-up answers that Health Information doesn't
 * show (name + hiking experience), with the sign-up fields and no required asterisks. Body,
 * activity, health and emergency contact are edited on Health Information, so nothing repeats.
 */
export default function ManageProfile() {
  const go = useGo()
  const account = useAccount()
  return (
    <Screen className="pr onb" fixed={<NavBar />}>
      <div className="pv-content mp-content">
        <BackButton className="pv-back" onClick={() => go('/profile/settings', 'smart')} />
        <h1 className="pv-title">Manage Profile</h1>
        <FieldOptions value={{ labels: true, required: false }}>
          <section className="mp-section">
            <h2 className="pv-heading">Profile</h2>
            <div className="onb__field">
              <p className="onb__label">Name:</p>
              <div className="onb__input">
                <TypeField
                  tone="light"
                  placeholder="John Smith"
                  autoComplete="name"
                  defaultValue={account.name}
                  onChange={(e) => updateAccount({ name: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="mp-section">
            <h2 className="pv-heading">Hiking Experience</h2>
            <ExperienceFields />
          </section>
        </FieldOptions>
      </div>
    </Screen>
  )
}

import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import iconHealth from '../../assets/profile/icon-health.png'
import iconPrivacy from '../../assets/profile/icon-privacy.png'
import { BackButton, ToggleSwitch } from '../../components/controls.jsx'
import chevron from '../../assets/profile/chevron.svg'
import chevRightGreen from '../../assets/icons/chev-right-green.svg'
import { ProfileView } from './FriendProfile.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { levelFor, readPhoto, signOut, updateAccount, useAccount } from '../../app/account.js'
import './Profile.css'

// Hudson's completed hikes (Figma "Completed Hikes": Recent + Favourited), newest first.
const COMPLETED = [
  ['saintMark', 'Dec 12, 2026', 'With Siena & Mark', true],
  ['grouse', 'July 25, 2025', 'With Siena & Mark', true],
  ['everest', 'June 20, 2025', 'With Siena & Mark', true],
]

/** Profile tab: the friend-profile layout for the user, with Health Stats + Settings. */
export default function Profile() {
  const go = useGo()
  const account = useAccount()
  const isNew = account.type === 'new'
  const years = isNew ? account.years || '0' : '7+'
  return (
    <ProfileView
      // Log In = Hudson Kemp (the designed profile); Sign Up = what the new account entered.
      photo={isNew ? account.photo : hudson}
      name={account.name?.trim() || (isNew ? 'New hiker' : 'Hudson Kemp')}
      onPhoto={isNew ? async (file) => updateAccount({ photo: await readPhoto(file) }) : undefined}
      stats={[
        { value: (account.friends ?? []).length, label: 'Friends', onClick: () => go('/profile/friends', 'smart') },
        { value: years, label: years === '1' ? 'Year Exp.' : 'Years Exp.' },
      ]}
      level={isNew ? levelFor(account.years) : 'Advanced'}
      hikes={isNew ? 0 : COMPLETED.length}
      progress={isNew ? 0 : 0.6}
      actions={
        // Figma "profile card" style (profile.png): icon + label, hover light grey.
        <div className="pr-cards">
          <button type="button" className="pr-card pr-card--hover" onClick={() => go('/profile/health', 'smart')}>
            <img src={iconHealth} alt="" />
            <span>Health Stats</span>
          </button>
          <button type="button" className="pr-card pr-card--hover" onClick={() => go('/profile/settings', 'smart')}>
            <img src={iconPrivacy} alt="" />
            <span>Settings</span>
          </button>
        </div>
      }
      section={
        <>
          <h2 className="fp-section__title">Completed Hikes</h2>
          {!isNew && (
            <button type="button" className="fp-link" onClick={() => go('/profile/completed', 'smart')}>
              <span>See all</span>
              <img src={chevRightGreen} alt="" />
            </button>
          )}
        </>
      }
      activities={isNew ? [] : COMPLETED}
      empty={<EmptyState title="No completed hikes yet" text="Hikes you finish will show up here." />}
    />
  )
}

const PRIVACY = {
  Account: ['Manage Profile', 'Passwords & Security', 'Notifications', 'Language'],
  Preferences: ['About Us', 'Theme', 'Help Center', 'Contact Us'],
}

/** Figma "Frame 1410103912" (Privacy) 1646:13422, titled "Settings" (Profile → Settings). Rows: hover only. */
export function Settings() {
  const go = useGo()
  return (
    <Screen className="pr" fixed={<NavBar />}>
      <div className="pv-content">
        <BackButton className="pv-back" onClick={() => go('/profile', 'smart')} />
        <div className="pv-body">
          <h1 className="pv-title">Settings</h1>
          {Object.entries(PRIVACY).map(([section, rows]) => (
            <div className="pv-section" key={section}>
              <h2 className="pv-heading">{section}</h2>
              <div className="pv-rows">
                {rows.map((row) =>
                  // Round 20: Manage Profile edits everything entered at sign-up.
                  row === 'Manage Profile' ? (
                    <button type="button" className="pv-row pv-row--link" key={row} onClick={() => go('/profile/settings/profile', 'smart')}>
                      <span>{row}</span>
                      <img src={chevron} alt="" />
                    </button>
                  ) : (
                    <div className="pv-row" key={row}>
                      <span>{row}</span>
                      <img src={chevron} alt="" />
                    </div>
                  ),
                )}
                {section === 'Account' && (
                  <button type="button" className="pv-row pv-row--link" onClick={() => go('/profile/settings/apps', 'smart')}>
                    <span>Connected Apps</span>
                    <img src={chevron} alt="" />
                  </button>
                )}
                {section === 'Account' && (
                  <button
                    type="button"
                    className="pv-row pv-row--signout"
                    onClick={() => {
                      signOut()
                      go('/welcome', 'smart')
                    }}
                  >
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

// Fitness apps and devices PeakPrep can read from (the demo account starts with Apple Watch + Apple Health on).
const APPS = [
  ['Apple Watch', 'Workouts, heart rate and sleep', true],
  ['Apple Health', 'Steps, activity and health stats', true],
  ['Strava', 'Hikes, runs and routes', false],
  ['Garmin Connect', 'Watch activities and elevation', false],
  ['Google Fit', 'Steps and workouts on Android', false],
  ['Fitbit', 'Steps, heart rate and sleep', false],
]

/** Settings → Connected Apps: link watches and fitness apps that feed training and Health Stats. */
export function ConnectedApps() {
  const go = useGo()
  const isNew = useAccount().type === 'new'
  return (
    <Screen className="pr" fixed={<NavBar />}>
      <div className="pv-content">
        <BackButton className="pv-back" onClick={() => go('/profile/settings', 'smart')} />
        <div className="pv-body">
          <h1 className="pv-title">Connected Apps</h1>
          <p className="pv-lead">Link your watch and fitness apps so your training, steps and health stats update automatically.</p>
          <div className="pv-rows">
            {APPS.map(([name, sub, on]) => (
              <div className="pv-row pv-row--app" key={name}>
                <span className="pv-app">
                  <span className="pv-app__name">{name}</span>
                  <span className="pv-app__sub">{sub}</span>
                </span>
                <ToggleSwitch label={`Connect ${name}`} defaultOn={!isNew && on} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

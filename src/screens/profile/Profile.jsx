<<<<<<< Updated upstream
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import hudson from '../../assets/profile/hudson.jpg'
import searchIcon from '../../assets/profile/search.svg'
import iconCompleted from '../../assets/profile/icon-completed.png'
import iconHealth from '../../assets/profile/icon-health.png'
import iconFriends from '../../assets/profile/icon-friends.png'
import iconPrivacy from '../../assets/profile/icon-privacy.png'
import roundBack from '../../assets/profile/round-back.svg'
import chevron from '../../assets/profile/chevron.svg'
import './Profile.css'

// [label, icon, route, hasHover] — Figma: the Privacy card links but has no hover state.
const CARDS = [
  ['Completed hikes', iconCompleted, '/profile/completed', true],
  ['Health Stats', iconHealth, '/profile/health', true],
  ['Friends', iconFriends, '/profile/friends', true],
  ['Privacy', iconPrivacy, '/profile/privacy', false],
]

/** Figma "Profile" 1646:13300. */
export default function Profile() {
  const go = useGo()
  return (
    <Screen className="pr" fixed={<NavBar />}>
      <h1 className="pr-title">Profile</h1>
      <div className="pr-content">
        <div className="pr-user">
          <img className="pr-user__photo" src={hudson} alt="" />
          <div className="pr-user__text">
            <p className="pr-user__name">Hudson Kemp</p>
            <p className="pr-user__exp">7+ yrs of experience</p>
          </div>
        </div>
        <div className="pr-search">
          <img src={searchIcon} alt="" />
          <span>Search </span>
        </div>
        <div className="pr-cards">
          {CARDS.map(([label, icon, to, hover]) => (
            <button
              type="button"
              key={label}
              className={hover ? 'pr-card pr-card--hover' : 'pr-card'}
              onClick={() => go(to, 'smart')}
            >
=======
import { useEffect, useState } from 'react'
import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import NavBar from '../../components/NavBar.jsx'
import HikeCard from '../../components/HikeCard.jsx'
import { BackButton, MaskIcon } from '../../components/controls.jsx'
import searchIcon from '../../assets/icons/search.svg'
import chevDown from '../../assets/icons/chev-down.svg'
import pencil from '../../assets/icons/pencil.png'
import homeAvatar from '../../assets/home/avatar.png'
import avatar from '../../assets/profile/avatar.png'
import iconHikes from '../../assets/profile/icon-hikes.png'
import iconHealth from '../../assets/profile/icon-health.png'
import iconFriends from '../../assets/profile/icon-friends.png'
import iconPrivacy from '../../assets/profile/icon-privacy.png'
import backRound from '../../assets/profile/back-round.svg'
import editRound from '../../assets/profile/edit-round.svg'
import ringTrack from '../../assets/profile/ring-track.svg'
import ringCarbs from '../../assets/profile/ring-carbs.svg'
import ringProtein from '../../assets/profile/ring-protein.svg'
import ringFat from '../../assets/profile/ring-fat.svg'
import dashLine from '../../assets/profile/dash-line.svg'
import activityMark from '../../assets/profile/activity-mark.svg'
import activityChart from '../../assets/profile/activity-chart.svg'
import tileChevron from '../../assets/profile/tile-chevron.svg'
import tileChevronB from '../../assets/profile/tile-chevron-b.svg'
import bpMask from '../../assets/profile/bp-mask.svg'
import waterMask from '../../assets/profile/water-mask.svg'
import heartMask from '../../assets/profile/heart-mask.svg'
import sleepMask from '../../assets/profile/sleep-mask.svg'
import chevronDown from '../../assets/profile/chevron-down.svg'
import rowChevron from '../../assets/profile/row-chevron.svg'
import doneIcon from '../../assets/profile/done.png'
import everest from '../../assets/profile/everest.jpg'
import grouseGrind from '../../assets/profile/grouse-grind.png'
import saintMark from '../../assets/profile/saint-mark.png'
import with1 from '../../assets/profile/with-1.png'
import with2 from '../../assets/profile/with-2.png'
import with3 from '../../assets/profile/with-3.png'
import listAmber from '../../assets/friends/list-amber-kenz.png'
import listEli from '../../assets/friends/list-eli-eifler.png'
import listSam from '../../assets/friends/list-sam-eifler.png'
import listOwen from '../../assets/friends/list-owen-interino.png'
import listNatalia from '../../assets/friends/list-natalia-wang.png'
import search1 from '../../assets/friends/search-1.png'
import search2 from '../../assets/friends/search-2.png'
import search3 from '../../assets/friends/search-3.png'
import keyboard from '../../assets/friends/keyboard.png'
import searchDivider from '../../assets/friends/search-divider.svg'
import './Profile.css'

function SearchField({ value, placeholder = 'Search ' }) {
  return (
    <div className="pf-search">
      <img src={searchIcon} alt="" />
      <span className={value ? 'pf-search__value' : undefined}>{value || placeholder}</span>
    </div>
  )
}

function RoundButton({ src, label, onClick }) {
  return (
    <button type="button" className="pf-round" aria-label={label} onClick={onClick}>
      <img src={src} alt="" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Profile (1646:13300)                                                */
/* ------------------------------------------------------------------ */

const CARDS = [
  ['Completed hikes', iconHikes, '/profile/hikes'],
  ['Health Stats', iconHealth, '/profile/health'],
  ['Friends', iconFriends, '/profile/friends'],
  ['Privacy', iconPrivacy, '/profile/privacy'],
]

export function ProfileHome() {
  const go = useGo()
  return (
    <Screen className="pf" fixed={<NavBar />}>
      <h1 className="pf-title pf-title--semibold pf-abs" style={{ left: 23, top: 118 }}>
        Profile
      </h1>
      <div className="pf-home pf-abs" style={{ left: 23, top: 173.7 }}>
        <div className="pf-user">
          <img className="pf-user__avatar" src={avatar} alt="" />
          <div className="pf-user__text">
            <p className="pf-user__name">Hudson Kemp</p>
            <p className="pf-user__exp">7+ yrs of experience</p>
          </div>
        </div>
        <SearchField />
        <div className="pf-cards">
          {CARDS.map(([label, icon, route]) => (
            <button type="button" className="pf-card" key={label} onClick={() => go(route, 'smart')}>
>>>>>>> Stashed changes
              <img src={icon} alt="" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  )
}

<<<<<<< Updated upstream
const PRIVACY = {
  Account: ['Manage Profile', 'Passwords & Security', 'Notifications', 'Language'],
  Preferences: ['About Us', 'Theme', 'Help Center', 'Contact Us'],
}

/** Figma "Frame 1410103912" (Privacy) 1646:13422. Rows: hover only, no links. */
export function Privacy() {
  const go = useGo()
  return (
    <Screen className="pr">
      <div className="pv-content">
        <button type="button" className="pv-back" aria-label="Back" onClick={() => go('/profile', 'smart')}>
          <img src={roundBack} alt="" />
        </button>
        <div className="pv-body">
          <h1 className="pv-title">Privacy</h1>
          {Object.entries(PRIVACY).map(([section, rows]) => (
            <div className="pv-section" key={section}>
              <h2 className="pv-heading">{section}</h2>
              <div className="pv-rows">
                {rows.map((row) => (
                  <div className="pv-row" key={row}>
                    <span>{row}</span>
                    <img src={chevron} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
=======
/* ------------------------------------------------------------------ */
/* Health info (1646:13208) and Edit Health Stats (1646:13446)         */
/* ------------------------------------------------------------------ */

const RINGS = [
  { label: 'carbs', pct: '50%', arc: ringCarbs, box: [31, 60], img: { left: 0, top: 0, width: 31, height: 59.716 }, text: [14, 16.77], track: 0.3, width: 59.572 },
  { label: 'protein', pct: '68%', arc: ringProtein, box: [50.473, 59.574], img: { left: 1.125, top: 0, width: 49.345, height: 59.571 }, text: [13.43, 17.55], track: 0, width: 59.575 },
  { label: 'fat', pct: '96%', arc: ringFat, box: [59.574, 59.574], img: { left: 0, top: 0.137, width: 59.573, height: 59.434 }, text: [15.85, 16.55], track: 0, width: 58 },
]

const TILES = [
  { label: 'BP', icon: bpMask, value: [['120/80 ', true], ['mmHg', false]] },
  { label: 'Water', icon: waterMask, value: [['3,700', true], [' ml ', false]] },
  { label: 'Heart Rate', icon: heartMask, value: [['83', true], [' bmp', false]] },
  { label: 'Sleep', icon: sleepMask, value: [['7', true], ['h ', false], ['43', true], ['m', false]], chevron: tileChevronB },
]

export function HealthInfo() {
  const go = useGo()
  return (
    <Screen className="pf">
      <div className="pf-health">
        <div className="pf-health__top">
          <RoundButton src={backRound} label="Back" onClick={() => go('/profile', 'smart')} />
          <RoundButton src={editRound} label="Edit health stats" onClick={() => go('/profile/health/edit', 'smart')} />
        </div>
        <div className="pf-health__body">
          <h1 className="pf-title">Health Information</h1>
          <h2 className="pf-subtitle">Basic Information</h2>
          <div className="pf-tags">
            {['23 years', 'Male', '168lbs', '6ft3”'].map((t) => (
              <span className="pf-tag" key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className="pf-panel pf-panel--calories">
            <p className="pf-panel__label">Daily Calories</p>
            <p className="pf-kcal">
              <span>1285</span>
              <span className="pf-kcal__unit">kcal</span>
            </p>
            <div className="pf-cal-bar">
              <div className="pf-cal-bar__track">
                <div className="pf-cal-bar__fill" />
              </div>
              <div className="pf-cal-bar__labels">
                <span>0</span>
                <span>3000</span>
              </div>
            </div>
            <div className="pf-rings">
              {RINGS.map((r) => (
                <div className="pf-ring" key={r.label} style={{ width: r.width }}>
                  <div className="pf-ring__chart">
                    <img className="pf-ring__track" src={ringTrack} alt="" style={{ top: r.track }} />
                    <span className="pf-ring__pct" style={{ left: r.text[0], top: r.text[1] }}>
                      {r.pct}
                    </span>
                    <span className="pf-ring__arc" style={{ width: r.box[0], height: r.box[1] }}>
                      <img src={r.arc} alt="" style={r.img} />
                    </span>
                  </div>
                  <span className="pf-ring__label">{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pf-panel pf-panel--steps">
            <div className="pf-steps-head">
              <p className="pf-steps-head__eyebrow">TOTAL</p>
              <p className="pf-steps-head__value">
                <span>2,648</span>
                <span className="pf-steps-head__unit">steps</span>
              </p>
              <p className="pf-steps-head__sub">Today</p>
            </div>
            <div className="pf-steps-chart">
              {[20, 56, 92].map((top) => (
                <img key={top} className="pf-steps-chart__line" src={dashLine} alt="" style={{ top: top - 1 }} />
              ))}
              <div className="pf-steps-chart__bars">
                <span style={{ height: 34 }} />
                <span style={{ height: 34 }} />
                <span className="pf-steps-chart__bar--peak" style={{ height: 92 }} />
              </div>
              <span className="pf-steps-chart__y" style={{ top: 11 }}>
                20,000
              </span>
              <span className="pf-steps-chart__y" style={{ top: 46 }}>
                5000
              </span>
              <span className="pf-steps-chart__y" style={{ top: 81 }}>
                0
              </span>
              <div className="pf-steps-chart__x">
                <span>12AM</span>
                <span>6</span>
                <span>12</span>
                <span className="pf-steps-chart__x-last">6</span>
              </div>
            </div>
          </div>

          <div className="pf-panel pf-panel--steps">
            <div className="pf-activity-head">
              <p className="pf-activity-head__title">Monthly Activity</p>
              <p className="pf-activity-head__sub">You are very active this month</p>
            </div>
            <div className="pf-activity">
              <img className="pf-activity__mark" src={activityMark} alt="" />
              <img className="pf-activity__chart" src={activityChart} alt="" />
              <div className="pf-activity__x">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>
          </div>

          <div className="pf-tiles">
            {TILES.map((t) => (
              <div className="pf-tile" key={t.label}>
                <div className="pf-tile__text">
                  <p className="pf-tile__label">
                    <MaskIcon src={t.icon} size={20} color="#b9b9b9" />
                    <span>{t.label}</span>
                  </p>
                  <p className="pf-tile__value">
                    {t.value.map(([text, bold], i) => (
                      <span key={i} className={bold ? 'pf-tile__bold' : undefined}>
                        {text}
                      </span>
                    ))}
                  </p>
                </div>
                <img className="pf-tile__chev" src={t.chevron || tileChevron} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

const STATS = [
  ['Age', '23'],
  ['Weight', '186lbs'],
  ['Height', '6ft3”t'],
  ['Calories Goal', '3000'],
]

export function EditHealth() {
  const go = useGo()
  return (
    <Screen className="pf pf--app-grey">
      <div className="pf-edit">
        <div className="pf-edit__top">
          <BackButton onClick={() => go('/profile/health', 'smart')} />
          <button type="button" className="back-btn" aria-label="Done" onClick={() => go('/profile/health', 'smart')}>
            <img className="pf-edit__done" src={doneIcon} alt="" />
          </button>
        </div>
        <div className="pf-edit__body">
          <h1 className="pf-title pf-title--dark">Edit Health Stats</h1>
          <div className="pf-edit__rows">
            <div className="pf-stat-row">
              <span>Gender</span>
              <span className="pf-stat-row__gender">
                <strong>Female</strong>
                <span className="pf-stat-row__chev">
                  <img src={chevronDown} alt="" />
                </span>
              </span>
            </div>
            {STATS.map(([label, value]) => (
              <div className="pf-stat-row" key={label}>
                <span>{label}</span>
                <span className="pf-stat-row__value">
                  <strong>{value}</strong>
                  <img src={pencil} alt="" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

/* ------------------------------------------------------------------ */
/* Friends (1646:13323) and the two search screens (2234:4055, 2136:3603) */
/* ------------------------------------------------------------------ */

const FRIENDS = [
  ['Amber Kenz', listAmber, 66],
  ['Eli Eifler', listEli, 66],
  ['Sam Eifler', listSam, 66],
  ['Owen Interino', listOwen, 64],
  ['Natalia Wang', listNatalia, 67],
]

function PersonRow({ photo, name, sub, action, gap = 71, spread = false }) {
  return (
    <div className={spread ? 'pf-person pf-person--spread' : 'pf-person'} style={spread ? undefined : { gap }}>
      <div className="pf-person__who">
        <img src={photo} alt="" />
        <div className="pf-person__text">
          <p className="pf-person__name">{name}</p>
          <p className="pf-person__sub">{sub}</p>
        </div>
      </div>
      <button type="button" className={action === 'Add' ? 'pf-chip pf-chip--add' : 'pf-chip'}>
        {action}
      </button>
    </div>
  )
}

export function Friends() {
  const go = useGo()
  return (
    <Screen className="pf" fixed={<NavBar />}>
      <div className="pf-friends">
        <BackButton onClick={() => go('/profile', 'smart')} />
        <div className="pf-friends__col">
          <h1 className="pf-title pf-title--semibold pf-friends__title">Friend list</h1>
          <div className="pf-friends__search">
            <button type="button" className="pf-search-btn" onClick={() => go('/profile/friends/search')}>
              <SearchField />
            </button>
            <button type="button" className="pf-add-link" onClick={() => go('/profile/friends/add')}>
              add friends
            </button>
          </div>
          <div className="pf-people">
            {FRIENDS.map(([name, photo, gap]) => (
              <PersonRow key={name} photo={photo} name={name} sub="Friends since 2017" action="View" gap={gap} />
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}

function SearchScreen({ title, people }) {
  const go = useGo()
  return (
    <Screen
      className="pf"
      fixed={
        <div className="pf-keyboard">
          <img src={keyboard} alt="" />
        </div>
      }
    >
      <div className="pf-results-bg" />
      <div className="pf-friends">
        <BackButton onClick={() => go('/profile/friends')} />
        <div className="pf-friends__col pf-friends__col--search">
          <h1 className="pf-title pf-title--semibold pf-friends__title pf-friends__title--fixed">{title}</h1>
          <SearchField value="Joanna B|" />
          <div className="pf-people">{people}</div>
        </div>
      </div>
      <img className="pf-results-divider" src={searchDivider} alt="" />
    </Screen>
  )
}

/** Figma "Add" (2234:4055): search results within the friend list. */
export function FriendSearch() {
  return (
    <SearchScreen
      title="Friend List"
      people={
        <>
          <PersonRow photo={search1} name="Christopher Nolan" sub="Friends since 2022" action="View" spread />
          <PersonRow photo={search2} name="Miley Cyrus" sub="Friends since 2025" action="View" />
          <PersonRow photo={search3} name="Bob Dylan" sub="Friends since 2025" action="View" />
        </>
      }
    />
  )
}

/** Figma "Add" (2136:3603): add new friends. */
export function FriendAdd() {
  return (
    <SearchScreen
      title="Add friends"
      people={
        <>
          <PersonRow photo={search1} name="Joanna Brown" sub=">3 years of experience" action="Add" spread />
          <PersonRow photo={search2} name="Joanne Blue" sub=">5 years experience" action="Add" />
          <PersonRow photo={search3} name="John Bo" sub="<1 year experience" action="Add" />
        </>
      }
    />
  )
}

/* ------------------------------------------------------------------ */
/* Completed hikes (1767:8813) and Favourited (1673:3790)              */
/* ------------------------------------------------------------------ */

const WITH = { friends: true, friendsText: 'With Siena & Mark', avatars: [with1, with2, with3], plainDots: true, saved: true }

const GROUSE = {
  image: grouseGrind,
  date: 'July 25, 2025',
  tag: 'MODERATE • ARDUOUS',
  title: 'Grouse Grind',
  location: 'North Van, BC',
  rating: '4.3 (375)',
  stats: [['1.9', 'KM'], ['780', 'M ELEV'], ['7-9', 'HOURS']],
}

const RECENT = [
  {
    image: everest,
    date: 'June 20, 2025',
    tag: 'DIFFICULT • SLOPE',
    title: 'Mt. Everest',
    location: 'Kathmandu, NPL',
    rating: '5.0 (303)',
    stats: [['130', 'KM'], ['5,545', 'M ELEV'], ['12-18', 'AYS']],
  },
  GROUSE,
]

const FAVOURITES = [
  {
    image: saintMark,
    date: 'Dec 12, 2026',
    tag: 'MODERATE • FLAT',
    title: 'Saint Mark Summit',
    location: 'West Van, BC',
    rating: '4.8 (215)',
    stats: [['10', 'KM'], ['570', 'M ELEV'], ['7-9', 'HOURS']],
  },
  GROUSE,
]

/**
 * Figma "Component 5": pressing the other side slides the green segment
 * (300ms), then the screen switches 100ms later with a smart animate.
 */
function HikeToggle({ value }) {
  const go = useGo()
  const [selected, setSelected] = useState(value)
  useEffect(() => {
    if (selected === value) return undefined
    const timer = setTimeout(() => go(selected === 'fav' ? '/profile/hikes/favourites' : '/profile/hikes', 'smart'), 400)
    return () => clearTimeout(timer)
  }, [selected, value, go])
  return (
    <div className="pf-toggle">
      <span className={selected === 'fav' ? 'pf-toggle__pill pf-toggle__pill--right' : 'pf-toggle__pill'} />
      <button
        type="button"
        className={selected === 'recent' ? 'pf-toggle__label pf-toggle__label--on' : 'pf-toggle__label'}
        style={{ left: 61 }}
        onPointerDown={() => setSelected('recent')}
      >
        Recent
      </button>
      <button
        type="button"
        className={selected === 'fav' ? 'pf-toggle__label pf-toggle__label--on' : 'pf-toggle__label'}
        style={{ left: 224 }}
        onPointerDown={() => setSelected('fav')}
      >
        Favourited
      </button>
    </div>
  )
}

function HikesScreen({ tab }) {
  const go = useGo()
  const hikes = tab === 'fav' ? FAVOURITES : RECENT
  return (
    <Screen className="pf" fixed={<NavBar />}>
      <div className="pf-hikes">
        <BackButton dark onClick={() => go('/profile', tab === 'fav' ? 'smart' : undefined)} />
        <div className="pf-hikes__header">
          <h1 className="pf-title">Completed hikes</h1>
          <img src={homeAvatar} alt="" />
        </div>
        <HikeToggle value={tab} />
        <div className="pf-hikes__search">
          <SearchField placeholder="Search hikes" />
          <div className="pf-sort">
            <span>Sort: Difficulty</span>
            <img src={chevDown} alt="" />
          </div>
        </div>
        <p className="pf-hikes__section">Training journeys</p>
        {hikes.map((hike) => (
          <div className="pf-hikes__card" key={hike.title}>
            <HikeCard {...hike} {...WITH} />
          </div>
        ))}
      </div>
    </Screen>
  )
}

export function CompletedHikes() {
  return <HikesScreen tab="recent" />
}

export function FavouriteHikes() {
  return <HikesScreen tab="fav" />
}

/* ------------------------------------------------------------------ */
/* Privacy (1646:13422)                                                */
/* ------------------------------------------------------------------ */

function PrivacyRow({ children }) {
  return (
    <div className="pf-priv">
      <span>{children}</span>
      <span className="pf-priv__chev">
        <img src={rowChevron} alt="" />
      </span>
    </div>
  )
}

export function Privacy() {
  const go = useGo()
  return (
    <Screen className="pf">
      <div className="pf-privacy">
        <RoundButton src={backRound} label="Back" onClick={() => go('/profile', 'smart')} />
        <div className="pf-privacy__body">
          <div className="pf-privacy__head">
            <h1 className="pf-title pf-title--dark">Privacy</h1>
            <h2 className="pf-subtitle">Account</h2>
          </div>
          <div className="pf-privacy__rows">
            {['Manage Profile', 'Passwords & Security', 'Notifications', 'Language'].map((r) => (
              <PrivacyRow key={r}>{r}</PrivacyRow>
            ))}
          </div>
          <h2 className="pf-subtitle">Preferences</h2>
          <div className="pf-privacy__rows">
            {['About Us', 'Theme', 'Help Center', 'Contact Us'].map((r) => (
              <PrivacyRow key={r}>{r}</PrivacyRow>
            ))}
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </Screen>
  )
}

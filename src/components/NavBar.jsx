import { useLocation } from 'react-router-dom'
import useGo from '../app/useGo.js'
import homeIcon from '../assets/nav/home.svg'
import homeIconHover from '../assets/nav/home-hover.svg'
import createIcon from '../assets/nav/create.svg'
import createIconHover from '../assets/nav/create-hover.svg'
import profileIcon from '../assets/nav/profile.svg'
import profileIconHover from '../assets/nav/profile-hover.svg'
import ProgressiveBlur from './ProgressiveBlur.jsx'
import './NavBar.css'

/**
 * Figma "Nav Bar" (402 x 202, pinned to the bottom of a screen).
 * Each button shows its hover variant on hover and navigates on click:
 * Home → Home (Saved), Create → New training, Profile → Profile.
 */
// Which tab is "current": the page each button opens (and the pages inside it).
const TABS = { home: /^\/home/, create: /^\/new-training/, profile: /^\/profile/ }

export default function NavBar() {
  const go = useGo()
  const { pathname } = useLocation()
  const cls = (tab) => `navbar__btn navbar__btn--${tab}${TABS[tab].test(pathname) ? ' navbar__btn--current' : ''}`
  const current = (tab) => (TABS[tab].test(pathname) ? 'page' : undefined)
  return (
    <nav className="navbar" aria-label="Main">
      <ProgressiveBlur />
      <div className="navbar__pill" />
      <button type="button" className={cls('home')} aria-current={current('home')} aria-label="Home" onClick={() => go('/home/training')}>
        <span className="navbar__home-bg" />
        <img className="navbar__icon navbar__icon--home navbar__icon--default" src={homeIcon} alt="" />
        <img className="navbar__icon navbar__icon--home navbar__icon--hover" src={homeIconHover} alt="" />
      </button>
      <button type="button" className={cls('create')} aria-current={current('create')} aria-label="Create new training" onClick={() => go('/new-training')}>
        <img className="navbar__icon navbar__icon--default" src={createIcon} alt="" />
        <img className="navbar__icon navbar__icon--hover" src={createIconHover} alt="" />
      </button>
      <button type="button" className={cls('profile')} aria-current={current('profile')} aria-label="Profile" onClick={() => go('/profile')}>
        <img className="navbar__icon navbar__icon--default" src={profileIcon} alt="" />
        <img className="navbar__icon navbar__icon--hover" src={profileIconHover} alt="" />
      </button>
    </nav>
  )
}

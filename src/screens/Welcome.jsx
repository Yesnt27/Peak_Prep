import useGo from '../app/useGo.js'
import Button from '../components/Button.jsx'
import './Welcome.css'

/** Figma "sign up/login". */
export default function Welcome() {
  const go = useGo()
  return (
    <div className="screen welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">
          <span className="welcome__title-lead">Welcome to </span>
          <span className="welcome__title-brand">PeakPrep</span>
        </h1>
        <div className="welcome__actions">
          <Button variant="yellow" onClick={() => go('/home/saved')}>
            Sign In
          </Button>
          <Button variant="green" onClick={() => go('/onboarding/welcome')}>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}

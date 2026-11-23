import useGo from '../app/useGo.js'
import Button from '../components/Button.jsx'
import { logIn, signUp } from '../app/account.js'
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
          {/* Log In = the demo account (Hudson Kemp); Create Account = a new, empty account. */}
          <Button
            variant="yellow"
            onClick={() => {
              logIn()
              go('/home/training')
            }}
          >
            Log In
          </Button>
          <Button
            variant="green"
            onClick={() => {
              signUp()
              go('/onboarding/welcome')
            }}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}

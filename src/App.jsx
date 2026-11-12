import { Route } from 'react-router-dom'
import Device from './app/Device.jsx'
import AnimatedRoutes from './app/AnimatedRoutes.jsx'
import Splash from './screens/Splash.jsx'
import Welcome from './screens/Welcome.jsx'
import Home from './screens/home/Home.jsx'
import {
  OnboardingActivity,
  OnboardingExperience,
  OnboardingHealth,
  OnboardingSafety,
  OnboardingWelcome,
} from './screens/onboarding/Onboarding.jsx'

export default function App() {
  return (
    <Device>
      <AnimatedRoutes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/onboarding/welcome" element={<OnboardingWelcome />} />
        <Route path="/onboarding/experience" element={<OnboardingExperience />} />
        <Route path="/onboarding/activity" element={<OnboardingActivity />} />
        <Route path="/onboarding/health" element={<OnboardingHealth />} />
        <Route path="/onboarding/safety" element={<OnboardingSafety />} />

        <Route path="/home/:tab" element={<Home />} />
      </AnimatedRoutes>
    </Device>
  )
}

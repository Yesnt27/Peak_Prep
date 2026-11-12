import { Route } from 'react-router-dom'
import Device from './app/Device.jsx'
import AnimatedRoutes from './app/AnimatedRoutes.jsx'
import Splash from './screens/Splash.jsx'
import Welcome from './screens/Welcome.jsx'
import Home from './screens/home/Home.jsx'
import HikeDetails from './screens/hike/HikeDetails.jsx'
import TrainingOverview from './screens/hike/TrainingOverview.jsx'
import { PackingEdit, PackingList } from './screens/packing/Packing.jsx'
import {
  Correct,
  FirstAidModule,
  GetCertified,
  HeatExposure,
  LegalSide,
  Practice,
} from './screens/first-aid/FirstAid.jsx'
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
        <Route path="/hike" element={<HikeDetails />} />
        <Route path="/training" element={<TrainingOverview />} />
        <Route path="/packing/all" element={<PackingList key="all" tab="all" />} />
        <Route path="/packing/to-pack" element={<PackingList key="to-pack" tab="to-pack" />} />
        <Route path="/packing/packed" element={<PackingList key="packed" tab="packed" />} />
        <Route path="/packing/edit" element={<PackingEdit />} />

        <Route path="/first-aid" element={<FirstAidModule />} />
        <Route path="/first-aid/heat" element={<HeatExposure />} />
        <Route path="/first-aid/practice" element={<Practice />} />
        <Route path="/first-aid/correct" element={<Correct />} />
        <Route path="/first-aid/legal" element={<LegalSide />} />
        <Route path="/first-aid/certified" element={<GetCertified />} />
      </AnimatedRoutes>
    </Device>
  )
}

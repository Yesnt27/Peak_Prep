import Exercise from './screens/hike/Exercise.jsx'
import ManageProfile from './screens/profile/ManageProfile.jsx'
import { Navigate, Route } from 'react-router-dom'
import Device from './app/Device.jsx'
import AnimatedRoutes from './app/AnimatedRoutes.jsx'
import Splash from './screens/Splash.jsx'
import Welcome from './screens/Welcome.jsx'
import Home from './screens/home/Home.jsx'
import HikeDetails from './screens/hike/HikeDetails.jsx'
import TrainingOverview from './screens/hike/TrainingOverview.jsx'
import TrainingSchedule from './screens/hike/TrainingSchedule.jsx'
import { PackingEdit, PackingList } from './screens/packing/Packing.jsx'
import { FirstAidModule, LessonIntro } from './screens/first-aid/Module.jsx'
import { Practice } from './screens/first-aid/Practice.jsx'
import { LessonComplete } from './screens/first-aid/Result.jsx'
import { GetCertified, LegalSide } from './screens/first-aid/Resources.jsx'
import {
  Congrats,
  Difficulty,
  EmergencyPrep,
  GeneralNotes,
  LogDetails,
  PhysicalPrep,
  ReviewDetails,
} from './screens/hiker-log/HikerLog.jsx'
import {
  Goal,
  HikeDate,
  Schedule,
  TargetHike,
  TripType,
  WhosComing,
  LevelHikes,
} from './screens/new-training/NewTraining.jsx'
import Profile, { ConnectedApps, Settings } from './screens/profile/Profile.jsx'
import { AddFriends, FriendList } from './screens/profile/Friends.jsx'
import FriendProfile from './screens/profile/FriendProfile.jsx'
import CompletedHikes from './screens/profile/Completed.jsx'
import { HealthInfo } from './screens/profile/Health.jsx'
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
        <Route path="/hike/:id" element={<HikeDetails />} />
        <Route path="/training" element={<TrainingOverview />} />
        <Route path="/training/schedule" element={<TrainingSchedule />} />
        <Route path="/training/exercise/:id" element={<Exercise />} />
        <Route path="/packing/all" element={<PackingList key="all" tab="all" />} />
        <Route path="/packing" element={<Navigate to="/packing/to-pack" replace />} />
        <Route path="/packing/to-pack" element={<PackingList key="to-pack" tab="to-pack" />} />
        <Route path="/packing/packed" element={<PackingList key="packed" tab="packed" />} />
        <Route path="/packing/edit" element={<PackingEdit />} />

        <Route path="/first-aid" element={<FirstAidModule />} />
        <Route path="/first-aid/legal" element={<LegalSide />} />
        <Route path="/first-aid/certified" element={<GetCertified />} />
        {/* Every lesson: intro → practice (one scenario at a time) → results. */}
        <Route path="/first-aid/:lesson" element={<LessonIntro />} />
        <Route path="/first-aid/:lesson/practice" element={<Practice />} />
        <Route path="/first-aid/:lesson/complete" element={<LessonComplete />} />
        {/* Old Heat Exposure links. */}
        <Route path="/first-aid/practice" element={<Navigate to="/first-aid/heat/practice" replace />} />
        <Route path="/first-aid/correct" element={<Navigate to="/first-aid/heat/complete" replace />} />

        <Route path="/log/congrats" element={<Congrats />} />
        <Route path="/log/details" element={<LogDetails />} />
        <Route path="/log/difficulty" element={<Difficulty />} />
        <Route path="/log/emergency" element={<EmergencyPrep />} />
        <Route path="/log/physical" element={<PhysicalPrep />} />
        <Route path="/log/notes" element={<GeneralNotes />} />
        <Route path="/log/review" element={<ReviewDetails />} />

        <Route path="/new-training" element={<TargetHike />} />
        <Route path="/new-training/level" element={<LevelHikes />} />
        <Route path="/new-training/date" element={<HikeDate />} />
        <Route path="/new-training/trip" element={<TripType />} />
        <Route path="/new-training/who" element={<WhosComing />} />
        <Route path="/new-training/goal" element={<Goal />} />
        <Route path="/new-training/schedule" element={<Schedule />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/settings/apps" element={<ConnectedApps />} />
        <Route path="/profile/settings/profile" element={<ManageProfile />} />
        <Route path="/profile/health" element={<HealthInfo />} />
        <Route path="/profile/health/edit" element={<Navigate to="/profile/health" replace />} />
        <Route path="/profile/friends" element={<FriendList />} />
        <Route path="/profile/friends/add" element={<AddFriends />} />
        <Route path="/profile/friends/search" element={<Navigate to="/profile/friends" replace />} />
        <Route path="/profile/friends/:id" element={<FriendProfile />} />
        <Route path="/profile/completed" element={<CompletedHikes key="recent" tab="recent" />} />
        <Route path="/profile/completed/favourited" element={<CompletedHikes key="fav" tab="favourited" />} />
        <Route path="/profile/privacy" element={<Navigate to="/profile/settings" replace />} />
      </AnimatedRoutes>
    </Device>
  )
}

import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import useGo from '../../app/useGo.js'
import { toggleLike, useAccount } from '../../app/account.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
import { HIKES } from '../../data/hikes.js'
import { HIKE_DETAILS } from '../../data/hikeDetails.js'
import { PHOTO_CREDITS } from '../../data/photoCredits.js'
import { Chip, HikeHero, KeyStats, SectionHeader } from './parts.jsx'
import ElevationChart from './ElevationChart.jsx'
import { Challenges, Collapsible, FitForYou, Hazards } from './HikeSections.jsx'
import mtn20 from '../../assets/hike/mtn-20.svg'
import shield20 from '../../assets/hike/shield-20.svg'
import alertIcon from '../../assets/hike/alert.svg'
import heartFilled from '../../assets/hike/heart-filled.svg'
import heartOutline from '../../assets/icons/heart-outline.svg'
import './HikeDetails.css'

const titleCase = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())
// Hikes the demo account (Hudson) has saved, matching Home → Saved.
const DEMO_LIKED = ['panorama', 'blackTusk', 'brunswick']

/** Figma "Hike Details (hifi)" 1780:3160, for every hike: /hike/:id (/hike = Brunswick). */
export default function HikeDetails() {
  const go = useGo()
  const id = useParams().id ?? 'brunswick'
  const hike = HIKES[id]
  const d = HIKE_DETAILS[id]
  const account = useAccount()
  const isNew = account.type === 'new'
  const [ownLiked, setOwnLiked] = useState(DEMO_LIKED.includes(id))
  const [aboutOpen, setAboutOpen] = useState(false)
  if (!hike || !d) return <Navigate to="/home/explore" replace />

  const liked = isNew ? account.liked.includes(id) : ownLiked
  const [difficulty, type] = hike.tag.split(' • ').map(titleCase)
  const [km, elev, time] = hike.stats
  // Start Preparation: your existing plan if you're training for this hike, otherwise the Create flow with it picked.
  const training = isNew ? account.training?.hike === id : id === 'brunswick'
  const start = () => go(training ? '/training' : `/new-training?hike=${id}`, 'smart')
  // Back to wherever the hike was opened from.
  const back = () => (window.history.state?.idx > 0 ? window.history.back() : go('/home/saved'))
  const credits = hike.photos.map((src) => Object.entries(PHOTO_CREDITS).find(([f]) => src.includes(f.replace('.jpg', '')))?.[1]).filter(Boolean)

  return (
    <Screen
      className="hd"
      fixed={
        <div className="hd-footer">
          <div className="hd-footer__blur">
            <ProgressiveBlur />
          </div>
          <div className="hd-footer__pill" />
          <Button className="hd-footer__cta" onClick={start}>
            {training ? 'View Training Plan' : 'Start Preparation'}
          </Button>
          <button
            type="button"
            className="hd-footer__fav"
            aria-pressed={liked}
            aria-label={liked ? 'Unlike' : 'Like'}
            onClick={() => (isNew ? toggleLike(id) : setOwnLiked(!liked))}
          >
            <img src={liked ? heartFilled : heartOutline} alt="" />
          </button>
        </div>
      }
    >
      <HikeHero
        hike={hike}
        // "Siena & 3 friends training" on every hike's banner (a new account sees it once it has friends).
        friends={!isNew || (account.friends ?? []).length > 0}
        onBack={back}
        chips={
          <>
            <Chip tone="yellow-1">{difficulty}</Chip>
            {type && <Chip>{type}</Chip>}
            <Chip>★ {hike.rating}</Chip>
          </>
        }
      />
      <div className="hd-content">
        <KeyStats
          stats={[
            [km[0], 'km', 'distance'],
            [elev[0], 'm', id === 'everest' ? 'highest point' : 'elevation gain'],
            [time[0], time[1] === 'DAYS' ? 'days' : 'hrs', 'est. time'],
          ]}
        />

        <section className="hd-section">
          <SectionHeader icon={mtn20} title="About this hike" />
          {/* Two lines until tapped, then the whole paragraph. */}
          <button
            type="button"
            className={aboutOpen ? 'hd-about hd-about--open' : 'hd-about'}
            aria-expanded={aboutOpen}
            onClick={() => setAboutOpen(!aboutOpen)}
          >
            {d.about}
          </button>
          <div className="hd-elev">
            <div className="hd-elev__head">
              <p className="hd-elev__title">Elevation profile</p>
              <p className="hd-elev__summit">Summit {d.summit.m.toLocaleString('en-US')} m</p>
            </div>
            <ElevationChart profile={d.profile} summit={d.summit} totalKm={km[0]} signalKm={d.signalKm} />
            <p className="hd-elev__note">- - -  {d.signal}</p>
          </div>
        </section>

        <FitForYou hike={hike} details={d} isNew={isNew} />

        <Collapsible icon={shield20} title="Hazards & logistics">
          <Hazards details={d} />
        </Collapsible>

        <Collapsible icon={alertIcon} title="Trail challenges">
          <Challenges items={d.challenges} />
        </Collapsible>

        <div className="hd-ready">
          <p className="hd-ready__title">Get trail-ready in {d.weeks} weeks</p>
          <p className="hd-ready__body">
            A training plan, packing list and safety lessons built for this hike, around your current fitness.
          </p>
        </div>

        {credits.length > 0 && (
          <p className="hd-credits">
            Photos:{' '}
            {credits.map((c, i) => (
              <span key={c.source}>
                {i > 0 && ' · '}
                <a href={c.source} target="_blank" rel="noreferrer">
                  {c.artist}
                </a>{' '}
                ({c.license})
              </span>
            ))}
            , via Wikimedia Commons.
          </p>
        )}
      </div>
    </Screen>
  )
}

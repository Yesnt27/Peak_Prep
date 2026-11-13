import useGo from '../../app/useGo.js'
import Screen from '../../components/Screen.jsx'
import Button from '../../components/Button.jsx'
<<<<<<< Updated upstream
import { Chip, HikeHero, KeyStats, SectionHeader } from './parts.jsx'
=======
import ProgressiveBlur from '../../components/ProgressiveBlur.jsx'
import HikeHero, { Chip, KeyStats, SectionHead } from '../../components/HikeHero.jsx'
import heartFilled from '../../assets/icons/heart-filled.svg'
>>>>>>> Stashed changes
import mtn20 from '../../assets/hike/mtn-20.svg'
import mtn18 from '../../assets/hike/mtn-18.svg'
import chartArea from '../../assets/hike/chart-area.svg'
import chartLine from '../../assets/hike/chart-line.svg'
import chartMarker from '../../assets/hike/chart-marker.svg'
import chartSummit from '../../assets/hike/chart-summit.svg'
import gauge20 from '../../assets/hike/gauge-20.svg'
import gauge18 from '../../assets/hike/gauge-18.svg'
import clockIcon from '../../assets/hike/clock.svg'
import sunriseIcon from '../../assets/hike/sunrise.svg'
import shield20 from '../../assets/hike/shield-20.svg'
import shield16 from '../../assets/hike/shield-16.svg'
import pawIcon from '../../assets/hike/paw.svg'
import ticketIcon from '../../assets/hike/ticket.svg'
import carIcon from '../../assets/hike/car.svg'
import extIcon from '../../assets/hike/ext.svg'
import phoneIcon from '../../assets/hike/phone.svg'
import alertIcon from '../../assets/hike/alert.svg'
import sunIcon from '../../assets/hike/sun.svg'
import nosigIcon from '../../assets/hike/nosig.svg'
import dropIcon from '../../assets/hike/drop.svg'
<<<<<<< Updated upstream
import heartFilled from '../../assets/hike/heart-filled.svg'
import './HikeDetails.css'

/** Flagged trail challenge row (white card, pale-yellow icon + chip). */
function Challenge({ icon, title, chip, children }) {
  return (
    <div className="hd-flag">
      <span className="hd-icon hd-icon--36 hd-icon--yellow-3">
        <img src={icon} alt="" />
      </span>
      <div className="hd-flag__text">
        <div className="hd-flag__head">
          <p className="hd-flag__title">{title}</p>
          <Chip tone="yellow-3">{chip}</Chip>
        </div>
        <p className="hd-flag__body">{children}</p>
      </div>
    </div>
  )
}

function LinkRow({ icon, title, sub }) {
  return (
    <div className="hd-link">
      <span className="hd-icon hd-icon--32 hd-icon--light-green">
        <img src={icon} alt="" />
      </span>
      <div className="hd-link__text">
        <p className="hd-link__title">{title}</p>
        <p className="hd-link__sub">{sub}</p>
      </div>
      <img className="hd-link__ext" src={extIcon} alt="" />
    </div>
  )
}

function Bar({ label, value, remaining }) {
  return (
    <div className="hd-bar">
      <div className="hd-bar__head">
=======
import './HikeDetails.css'

function Bar({ label, value, remaining }) {
  return (
    <div className="hd-bar">
      <div className="hd-bar__row">
>>>>>>> Stashed changes
        <p className="hd-bar__label">{label}</p>
        <p className="hd-bar__value">{value}</p>
      </div>
      <div className="hd-bar__track" style={{ paddingRight: remaining }}>
        <div className="hd-bar__fill" />
      </div>
    </div>
  )
}

<<<<<<< Updated upstream
/** Figma "Hike Details (hifi)" 1780:3160. */
=======
function IconCircle({ icon, size = 36, bg }) {
  return (
    <span className="hd-icon" style={{ width: size, height: size, borderRadius: size / 2, background: bg }}>
      <img src={icon} alt="" style={{ width: size / 2, height: size / 2 }} />
    </span>
  )
}

function Flag({ icon, iconBg, title, chip, chipTone, text, className = '' }) {
  return (
    <div className={`hd-flag ${className}`}>
      <IconCircle icon={icon} bg={iconBg} />
      <div className="hd-flag__body">
        <div className="hd-flag__top">
          <p className="hd-flag__title">{title}</p>
          <Chip tone={chipTone}>{chip}</Chip>
        </div>
        <p className="hd-flag__text">{text}</p>
      </div>
    </div>
  )
}

function Tile({ icon, iconBg, eyebrow, title, text, className = '' }) {
  return (
    <div className={`hd-tile ${className}`}>
      <IconCircle icon={icon} size={32} bg={iconBg} />
      {eyebrow && <p className="hd-tile__eyebrow">{eyebrow}</p>}
      <p className={eyebrow ? 'hd-tile__value' : 'hd-tile__title'}>{title}</p>
      <p className={eyebrow ? 'hd-tile__note' : 'hd-tile__text'}>{text}</p>
    </div>
  )
}

function LinkRow({ icon, title, text }) {
  return (
    <div className="hd-link">
      <IconCircle icon={icon} size={32} bg="var(--light-green)" />
      <div className="hd-link__body">
        <p className="hd-link__title">{title}</p>
        <p className="hd-link__text">{text}</p>
      </div>
      <img className="hd-link__ext" src={extIcon} alt="" />
    </div>
  )
}

/** Figma "Hike Details (hifi)" (1780:3160). */
>>>>>>> Stashed changes
export default function HikeDetails() {
  const go = useGo()
  return (
    <Screen
      className="hd"
      fixed={
<<<<<<< Updated upstream
        <div className="hd-footer">
          <div className="hd-footer__blur" />
          <div className="hd-footer__pill" />
          <Button className="hd-footer__cta" onClick={() => go('/first-aid/practice')}>
            Start Preperation
          </Button>
          {/* Figma "Fav button": both variants show the filled heart, so a click changes nothing visible. */}
          <button type="button" className="hd-footer__fav" aria-label="Favourite">
=======
        <div className="hd-bar-bottom">
          <ProgressiveBlur />
          <div className="hd-bar-bottom__pill" />
          <Button className="hd-bar-bottom__cta" onClick={() => go('/first-aid/practice')}>
            Start Preperation
          </Button>
          <button type="button" className="hd-bar-bottom__fav" aria-label="Saved">
>>>>>>> Stashed changes
            <img src={heartFilled} alt="" />
          </button>
        </div>
      }
    >
<<<<<<< Updated upstream
      <HikeHero
        onBack={() => go('/home/saved')}
        chips={
          <>
            <Chip tone="yellow-1">Hard</Chip>
            <Chip>Scramble</Chip>
            <Chip>★ 4.8 (498)</Chip>
          </>
        }
      />

      <div className="hd-content">
        <KeyStats
          stats={[
            ['14.3', 'km', 'distance'],
            ['1,539', 'm', 'elevation gain'],
            ['7–9', 'hrs', 'est. time'],
          ]}
        />

        <section className="hd-section">
          <SectionHeader icon={mtn20} title="About this hike" />
          <p className="hd-about">
            A steep out-and-back from Lions Bay to the highest peak on the Howe Sound Crest. Expect a long forested
            grind, open ridgelines and a short Class 3 scramble to the summit, with views across Howe Sound.
          </p>
          <div className="hd-elev">
            <div className="hd-elev__head">
              <p className="hd-elev__title">Elevation profile</p>
              <p className="hd-elev__summit">Summit 1,788 m</p>
            </div>
            <div className="hd-elev__chart">
              <img className="hd-elev__area" src={chartArea} alt="" />
              <img className="hd-elev__line" src={chartLine} alt="" />
              <img className="hd-elev__marker" src={chartMarker} alt="" />
              <img className="hd-elev__dot" src={chartSummit} alt="" />
            </div>
            <div className="hd-elev__axis">
              <p>0 km</p>
              <p>Summit · 7.2 km</p>
              <p>14.3 km</p>
            </div>
            <p className="hd-elev__note">- - -  No cell signal after KM 4.2</p>
          </div>
        </section>

        <section className="hd-section">
          <SectionHeader icon={gauge20} title="Fit for you">
            <Chip tone="yellow-1">Stretch goal</Chip>
          </SectionHeader>
          <div className="hd-gap">
            <div className="hd-gap__row">
              <span className="hd-icon hd-icon--36 hd-icon--white">
                <img src={gauge18} alt="" />
              </span>
              <div className="hd-gap__text">
                <p className="hd-gap__title">Readiness gap</p>
                <p className="hd-gap__body">
                  About 2.1× longer than your longest logged hike, with +813 m more elevation than your biggest climb
                  day.
                </p>
              </div>
            </div>
            <Bar label="DISTANCE" value="6.8 km logged / 14.3 km" remaining={154} />
            <Bar label="ELEVATION" value="726 m logged / 1,539 m" remaining={157} />
          </div>
          <div className="hd-pair">
            <div className="hd-tile hd-tile--yellow">
              <span className="hd-icon hd-icon--32 hd-icon--yellow-1">
                <img src={clockIcon} alt="" />
              </span>
              <p className="hd-tile__label">Your pace</p>
              <p className="hd-tile__value">6.5–8 hrs</p>
              <p className="hd-tile__sub">Based on your logged hikes</p>
            </div>
            <div className="hd-tile hd-tile--yellow">
              <span className="hd-icon hd-icon--32 hd-icon--yellow-1">
                <img src={sunriseIcon} alt="" />
              </span>
              <p className="hd-tile__label">Start by</p>
              <p className="hd-tile__value">07:15 AM</p>
              <p className="hd-tile__sub">Daylight margin for the descent</p>
            </div>
          </div>
        </section>

        <section className="hd-section">
          <SectionHeader icon={shield20} title="Hazards & logistics" />
          <div className="hd-flag hd-flag--wildlife">
            <span className="hd-icon hd-icon--36 hd-icon--yellow-2">
              <img src={pawIcon} alt="" />
            </span>
            <div className="hd-flag__text">
              <div className="hd-flag__head">
                <p className="hd-flag__title">Wildlife corridor</p>
                <Chip>Bear spray</Chip>
              </div>
              <p className="hd-flag__body">
                Active grizzly and black bear habitat in the sub-alpine meadows. Keep bear spray within reach.
              </p>
            </div>
          </div>
          <div className="hd-pair">
            <div className="hd-tile">
              <span className="hd-icon hd-icon--32 hd-icon--teal">
                <img src={ticketIcon} alt="" />
              </span>
              <p className="hd-tile__title">Pass required</p>
              <p className="hd-tile__body">BC Parks day-use pass needed in peak summer season.</p>
            </div>
            <div className="hd-tile">
              <span className="hd-icon hd-icon--32 hd-icon--teal">
                <img src={carIcon} alt="" />
              </span>
              <p className="hd-tile__title">Access &amp; parking</p>
              <p className="hd-tile__body">Lions Bay lot fills early. Arrive before 06:45 AM.</p>
            </div>
          </div>
          <LinkRow icon={shield16} title="BC Parks trail report" sub="Updated today at 06:30 AM" />
          <LinkRow icon={phoneIcon} title="Emergency services" sub="Search and rescue · call 911" />
        </section>

        <section className="hd-section">
          <SectionHeader icon={alertIcon} title="Trail challenges">
            <p className="hk-section__sub">3 flagged</p>
          </SectionHeader>
          <Challenge icon={sunIcon} title="Sun exposure" chip="High UV">
            Open alpine ridgelines with strong UV reflection and no shade.
          </Challenge>
          <Challenge icon={mtn18} title="Scramble" chip="Class 3">
            Class 3 knife-edge scramble near the summit. Helmet recommended.
          </Challenge>
          <Challenge icon={nosigIcon} title="Cell service limit" chip="Cutoff KM 4.2">
            No signal after the lower switchbacks. Carry a satellite messenger.
          </Challenge>
          <Challenge icon={dropIcon} title="Limited water" chip="Carry 3 L">
            No reliable water sources past the first creek crossing. Carry 3 L.
          </Challenge>
        </section>

        <div className="hd-ready">
          <p className="hd-ready__title">Get trail-ready in 6 weeks</p>
          <p className="hd-ready__body">
            A training plan, packing list and safety lessons built for this hike, around your current fitness.
          </p>
=======
      <div className="hd-page">
        <HikeHero
          onBack={() => go('/home/saved')}
          chips={
            <>
              <Chip tone="yellow">Hard</Chip>
              <Chip>Scramble</Chip>
              <Chip>★ 4.8 (498)</Chip>
            </>
          }
        />

        <div className="hd-content">
          <KeyStats
            stats={[
              ['14.3', 'km', 'distance'],
              ['1,539', 'm', 'elevation gain'],
              ['7–9', 'hrs', 'est. time'],
            ]}
          />

          <section className="hd-section">
            <SectionHead icon={mtn20} title="About this hike" />
            <p className="hd-para">
              A steep out-and-back from Lions Bay to the highest peak on the Howe Sound Crest. Expect a long forested
              grind, open ridgelines and a short Class 3 scramble to the summit, with views across Howe Sound.
            </p>
            <div className="hd-profile">
              <div className="hd-profile__head">
                <p className="hd-profile__title">Elevation profile</p>
                <p className="hd-profile__summit">Summit 1,788 m</p>
              </div>
              <div className="hd-chart">
                <img className="hd-chart__area" src={chartArea} alt="" />
                <img className="hd-chart__line" src={chartLine} alt="" />
                <img className="hd-chart__marker" src={chartMarker} alt="" />
                <img className="hd-chart__summit" src={chartSummit} alt="" />
              </div>
              <div className="hd-profile__axis">
                <span>0 km</span>
                <span>Summit · 7.2 km</span>
                <span>14.3 km</span>
              </div>
              <p className="hd-profile__note">- - -  No cell signal after KM 4.2</p>
            </div>
          </section>

          <section className="hd-section">
            <SectionHead icon={gauge20} title="Fit for you" right={<Chip tone="yellow">Stretch goal</Chip>} />
            <div className="hd-ready">
              <div className="hd-ready__row">
                <IconCircle icon={gauge18} bg="#fff" />
                <div className="hd-ready__body">
                  <p className="hd-ready__title">Readiness gap</p>
                  <p className="hd-ready__text">
                    About 2.1× longer than your longest logged hike, with +813 m more elevation than your biggest climb
                    day.
                  </p>
                </div>
              </div>
              <Bar label="DISTANCE" value="6.8 km logged / 14.3 km" remaining={154} />
              <Bar label="ELEVATION" value="726 m logged / 1,539 m" remaining={157} />
            </div>
            <div className="hd-pair">
              <Tile
                className="hd-tile--yellow"
                icon={clockIcon}
                iconBg="var(--yellow-1)"
                eyebrow="Your pace"
                title="6.5–8 hrs"
                text="Based on your logged hikes"
              />
              <Tile
                className="hd-tile--yellow"
                icon={sunriseIcon}
                iconBg="var(--yellow-1)"
                eyebrow="Start by"
                title="07:15 AM"
                text="Daylight margin for the descent"
              />
            </div>
          </section>

          <section className="hd-section">
            <SectionHead icon={shield20} title="Hazards & logistics" />
            <Flag
              className="hd-flag--yellow"
              icon={pawIcon}
              iconBg="var(--yellow-2)"
              title="Wildlife corridor"
              chip="Bear spray"
              chipTone="white"
              text="Active grizzly and black bear habitat in the sub-alpine meadows. Keep bear spray within reach."
            />
            <div className="hd-pair">
              <Tile
                icon={ticketIcon}
                iconBg="var(--teal-1)"
                title="Pass required"
                text="BC Parks day-use pass needed in peak summer season."
              />
              <Tile
                icon={carIcon}
                iconBg="var(--teal-1)"
                title="Access & parking"
                text="Lions Bay lot fills early. Arrive before 06:45 AM."
              />
            </div>
            <LinkRow icon={shield16} title="BC Parks trail report" text="Updated today at 06:30 AM" />
            <LinkRow icon={phoneIcon} title="Emergency services" text="Search and rescue · call 911" />
          </section>

          <section className="hd-section">
            <SectionHead icon={alertIcon} title="Trail challenges" right={<p className="hd-flagged">3 flagged</p>} />
            <Flag
              icon={sunIcon}
              iconBg="var(--yellow-3)"
              title="Sun exposure"
              chip="High UV"
              chipTone="cream"
              text="Open alpine ridgelines with strong UV reflection and no shade."
            />
            <Flag
              icon={mtn18}
              iconBg="var(--yellow-3)"
              title="Scramble"
              chip="Class 3"
              chipTone="cream"
              text="Class 3 knife-edge scramble near the summit. Helmet recommended."
            />
            <Flag
              icon={nosigIcon}
              iconBg="var(--yellow-3)"
              title="Cell service limit"
              chip="Cutoff KM 4.2"
              chipTone="cream"
              text="No signal after the lower switchbacks. Carry a satellite messenger."
            />
            <Flag
              icon={dropIcon}
              iconBg="var(--yellow-3)"
              title="Limited water"
              chip="Carry 3 L"
              chipTone="cream"
              text="No reliable water sources past the first creek crossing. Carry 3 L."
            />
          </section>

          <div className="hd-ready-cta">
            <p className="hd-ready-cta__title">Get trail-ready in 6 weeks</p>
            <p className="hd-ready-cta__text">
              A training plan, packing list and safety lessons built for this hike, around your current fitness.
            </p>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </Screen>
  )
}

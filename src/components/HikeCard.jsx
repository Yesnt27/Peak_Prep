import calendarIcon from '../assets/icons/calendar.svg'
import heartOutline from '../assets/icons/heart-outline.svg'
import heartFilled from '../assets/icons/heart-filled.svg'
import starIcon from '../assets/icons/star.svg'
import chevRight from '../assets/icons/chev-right.svg'
import friend1 from '../assets/home/friend-1.png'
import friend2 from '../assets/home/friend-2.svg'
import friend3 from '../assets/home/friend-3.svg'
import './HikeCard.css'

/**
 * Figma "home/hike card". Optional parts: date chip, prep progress, friends row.
 * `progress` is { text, remaining } where `remaining` is the unfilled bar width in px.
 */
export default function HikeCard({
  image,
  tag,
  date,
  saved = false,
  title,
  location,
  rating,
  stats,
  progress,
  friends = false,
  friendsText = 'Join Siena & 3 friends training',
  avatars = [friend1, friend2, friend3],
  plainDots = false,
  onClick,
}) {
  const Root = onClick ? 'button' : 'div'
  return (
    <Root className="hike-card" {...(onClick ? { type: 'button', onClick } : {})}>
      <div className="hike-card__image">
        <img className="hike-card__photo" src={image} alt="" />
        <div className="hike-card__top">
          <div className="hike-card__tags">
            {date && (
              <span className="hike-card__date">
                <img src={calendarIcon} alt="" />
                {date}
              </span>
            )}
            <span className="hike-card__tag">{tag}</span>
          </div>
          <span className="hike-card__save">
            <img src={saved ? heartFilled : heartOutline} alt="" />
          </span>
        </div>
        <div className={plainDots ? 'hike-card__dots hike-card__dots--plain' : 'hike-card__dots'}>
          <span className="hike-card__dot hike-card__dot--active" />
          <span className="hike-card__dot" />
          <span className="hike-card__dot" />
          <span className="hike-card__dot" />
          <span className="hike-card__dot" />
        </div>
      </div>
      <div className="hike-card__body">
        <div className="hike-card__title-row">
          <div className="hike-card__title">
            <p className="hike-card__name">{title}</p>
            <p className="hike-card__location">{location}</p>
          </div>
          <span className="hike-card__rating">
            <img src={starIcon} alt="" />
            {rating}
          </span>
        </div>
        <div className="hike-card__stats">
          {stats.map(([value, label]) => (
            <div className="stat-pill" key={label}>
              <p className="stat-pill__value">{value}</p>
              <p className="stat-pill__label">{label}</p>
            </div>
          ))}
        </div>
        {progress && (
          <div className="hike-card__progress">
            <div className="hike-card__progress-row">
              <p className="hike-card__progress-label">Prep status</p>
              <p className="hike-card__progress-text">{progress.text}</p>
            </div>
            <div className="hike-card__bar" style={{ paddingRight: progress.remaining }}>
              <div className="hike-card__bar-fill" />
            </div>
          </div>
        )}
        {friends && (
          <div className="hike-card__friends">
            <div className="hike-card__avatars">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="" />
              ))}
            </div>
            <p className="hike-card__friends-text">{friendsText}</p>
            <img className="hike-card__chev" src={chevRight} alt="" />
          </div>
        )}
      </div>
    </Root>
  )
}

import './Feedback.css'

/**
 * Figma 1646:12263 ("Right or wrong") cards, shown on the quiz after Check.
 * Card 1: the situation (title, photo, what is happening). Card 2: Next Steps
 * (steps, then a round photo beside the key points, where Figma has the eye ring
 * and "Treating for Shock"). Photos only exist for the Heat Exposure scenarios.
 */
export default function Feedback({ scenario }) {
  const { title, feedback, steps, photo, stepsPhoto, key } = scenario
  const credits = [photo, stepsPhoto].filter((p) => p?.credit).map((p) => p.credit)
  return (
    <>
      <section className="fa-white fa-white--center fa-fb">
        <h2 className="fa-white__head">{title}</h2>
        {photo && <Photo className={`fa-fb__photo${photo.fit === 'whole' ? ' fa-fb__photo--whole' : ''}`} photo={photo} />}
        <p className="fa-white__copy fa-fb__copy">{feedback}</p>
      </section>

      <section className="fa-white fa-white--center fa-fb">
        <h2 className="fa-white__head">Next Steps</h2>
        <p className="fa-white__copy fa-fb__copy">{steps}</p>
        {stepsPhoto && (
          <div className="fa-shock fa-fb__row">
            <Photo className="fa-fb__ring" photo={stepsPhoto} />
            {key && (
              <div className="fa-shock__text">
                <p className="fa-shock__title">{key.title}</p>
                <div className="fa-shock__list">
                  {key.items.map((item) =>
                    key.caps ? (
                      <p key={item}>
                        <span className="fa-shock__cap">{item[0]}</span>
                        {item.slice(1)}
                      </p>
                    ) : (
                      <p key={item} className="fa-fb__point">
                        {item}
                      </p>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {credits.length > 0 && (
        /* Openly licensed photos: author + licence, linked to the Commons page. */
        <p className="fa-fb__credits">
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
        </p>
      )}
    </>
  )
}

/** `pos` = object-position, so each crop keeps the people / object in frame. */
function Photo({ className, photo }) {
  return (
    <img
      className={className}
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      style={photo.pos ? { objectPosition: photo.pos } : undefined}
    />
  )
}

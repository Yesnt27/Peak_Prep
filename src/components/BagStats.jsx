import './BagStats.css'

/** Figma "Bag stats" (Packed 8 of 11 / Weight 7.8 kg), 353 x 123. */
export default function BagStats() {
  return (
    <div className="bag-stats">
      <div className="bag-stats__card">
        <p className="bag-stats__title">Packed</p>
        <p className="bag-stats__value">
          <span>8</span>
          <span className="bag-stats__unit">of 11</span>
        </p>
        <p className="bag-stats__note">3 left to pack</p>
        <div className="bag-stats__track">
          <div className="bag-stats__fill" style={{ flex: 'none', width: 101 }} />
        </div>
      </div>
      <div className="bag-stats__card">
        <p className="bag-stats__title">Weight</p>
        <p className="bag-stats__value">
          <span>7.8</span>
          <span className="bag-stats__unit">kg</span>
        </p>
        <p className="bag-stats__note">85% of 12 kg limit</p>
        <div className="bag-stats__track">
          <div className="bag-stats__fill" />
        </div>
      </div>
    </div>
  )
}

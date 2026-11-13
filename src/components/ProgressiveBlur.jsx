import './ProgressiveBlur.css'

/**
 * Figma's progressive background blur used behind the bottom bars
 * (Nav Bar, Hike Details action bar). Fills a 402 x 202 positioned parent.
 */
export default function ProgressiveBlur() {
  return (
    <>
      <div className="pblur pblur--1" />
      <div className="pblur pblur--2" />
      <div className="pblur pblur--3" />
      <div className="pblur pblur--4" />
    </>
  )
}

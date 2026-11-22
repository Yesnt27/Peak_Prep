/**
 * Marks the "+" / "-" button being pressed with `data-held` (Round 28), so its colour lasts for
 * the whole hold. Phones drop :active during a long press. Imported once, in main.jsx.
 */
let held = null

const release = () => {
  held?.removeAttribute('data-held')
  held = null
}

document.addEventListener('pointerdown', (e) => {
  release()
  if (e.button !== 0) return
  held = e.target.closest?.('.plus-btn, .sign-btn') ?? null
  held?.setAttribute('data-held', '')
})
document.addEventListener('pointerout', (e) => {
  if (held && !held.contains(e.relatedTarget)) release()
})
for (const type of ['pointerup', 'pointercancel', 'blur']) window.addEventListener(type, release)

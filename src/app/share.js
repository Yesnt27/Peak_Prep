/** Public prototype link (GitHub Pages). Shared as-is, without the current screen's #route. */
export const SITE_URL = 'https://yesnt27.github.io/Peak_Prep/'

/**
 * Opens the phone's native share sheet (iOS / Android). Where the browser has
 * none (most desktops), copies the link instead. Resolves to 'shared',
 * 'copied' or 'cancelled'.
 */
export async function shareSite() {
  const data = { title: 'PeakPrep', text: 'Get ready for your next hike with PeakPrep', url: SITE_URL }
  if (navigator.share) {
    try {
      await navigator.share(data)
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(SITE_URL)
  } catch {
    const field = Object.assign(document.createElement('textarea'), { value: SITE_URL })
    document.body.append(field)
    field.select()
    document.execCommand('copy')
    field.remove()
  }
  return 'copied'
}

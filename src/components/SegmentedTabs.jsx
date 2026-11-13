import './SegmentedTabs.css'

/**
 * Figma "3 Choice Tab Nav" family: a white bar with one green selected
 * segment. Hovering another segment tints it light green (300ms); clicking
 * selects it. `fade` cross-fades the segment colours over 300ms (the
 * smart-animate tab bars, where Figma swaps fills rather than moving a pill);
 * without it the selection changes instantly, as in the Home tab bar.
 */
export default function SegmentedTabs({ tabs, value, onChange, fade = false, className = '' }) {
  const index = Math.max(0, tabs.findIndex((tab) => tab.id === value))
  return (
    <div
      className={`seg-tabs ${fade ? 'seg-tabs--fade' : ''} ${className}`}
      role="tablist"
      style={{ '--count': tabs.length, '--index': index }}
    >
      <span className="seg-tabs__pill" />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={value === tab.id ? 'seg-tabs__tab seg-tabs__tab--selected' : 'seg-tabs__tab'}
          style={tab.color && value !== tab.id ? { color: tab.color } : undefined}
          onClick={() => value !== tab.id && onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

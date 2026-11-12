import './SegmentedTabs.css'

/**
 * Figma "3 Choice Tab Nav" family: a white bar with one green selected
 * segment. Hovering another segment tints it light green (300ms); clicking
 * selects it. `animated` slides the green segment (smart-animate tab bars);
 * without it the selection jumps instantly, as in the Home tab bar.
 */
export default function SegmentedTabs({ tabs, value, onChange, animated = false, className = '' }) {
  const index = Math.max(0, tabs.findIndex((tab) => tab.id === value))
  return (
    <div
      className={`seg-tabs ${animated ? 'seg-tabs--animated' : ''} ${className}`}
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

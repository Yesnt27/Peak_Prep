import './EmptyState.css'

/** White card for "nothing here yet" (new accounts): title, a line of text, optional action. */
export default function EmptyState({ title, text, children }) {
  return (
    <div className="empty">
      <p className="empty__title">{title}</p>
      {text && <p className="empty__text">{text}</p>}
      {children}
    </div>
  )
}

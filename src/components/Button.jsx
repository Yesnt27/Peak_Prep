import './Button.css'

/**
 * Figma "Button - Green" / "Button - Yellow" (hover swaps to the darker
 * variant) and "Button" = variant "primary" (hover swaps to a lighter green).
 * All use the prototype's 300ms smart-animate.
 */
export default function Button({ variant = 'green', className = '', children, ...rest }) {
  return (
    <button type="button" className={`btn btn--${variant} ${className}`} {...rest}>
      {children}
    </button>
  )
}

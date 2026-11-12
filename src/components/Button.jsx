import './Button.css'

/**
 * Figma "Button - Green" / "Button - Yellow". Hover swaps to the darker
 * variant with the prototype's 300ms smart-animate.
 */
export default function Button({ variant = 'green', className = '', children, ...rest }) {
  return (
    <button type="button" className={`btn btn--${variant} ${className}`} {...rest}>
      {children}
    </button>
  )
}

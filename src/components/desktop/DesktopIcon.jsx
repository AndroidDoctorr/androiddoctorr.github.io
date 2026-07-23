import { getIconColor } from '../../utils/projectTheme'

export default function DesktopIcon({ label, category, iconSrc, glyph, hidden, onOpen, disabled }) {
  const color = getIconColor(label, category)

  const handleClick = (event) => {
    if (disabled) return
    onOpen(event.currentTarget)
  }

  return (
    <button
      type="button"
      className={`desktop-icon${hidden ? ' desktop-icon--hidden' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {iconSrc ? (
        <img className="desktop-icon__image" src={iconSrc} alt="" />
      ) : glyph ? (
        <span className="desktop-icon__glyph desktop-icon__glyph--emoji" aria-hidden="true">
          {glyph}
        </span>
      ) : (
        <span className="desktop-icon__glyph" style={{ backgroundColor: color }}>
          {label.charAt(0)}
        </span>
      )}
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}

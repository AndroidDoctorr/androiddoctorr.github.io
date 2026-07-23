import basicInfo from '../../data/basic-info.json'
import EmailRevealLink from './EmailRevealLink'

export default function StartMenu({
  open,
  onClose,
  onOpenExperience,
  onOpenEducation,
  onOpenSettings,
  onOpenTerminal,
}) {
  if (!open) return null

  return (
    <>
      <button type="button" className="start-menu-backdrop" aria-label="Close menu" onClick={onClose} />
      <nav
        className="start-menu"
        aria-label="Start menu"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="start-menu__profile">
          <div className="start-menu__avatar" aria-hidden="true">
            {basicInfo.name.charAt(0)}
          </div>
          <div>
            <strong>{basicInfo.name}</strong>
            <p>{basicInfo.tagline}</p>
          </div>
        </header>

        <section className="start-menu__section">
          <h2>Work &amp; School</h2>
          <ul>
            <li>
              <button type="button" onClick={onOpenExperience}>
                <span className="start-menu__item-icon" aria-hidden="true">
                  💼
                </span>
                Employment History
              </button>
            </li>
            <li>
              <button type="button" onClick={onOpenEducation}>
                <span className="start-menu__item-icon" aria-hidden="true">
                  🎓
                </span>
                Education
              </button>
            </li>
          </ul>
        </section>

        <section className="start-menu__section">
          <h2>System</h2>
          <ul>
            <li>
              <button type="button" onClick={onOpenTerminal}>
                <span className="start-menu__item-icon" aria-hidden="true">
                  ⌨️
                </span>
                Terminal
              </button>
            </li>
          </ul>
        </section>

        <section className="start-menu__section">
          <h2>About</h2>
          <p className="start-menu__summary">{basicInfo.summary}</p>
          <div className="start-menu__links">
            <EmailRevealLink />
            <a href={basicInfo.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={basicInfo.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        <footer className="start-menu__footer">
          <button type="button" onClick={onOpenSettings}>
            Settings
          </button>
        </footer>
      </nav>
    </>
  )
}

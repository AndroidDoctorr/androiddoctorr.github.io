import { getCertInitials, getSkillCategoryStyles, getSkillCategoryTheme } from '../../utils/settingsTheme'

function SkillGroup({ group }) {
  const theme = getSkillCategoryTheme(group.category)

  return (
    <article className="settings-skill-card" style={getSkillCategoryStyles(group.category)}>
      <header className="settings-skill-card__header">
        <span className="settings-skill-card__icon" aria-hidden="true">
          {theme.icon}
        </span>
        <h4>{group.category}</h4>
      </header>
      <ul className="settings-skill-card__list">
        {group.items.map((item) => (
          <li key={item}>
            <span className="settings-skill-chip">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function CertificationCard({ cert }) {
  return (
    <a
      className="settings-cert-card"
      href={cert.url}
      target="_blank"
      rel="noreferrer"
    >
      <span className="settings-cert-card__badge" aria-hidden="true">
        {getCertInitials(cert.title)}
      </span>
      <span className="settings-cert-card__copy">
        <strong>{cert.title}</strong>
        <span>{cert.date}</span>
      </span>
      <span className="settings-cert-card__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

export default function SettingsWindow({
  skills,
  certifications,
  showHiddenFiles,
  onShowHiddenFilesChange,
}) {
  return (
    <article className="settings-window">
      <header className="settings-window__hero">
        <div className="settings-window__hero-bg" aria-hidden="true" />
        <div className="settings-window__hero-content">
          <p className="settings-window__eyebrow">System</p>
          <h2 className="settings-window__title">Settings</h2>
          <p className="settings-window__intro">
            Skills, tools, certifications, and a few system toggles
          </p>
        </div>
      </header>

      <div className="settings-window__body">
        <section className="settings-panel">
          <header className="settings-panel__header">
            <h3>Personalization</h3>
            <p>Desktop and file visibility.</p>
          </header>
          <label className="settings-toggle">
            <span className="settings-toggle__copy">
              <strong>Show hidden files</strong>
              <span>Reveal hidden projects on the desktop as translucent icons.</span>
            </span>
            <input
              type="checkbox"
              className="settings-toggle__input"
              checked={showHiddenFiles}
              onChange={(event) => onShowHiddenFilesChange(event.target.checked)}
            />
            <span className="settings-toggle__switch" aria-hidden="true" />
          </label>
        </section>

        <section className="settings-panel">
          <header className="settings-panel__header">
            <h3>Skills</h3>
            <p>What I reach for most often.</p>
          </header>
          <div className="settings-window__skills">
            {skills.map((group) => (
              <SkillGroup group={group} key={group.category} />
            ))}
          </div>
        </section>

        <section className="settings-panel">
          <header className="settings-panel__header">
            <h3>Certifications</h3>
            <p>Formal stamps of approval.</p>
          </header>
          <div className="settings-window__certs">
            {certifications.map((cert) => (
              <CertificationCard cert={cert} key={cert.title} />
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

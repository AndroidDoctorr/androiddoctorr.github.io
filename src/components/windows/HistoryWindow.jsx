import { getHistoryBanner } from '../../assets'
import { getHistoryThemeStyles } from '../../utils/historyTheme'

function HistoryEntry({ entry }) {
  const bannerSrc = getHistoryBanner(entry.title)
  const themeStyles = getHistoryThemeStyles(entry.color)

  return (
    <section className="history-entry" style={themeStyles}>
      <div className="history-entry__accent" aria-hidden="true" />

      {bannerSrc && (
        <div className="history-entry__banner">
          <img src={bannerSrc} alt="" />
          <div className="history-entry__banner-shade" aria-hidden="true" />
        </div>
      )}

      <div className="history-entry__body">
        <header className="history-entry__header">
          <div className="history-entry__title-block">
            <p className="history-entry__eyebrow">Organization</p>
            <h3>
              {entry.url ? (
                <a href={entry.url} target="_blank" rel="noreferrer">
                  {entry.title}
                </a>
              ) : (
                entry.title
              )}
            </h3>
          </div>
          {entry.url && (
            <a
              className="history-entry__link"
              href={entry.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit site ↗
            </a>
          )}
        </header>

        {entry.roles.map((role) => (
          <article className="history-entry__role" key={`${role.title}-${role.dates}`}>
            <div className="history-entry__role-title">
              <strong>{role.title}</strong>
              <span className="history-entry__dates">{role.dates}</span>
            </div>
            <ul className="history-entry__duties">
              {role.duties.map((duty) => (
                <li key={duty}>{duty}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function HistoryWindow({ entries, kind }) {
  const isEducation = kind === 'education'

  return (
    <article className={`history-window history-window--${kind}`}>
      <header className="history-window__hero">
        <div className="history-window__hero-bg" aria-hidden="true" />
        <div className="history-window__hero-content">
          <p className="history-window__eyebrow">{isEducation ? 'Education' : 'Employment'}</p>
          <h2 className="history-window__title">
            {isEducation ? 'Education History' : 'Employment History'}
          </h2>
          <p className="history-window__intro">
            {isEducation
              ? 'Schools, programs, and formal training.'
              : 'Roles, teams, and the work that shaped my career.'}
          </p>
        </div>
      </header>

      <div className="history-window__entries">
        {entries.map((entry) => (
          <HistoryEntry entry={entry} key={entry.title} />
        ))}
      </div>
    </article>
  )
}

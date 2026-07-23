import { getProjectIcon, getProjectScreenshots } from '../../assets'
import { getProjectLinkHost, getProjectLinkLabel } from '../../utils/projectLinks'
import { getProjectTheme, getProjectThemeStyles } from '../../utils/projectTheme'
import ScreenshotCarousel from './ScreenshotCarousel'

function FeatureList({ features }) {
  return (
    <ul className="project-window__features">
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  )
}

export default function ProjectWindow({ project }) {
  const screenshots = getProjectScreenshots(project.name)
  const iconSrc = getProjectIcon(project.name)
  const theme = getProjectTheme(project.name, project.category)
  const themeStyles = getProjectThemeStyles(theme)

  return (
    <article className="project-window" style={themeStyles}>
      <header className="project-window__hero">
        <div className="project-window__hero-bg" aria-hidden="true" />
        <div className="project-window__hero-content">
          <div className="project-window__hero-top">
            <div className="project-window__identity">
              {iconSrc ? (
                <img className="project-window__app-icon" src={iconSrc} alt="" />
              ) : (
                <span className="project-window__app-icon project-window__app-icon--fallback">
                  {project.name.charAt(0)}
                </span>
              )}
              <div>
                <h2 className="project-window__title">{project.name}</h2>
                <p className="project-window__tagline">{project.description}</p>
              </div>
            </div>

            <div className="project-window__meta">
              <span className="project-window__badge">{project.category}</span>
              <span className="project-window__badge project-window__badge--status">
                {project.status}
              </span>
            </div>
          </div>

          {project.url && (
            <a
              className="project-window__link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-window__link-copy">
                <span className="project-window__link-label">{getProjectLinkLabel(project)}</span>
                <span className="project-window__link-host">{getProjectLinkHost(project.url)}</span>
              </span>
              <span className="project-window__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </header>

      {screenshots.length > 0 ? (
        <ScreenshotCarousel
          screenshots={screenshots}
          label={project.name}
          mobileApp={project.category.toLowerCase().includes('mobile')}
        />
      ) : (
        <div className="project-window__carousel-placeholder" aria-hidden="true">
          <span>No screenshots yet</span>
        </div>
      )}

      <div className="project-window__body">
        {project.stack && (
          <section className="project-window__panel">
            <h3>Stack</h3>
            <div className="project-window__stack">
              {project.stack.split(',').map((item) => (
                <span className="project-window__stack-chip" key={item.trim()}>
                  {item.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        {project.features?.length > 0 && (
          <section className="project-window__panel">
            <h3>Features</h3>
            <FeatureList features={project.features} />
          </section>
        )}
      </div>
    </article>
  )
}

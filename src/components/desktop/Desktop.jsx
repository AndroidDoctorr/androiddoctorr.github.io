import { useCallback, useEffect, useState } from 'react'
import { getProjectIcon } from '../../assets'
import DesktopIcon from './DesktopIcon'

export default function Desktop({
  desktopItems,
  projects,
  hiddenProjects,
  showHiddenFiles,
  onOpenSystemItem,
  onOpenProject,
  onOpenSettings,
  launching,
}) {
  const [contextMenu, setContextMenu] = useState(null)

  const handleContextMenu = useCallback((event) => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY })
  }, [])

  const closeContextMenu = useCallback(() => {
    setContextMenu(null)
  }, [])

  useEffect(() => {
    if (!contextMenu) return undefined

    window.addEventListener('click', closeContextMenu)
    window.addEventListener('contextmenu', closeContextMenu)
    return () => {
      window.removeEventListener('click', closeContextMenu)
      window.removeEventListener('contextmenu', closeContextMenu)
    }
  }, [closeContextMenu, contextMenu])

  return (
    <main className="desktop" onContextMenu={handleContextMenu}>
      <div className="desktop__icons">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            glyph={item.glyph}
            disabled={launching}
            onOpen={() => onOpenSystemItem(item.kind)}
          />
        ))}
        {projects.map((project) => (
          <DesktopIcon
            key={project.name}
            label={project.name}
            category={project.category}
            iconSrc={getProjectIcon(project.name)}
            disabled={launching}
            onOpen={(iconElement) => onOpenProject(project, iconElement)}
          />
        ))}
        {showHiddenFiles &&
          hiddenProjects.map((project) => (
            <DesktopIcon
              key={project.name}
              label={project.name}
              category={project.category}
              iconSrc={getProjectIcon(project.name)}
              hidden
              disabled={launching}
              onOpen={(iconElement) => onOpenProject(project, iconElement)}
            />
          ))}
      </div>

      {contextMenu && (
        <menu
          className="desktop-context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <li>
            <button type="button" onClick={onOpenSettings}>
              Settings
            </button>
          </li>
          <li>
            <button type="button" disabled>
              View (coming soon)
            </button>
          </li>
        </menu>
      )}
    </main>
  )
}

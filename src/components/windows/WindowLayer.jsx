import Window from './Window'
import ProjectWindow from './ProjectWindow'
import HistoryWindow from './HistoryWindow'
import SettingsWindow from './SettingsWindow'
import TerminalWindow from './TerminalWindow'
import RecycleBinWindow from './RecycleBinWindow'
import MediaPlayerWindow from './MediaPlayerWindow'

import experience from '../../data/experience.json'
import education from '../../data/education.json'
import skills from '../../data/skills.json'
import certifications from '../../data/certifications.json'

function renderWindowContent(window, sharedProps) {
  switch (window.type) {
    case 'project':
      return <ProjectWindow project={window.data} />
    case 'experience':
      return <HistoryWindow entries={experience} kind="experience" />
    case 'education':
      return <HistoryWindow entries={education} kind="education" />
    case 'settings':
      return (
        <SettingsWindow
          skills={skills}
          certifications={certifications}
          showHiddenFiles={sharedProps.showHiddenFiles}
          onShowHiddenFilesChange={sharedProps.onShowHiddenFilesChange}
        />
      )
    case 'terminal':
      return (
        <TerminalWindow
          shellActions={sharedProps.shellActions}
          showHiddenFiles={sharedProps.showHiddenFiles}
          recycleItems={sharedProps.recycleItems}
          musicTracks={sharedProps.musicTracks}
        />
      )
    case 'recycle-bin':
      return (
        <RecycleBinWindow
          items={sharedProps.recycleItems}
          onOpenItem={sharedProps.onOpenRecycleItem}
        />
      )
    case 'media-player':
      return <MediaPlayerWindow tracks={sharedProps.musicTracks} />
    default:
      return null
  }
}

export default function WindowLayer({
  windows,
  shellActions,
  showHiddenFiles,
  onShowHiddenFilesChange,
  recycleItems,
  musicTracks,
  onOpenRecycleItem,
  onClose,
  onFocus,
  onMove,
  onResize,
  onMinimize,
  onToggleMaximize,
  onOpeningComplete,
}) {
  const sharedProps = {
    shellActions,
    showHiddenFiles,
    onShowHiddenFilesChange,
    recycleItems,
    musicTracks,
    onOpenRecycleItem,
  }

  return (
    <div className="window-layer" aria-live="polite">
      {windows
        .filter((window) => !window.minimized)
        .map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            opening={window.opening}
            maximized={window.maximized}
            onClose={onClose}
            onFocus={onFocus}
            onMove={onMove}
            onResize={onResize}
            onMinimize={onMinimize}
            onToggleMaximize={onToggleMaximize}
            onOpeningComplete={onOpeningComplete}
          >
            {renderWindowContent(window, sharedProps)}
          </Window>
        ))}
    </div>
  )
}

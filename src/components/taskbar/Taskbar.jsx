import { useEffect, useState } from 'react'
import StartMenu from './StartMenu'
import WeatherWidget from './WeatherWidget'
import { BatteryIcon, WifiIcon } from './TrayIcons'

function formatClock(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date) {
  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function Taskbar({
  startOpen,
  onToggleStart,
  onCloseStart,
  onOpenExperience,
  onOpenEducation,
  onOpenSettings,
  onOpenTerminal,
  windows,
  onFocusWindow,
}) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!startOpen) return undefined

    const handlePointerDown = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return

      if (target.closest('.start-menu') || target.closest('.taskbar__start')) {
        return
      }

      onCloseStart()
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [onCloseStart, startOpen])

  return (
    <footer className="taskbar">
      <button
        type="button"
        className={`taskbar__start${startOpen ? ' taskbar__start--active' : ''}`}
        onClick={onToggleStart}
        aria-expanded={startOpen}
      >
        <span className="taskbar__start-logo" aria-hidden="true">
          T
        </span>
        Start
      </button>

      <div className="taskbar__windows">
        {windows
          .filter((window) => window.minimized)
          .map((window) => (
            <button
              type="button"
              key={window.id}
              className="taskbar__window-button"
              onClick={() => onFocusWindow(window.id)}
            >
              {window.title}
            </button>
          ))}
      </div>

      <div className="taskbar__tray">
        <div className="taskbar__status-icons" aria-hidden="true">
          <WifiIcon />
          <BatteryIcon />
        </div>
        <WeatherWidget />
        <div className="taskbar__datetime">
          <span className="taskbar__clock">{formatClock(now)}</span>
          <span className="taskbar__date">{formatDate(now)}</span>
        </div>
      </div>

      <StartMenu
        open={startOpen}
        onClose={onCloseStart}
        onOpenExperience={onOpenExperience}
        onOpenEducation={onOpenEducation}
        onOpenSettings={onOpenSettings}
        onOpenTerminal={onOpenTerminal}
      />
    </footer>
  )
}

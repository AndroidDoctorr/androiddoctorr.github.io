import { useCallback, useEffect, useMemo, useState } from 'react'
import { desktopBackground, getMusicTracks } from './assets'
import LaunchAnimation from './components/desktop/LaunchAnimation'
import Desktop from './components/desktop/Desktop'
import Taskbar from './components/taskbar/Taskbar'
import WindowLayer from './components/windows/WindowLayer'
import { getAppId, useWindowManager } from './hooks/useWindowManager'
import { findProject } from './utils/projects'
import { getIconColor } from './utils/projectTheme'
import { loadSystemSettings, saveSystemSettings } from './utils/systemSettings'
import projects from './data/projects.json'
import hiddenProjects from './data/hidden-projects.json'
import desktopItems from './data/desktop-items.json'
import recycleItems from './data/recycle-bin.json'
import './styles/desktop.css'

const musicTracks = getMusicTracks()

const SYSTEM_APPS = {
  'recycle-bin': {
    title: 'Recycle Bin',
    type: 'recycle-bin',
    size: { width: 720, height: 560 },
  },
  terminal: {
    title: 'Terminal',
    type: 'terminal',
    size: { width: 760, height: 480 },
  },
  'media-player': {
    title: 'Music',
    type: 'media-player',
    size: { width: 520, height: 620 },
  },
}

function App() {
  const {
    windows,
    computePlacement,
    findWindowByAppId,
    openWindow,
    openOrFocusWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    clearOpening,
  } = useWindowManager()
  const [startOpen, setStartOpen] = useState(false)
  const [launch, setLaunch] = useState(null)
  const [showHiddenFiles, setShowHiddenFiles] = useState(
    () => loadSystemSettings().showHiddenFiles,
  )

  const closeStart = useCallback(() => setStartOpen(false), [])

  const handleShowHiddenFilesChange = useCallback((value) => {
    setShowHiddenFiles(value)
    saveSystemSettings({ showHiddenFiles: value })
  }, [])

  const finishLaunch = useCallback(
    (config) => {
      openWindow({ ...config, opening: true })
      setLaunch(null)
    },
    [openWindow],
  )

  const openSystemApp = useCallback(
    (kind) => {
      const config = SYSTEM_APPS[kind]
      if (!config) return
      openOrFocusWindow(config)
    },
    [openOrFocusWindow],
  )

  const openProjectByName = useCallback(
    (name) => {
      const project = findProject(name)
      if (!project) return
      openOrFocusWindow({
        title: project.name,
        type: 'project',
        data: project,
        size: { width: 820, height: 640 },
      })
    },
    [openOrFocusWindow],
  )

  const openRecycleItem = useCallback(
    (item) => {
      openOrFocusWindow({
        title: item.name,
        type: 'project',
        data: item,
        size: { width: 820, height: 640 },
      })
    },
    [openOrFocusWindow],
  )

  const openProject = useCallback(
    (project, iconElement) => {
      if (launch) return

      const appId = getAppId({ type: 'project', data: project })
      const existing = findWindowByAppId(appId)

      if (existing) {
        focusWindow(existing.id)
        return
      }

      const iconRect = iconElement.getBoundingClientRect()
      const size = { width: 820, height: 640 }
      const placement = computePlacement({ size })
      const windowRect = {
        left: placement.position.x,
        top: placement.position.y,
        width: placement.size.width,
        height: placement.size.height,
      }

      setLaunch({
        from: iconRect,
        to: windowRect,
        color: getIconColor(project.name, project.category),
        onComplete: () =>
          finishLaunch({
            title: project.name,
            type: 'project',
            data: project,
            size,
            placement,
          }),
      })
    },
    [computePlacement, finishLaunch, findWindowByAppId, focusWindow, launch],
  )

  const openExperience = useCallback(() => {
    closeStart()
    openOrFocusWindow({
      title: 'Employment History',
      type: 'experience',
      size: { width: 640, height: 520 },
    })
  }, [closeStart, openOrFocusWindow])

  const openEducation = useCallback(() => {
    closeStart()
    openOrFocusWindow({
      title: 'Education',
      type: 'education',
      size: { width: 640, height: 480 },
    })
  }, [closeStart, openOrFocusWindow])

  const openSettings = useCallback(() => {
    closeStart()
    openOrFocusWindow({
      title: 'Settings',
      type: 'settings',
      size: { width: 520, height: 520 },
    })
  }, [closeStart, openOrFocusWindow])

  const openTerminal = useCallback(() => {
    closeStart()
    openSystemApp('terminal')
  }, [closeStart, openSystemApp])

  const shellActions = useMemo(
    () => ({
      openApp: (appId) => openSystemApp(appId),
      openProject: (name) => openProjectByName(name),
    }),
    [openProjectByName, openSystemApp],
  )

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '`' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        openSystemApp('terminal')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openSystemApp])

  return (
    <div className="os-shell" style={{ backgroundImage: `url(${desktopBackground})` }}>
      <Desktop
        desktopItems={desktopItems}
        projects={projects}
        hiddenProjects={hiddenProjects}
        showHiddenFiles={showHiddenFiles}
        onOpenSystemItem={openSystemApp}
        onOpenProject={openProject}
        onOpenSettings={openSettings}
        launching={Boolean(launch)}
      />
      {launch && (
        <LaunchAnimation
          from={launch.from}
          to={launch.to}
          color={launch.color}
          onComplete={launch.onComplete}
        />
      )}
      <WindowLayer
        windows={windows}
        shellActions={shellActions}
        showHiddenFiles={showHiddenFiles}
        onShowHiddenFilesChange={handleShowHiddenFilesChange}
        recycleItems={recycleItems}
        musicTracks={musicTracks}
        onOpenRecycleItem={openRecycleItem}
        onClose={closeWindow}
        onFocus={focusWindow}
        onMove={moveWindow}
        onResize={resizeWindow}
        onMinimize={minimizeWindow}
        onToggleMaximize={toggleMaximizeWindow}
        onOpeningComplete={clearOpening}
      />
      <Taskbar
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((open) => !open)}
        onCloseStart={closeStart}
        onOpenExperience={openExperience}
        onOpenEducation={openEducation}
        onOpenSettings={openSettings}
        onOpenTerminal={openTerminal}
        windows={windows}
        onFocusWindow={focusWindow}
      />
    </div>
  )
}

export default App

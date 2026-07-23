import { useCallback, useEffect, useState } from 'react'

let nextWindowId = 1

const DEFAULT_SIZE = { width: 520, height: 420 }
const DEFAULT_POSITION = { x: 80, y: 60 }
const TASKBAR_HEIGHT = 48
const SHELL_INSET = 10

function getOffset(windowCount) {
  return ((windowCount + 1) % 8) * 28
}

export function getMaximizedBounds() {
  const shell = document.querySelector('.os-shell')
  const taskbar = document.querySelector('.taskbar')

  if (shell) {
    const taskbarHeight = taskbar?.offsetHeight ?? TASKBAR_HEIGHT

    return {
      position: { x: SHELL_INSET, y: SHELL_INSET },
      size: {
        width: Math.max(320, shell.clientWidth - SHELL_INSET * 2),
        height: Math.max(240, shell.clientHeight - taskbarHeight - SHELL_INSET * 2),
      },
    }
  }

  return {
    position: { x: SHELL_INSET, y: SHELL_INSET },
    size: {
      width: Math.max(320, window.innerWidth - SHELL_INSET * 2),
      height: Math.max(240, window.innerHeight - TASKBAR_HEIGHT - SHELL_INSET * 2),
    },
  }
}

export function getAppId(config) {
  if (config.appId) {
    return config.appId
  }

  if (config.type === 'project' && config.data?.name) {
    return `project:${config.data.name}`
  }

  return config.type
}

export function useWindowManager() {
  const [windows, setWindows] = useState([])
  const [topZ, setTopZ] = useState(1)

  const computePlacement = useCallback(
    (config = {}) => ({
      position: {
        x: DEFAULT_POSITION.x + getOffset(windows.length),
        y: DEFAULT_POSITION.y + getOffset(windows.length),
      },
      size: config.size ?? DEFAULT_SIZE,
    }),
    [windows.length],
  )

  const findWindowByAppId = useCallback(
    (appId) => windows.find((window) => window.appId === appId) ?? null,
    [windows],
  )

  const focusWindow = useCallback((id) => {
    setTopZ((z) => {
      const next = z + 1
      setWindows((current) =>
        current.map((window) =>
          window.id === id ? { ...window, zIndex: next, minimized: false } : window,
        ),
      )
      return next
    })
  }, [])

  const openWindow = useCallback(
    (config) => {
      const id = nextWindowId++
      const placement = config.placement ?? computePlacement(config)
      const appId = getAppId(config)

      setWindows((current) => [
        ...current,
        {
          id,
          appId,
          title: config.title,
          type: config.type,
          data: config.data ?? null,
          position: placement.position,
          size: placement.size,
          zIndex: topZ + 1,
          minimized: false,
          maximized: false,
          restoreState: null,
          opening: Boolean(config.opening),
        },
      ])
      setTopZ((z) => z + 1)
      return id
    },
    [computePlacement, topZ],
  )

  const openOrFocusWindow = useCallback(
    (config) => {
      const appId = getAppId(config)
      const existing = windows.find((window) => window.appId === appId)

      if (existing) {
        focusWindow(existing.id)
        return { id: existing.id, focused: true }
      }

      const id = openWindow(config)
      return { id, focused: false }
    },
    [focusWindow, openWindow, windows],
  )

  const closeWindow = useCallback((id) => {
    setWindows((current) => current.filter((window) => window.id !== id))
  }, [])

  const moveWindow = useCallback((id, position) => {
    setWindows((current) =>
      current.map((window) => {
        if (window.id !== id || window.maximized) return window
        return { ...window, position }
      }),
    )
  }, [])

  const resizeWindow = useCallback((id, size) => {
    setWindows((current) =>
      current.map((window) => {
        if (window.id !== id || window.maximized) return window
        return { ...window, size }
      }),
    )
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, minimized: true } : window,
      ),
    )
  }, [])

  const toggleMaximizeWindow = useCallback((id) => {
    setWindows((current) => {
      const nextZ = current.reduce((max, window) => Math.max(max, window.zIndex), 0) + 1

      return current.map((window) => {
        if (window.id !== id) return window

        if (window.maximized) {
          const restored = window.restoreState ?? {
            position: DEFAULT_POSITION,
            size: DEFAULT_SIZE,
          }

          return {
            ...window,
            maximized: false,
            minimized: false,
            position: restored.position,
            size: restored.size,
            restoreState: null,
            zIndex: nextZ,
          }
        }

        const bounds = getMaximizedBounds()

        return {
          ...window,
          maximized: true,
          minimized: false,
          restoreState: {
            position: { ...window.position },
            size: { ...window.size },
          },
          position: bounds.position,
          size: bounds.size,
          zIndex: nextZ,
        }
      })
    })

    setTopZ((z) => z + 1)
  }, [])

  const clearOpening = useCallback((id) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id ? { ...window, opening: false } : window,
      ),
    )
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindows((current) =>
        current.map((window) =>
          window.maximized ? { ...window, ...getMaximizedBounds() } : window,
        ),
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
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
  }
}

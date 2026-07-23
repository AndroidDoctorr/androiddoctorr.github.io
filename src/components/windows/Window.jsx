import { useCallback, useEffect, useState } from 'react'

const MIN_WIDTH = 320
const MIN_HEIGHT = 240

function stopControlEvent(event) {
  event.stopPropagation()
}

export default function Window({
  id,
  title,
  position,
  size,
  zIndex,
  opening,
  maximized = false,
  onClose,
  onFocus,
  onMove,
  onResize,
  onMinimize,
  onToggleMaximize,
  onOpeningComplete,
  children,
}) {
  const [showOpening, setShowOpening] = useState(opening)
  const [isSnapping, setIsSnapping] = useState(false)

  useEffect(() => {
    if (!opening) return undefined

    setShowOpening(true)
    const timer = window.setTimeout(() => {
      setShowOpening(false)
      onOpeningComplete?.(id)
    }, 320)

    return () => window.clearTimeout(timer)
  }, [id, onOpeningComplete, opening])

  useEffect(() => {
    setIsSnapping(true)
    const timer = window.setTimeout(() => setIsSnapping(false), 220)
    return () => window.clearTimeout(timer)
  }, [maximized])

  const handleTitleMouseDown = useCallback(
    (event) => {
      if (event.button !== 0 || maximized) return
      if (event.target.closest('.os-window__control')) return

      event.preventDefault()
      onFocus(id)

      const startX = event.clientX
      const startY = event.clientY
      const origin = { ...position }

      const handleMouseMove = (moveEvent) => {
        onMove(id, {
          x: origin.x + moveEvent.clientX - startX,
          y: origin.y + moveEvent.clientY - startY,
        })
      }

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    [id, maximized, onFocus, onMove, position],
  )

  const handleTitleDoubleClick = useCallback(
    (event) => {
      if (event.target.closest('.os-window__control')) return
      onToggleMaximize?.(id)
    },
    [id, onToggleMaximize],
  )

  const handleResizeMouseDown = useCallback(
    (event) => {
      if (event.button !== 0 || maximized) return
      event.preventDefault()
      event.stopPropagation()
      onFocus(id)

      const startX = event.clientX
      const startY = event.clientY
      const origin = { ...size }

      const handleMouseMove = (moveEvent) => {
        onResize(id, {
          width: Math.max(MIN_WIDTH, origin.width + moveEvent.clientX - startX),
          height: Math.max(MIN_HEIGHT, origin.height + moveEvent.clientY - startY),
        })
      }

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    [id, maximized, onFocus, onResize, size],
  )

  return (
    <div
      className={`os-window${showOpening ? ' os-window--opening' : ''}${
        maximized ? ' os-window--maximized' : ''
      }${isSnapping ? ' os-window--snapping' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className="os-window__titlebar"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={handleTitleDoubleClick}
      >
        <span className="os-window__title">{title}</span>
        <div className="os-window__controls">
          <button
            type="button"
            className="os-window__control os-window__control--minimize"
            aria-label="Minimize"
            onMouseDown={stopControlEvent}
            onClick={(event) => {
              stopControlEvent(event)
              onMinimize(id)
            }}
          >
            &#8211;
          </button>
          <button
            type="button"
            className="os-window__control os-window__control--maximize"
            aria-label={maximized ? 'Restore' : 'Maximize'}
            onMouseDown={stopControlEvent}
            onClick={(event) => {
              stopControlEvent(event)
              onToggleMaximize?.(id)
            }}
          >
            {maximized ? (
              <span className="os-window__restore-icon" aria-hidden="true" />
            ) : (
              <span className="os-window__maximize-icon" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="os-window__control os-window__control--close"
            aria-label="Close"
            onMouseDown={stopControlEvent}
            onClick={(event) => {
              stopControlEvent(event)
              onClose(id)
            }}
          >
            &#10005;
          </button>
        </div>
      </div>
      <div className="os-window__content">{children}</div>
      {!maximized && (
        <div
          className="os-window__resize-handle"
          onMouseDown={handleResizeMouseDown}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

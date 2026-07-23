import { useEffect, useMemo } from 'react'

const COLS = 6
const ROWS = 5
const SQUARE_SIZE = 10
const STAGGER_MS = 16
const DURATION_MS = 460

export default function LaunchAnimation({ from, to, color, onComplete }) {
  const squares = useMemo(() => {
    const items = []

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const u = (col + 0.5) / COLS
        const v = (row + 0.5) / ROWS

        items.push({
          id: `${row}-${col}`,
          startX: from.left + from.width * u - SQUARE_SIZE / 2,
          startY: from.top + from.height * v - SQUARE_SIZE / 2,
          endX: to.left + to.width * u - SQUARE_SIZE / 2,
          endY: to.top + to.height * v - SQUARE_SIZE / 2,
          delay: (row + col) * STAGGER_MS,
        })
      }
    }

    return items
  }, [from, to])

  useEffect(() => {
    const maxDelay = (ROWS + COLS - 2) * STAGGER_MS
    const timer = window.setTimeout(onComplete, DURATION_MS + maxDelay + 40)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="launch-animation" aria-hidden="true">
      {squares.map((square) => (
        <span
          key={square.id}
          className="launch-animation__square"
          style={{
            '--launch-color': color,
            '--start-x': `${square.startX}px`,
            '--start-y': `${square.startY}px`,
            '--end-x': `${square.endX}px`,
            '--end-y': `${square.endY}px`,
            '--delay': `${square.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}

export { DURATION_MS as LAUNCH_DURATION_MS }

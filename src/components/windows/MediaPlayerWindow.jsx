import { useEffect, useRef, useState } from 'react'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const wholeSeconds = Math.floor(seconds)
  const minutes = Math.floor(wholeSeconds / 60)
  const remainder = wholeSeconds % 60
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

export default function MediaPlayerWindow({ tracks }) {
  const audioRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = tracks[currentIndex]

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [currentIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return undefined

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }

    return undefined
  }, [currentTrack, isPlaying])

  const playTrack = (index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (!currentTrack) return
    setIsPlaying((playing) => !playing)
  }

  const playAdjacent = (direction) => {
    if (tracks.length === 0) return
    setCurrentIndex((index) => (index + direction + tracks.length) % tracks.length)
    setIsPlaying(true)
  }

  const handleSeek = (event) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const nextTime = (Number(event.target.value) / 100) * duration
    audio.currentTime = nextTime
    setProgress(nextTime)
  }

  if (tracks.length === 0) {
    return (
      <article className="media-player-window">
        <header className="media-player-window__hero">
          <div className="media-player-window__hero-bg" aria-hidden="true" />
          <div className="media-player-window__hero-content">
            <p className="media-player-window__eyebrow">Media</p>
            <h2>Music</h2>
            <p>
              Drop MP3 files into <code>src/assets/music/</code> and optional metadata into{' '}
              <code>src/data/music.json</code>.
            </p>
          </div>
        </header>
        <div className="media-player-window__empty">
          <span aria-hidden="true">🎵</span>
          <p>No tracks yet.</p>
        </div>
      </article>
    )
  }

  return (
    <article className="media-player-window">
      <header className="media-player-window__hero">
        <div className="media-player-window__hero-bg" aria-hidden="true" />
        <div className="media-player-window__hero-content">
          <p className="media-player-window__eyebrow">Now playing</p>
          <h2>{currentTrack.title}</h2>
          <p>{currentTrack.artist ?? 'Local library'}</p>
        </div>
      </header>

      <div className="media-player-window__body">
        <div className="media-player-window__controls">
          <button type="button" onClick={() => playAdjacent(-1)} aria-label="Previous track">
            ⏮
          </button>
          <button type="button" className="media-player-window__play" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button type="button" onClick={() => playAdjacent(1)} aria-label="Next track">
            ⏭
          </button>
        </div>

        <div className="media-player-window__progress">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (progress / duration) * 100 : 0}
            onChange={handleSeek}
            aria-label="Seek"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <ul className="media-player-window__playlist">
          {tracks.map((track, index) => (
            <li key={track.id}>
              <button
                type="button"
                className={`media-player-window__track${
                  index === currentIndex ? ' media-player-window__track--active' : ''
                }`}
                onClick={() => playTrack(index)}
              >
                <strong>{track.title}</strong>
                <span>{track.artist ?? 'Unknown artist'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={() => playAdjacent(1)}
        />
      )}
    </article>
  )
}

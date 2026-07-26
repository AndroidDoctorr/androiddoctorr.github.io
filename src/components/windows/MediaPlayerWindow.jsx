import { useEffect, useRef, useState } from 'react'
import { loadMediaVolume, saveMediaVolume } from '../../utils/mediaPlayerSettings'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const wholeSeconds = Math.floor(seconds)
  const minutes = Math.floor(wholeSeconds / 60)
  const remainder = wholeSeconds % 60
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

function formatTrackDuration(seconds) {
  return Number.isFinite(seconds) ? formatTime(seconds) : '--:--'
}

function volumeIcon(volume, isMuted) {
  if (isMuted || volume === 0) return '🔇'
  if (volume < 0.5) return '🔉'
  return '🔊'
}

function buildAlbumGroups(tracks) {
  const groups = []
  const albumIndex = new Map()

  tracks.forEach((track, index) => {
    const album = track.album ?? 'Unknown Album'

    if (!albumIndex.has(album)) {
      albumIndex.set(album, groups.length)
      groups.push({
        album,
        albumArt: track.albumArt,
        artist: track.artist,
        tracks: [],
      })
    }

    groups[albumIndex.get(album)].tracks.push({ track, index })
  })

  return groups
}

export default function MediaPlayerWindow({ tracks }) {
  const audioRef = useRef(null)
  const volumeBeforeMute = useRef(loadMediaVolume())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trackDurations, setTrackDurations] = useState({})
  const [volume, setVolume] = useState(loadMediaVolume)
  const [isMuted, setIsMuted] = useState(false)
  const [collapsedAlbums, setCollapsedAlbums] = useState(() => new Set())

  const currentTrack = tracks[currentIndex]
  const albumGroups = buildAlbumGroups(tracks)

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [currentIndex])

  useEffect(() => {
    if (!currentTrack?.album) return

    setCollapsedAlbums((collapsed) => {
      if (!collapsed.has(currentTrack.album)) return collapsed

      const next = new Set(collapsed)
      next.delete(currentTrack.album)
      return next
    })
  }, [currentTrack?.album, currentIndex])

  useEffect(() => {
    let cancelled = false
    const probes = []

    tracks.forEach((track) => {
      const probe = new Audio()
      probe.preload = 'metadata'
      probe.src = track.src
      probes.push(probe)

      const handleLoadedMetadata = () => {
        if (cancelled || !Number.isFinite(probe.duration)) return

        setTrackDurations((current) => {
          if (current[track.id] === probe.duration) return current
          return { ...current, [track.id]: probe.duration }
        })
      }

      probe.addEventListener('loadedmetadata', handleLoadedMetadata)
      probe.load()
    })

    return () => {
      cancelled = true
      probes.forEach((probe) => {
        probe.pause()
        probe.removeAttribute('src')
        probe.load()
      })
    }
  }, [tracks])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted, currentTrack])

  useEffect(() => {
    if (!isMuted) {
      saveMediaVolume(volume)
    }
  }, [volume, isMuted])

  const toggleAlbum = (album) => {
    setCollapsedAlbums((collapsed) => {
      const next = new Set(collapsed)
      if (next.has(album)) {
        next.delete(album)
      } else {
        next.add(album)
      }
      return next
    })
  }

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

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value) / 100
    setVolume(nextVolume)
    setIsMuted(false)
    volumeBeforeMute.current = nextVolume
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(volumeBeforeMute.current || loadMediaVolume())
      return
    }

    volumeBeforeMute.current = volume
    setIsMuted(true)
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
        <div
          className={`media-player-window__hero-bg${
            currentTrack.albumArt ? ' media-player-window__hero-bg--art' : ''
          }`}
          style={
            currentTrack.albumArt
              ? { backgroundImage: `url(${currentTrack.albumArt})` }
              : undefined
          }
          aria-hidden="true"
        />
        <div className="media-player-window__hero-content">
          {currentTrack.albumArt && (
            <img
              className="media-player-window__cover"
              src={currentTrack.albumArt}
              alt=""
            />
          )}
          <div className="media-player-window__hero-copy">
            <p className="media-player-window__eyebrow">
              {currentTrack.album ?? 'Now playing'}
            </p>
            <h2>{currentTrack.title}</h2>
            <p>{currentTrack.artist ?? 'Local library'}</p>
          </div>
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

        <div className="media-player-window__volume">
          <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
            {volumeIcon(volume, isMuted)}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>

        <div className="media-player-window__library">
          {albumGroups.map((group) => {
            const isCollapsed = collapsedAlbums.has(group.album)

            return (
              <section className="media-player-window__album" key={group.album}>
                <button
                  type="button"
                  className="media-player-window__album-header"
                  onClick={() => toggleAlbum(group.album)}
                  aria-expanded={!isCollapsed}
                >
                  {group.albumArt ? (
                    <img
                      className="media-player-window__album-art"
                      src={group.albumArt}
                      alt=""
                    />
                  ) : (
                    <span
                      className="media-player-window__album-art media-player-window__album-art--placeholder"
                      aria-hidden="true"
                    >
                      🎵
                    </span>
                  )}
                  <span className="media-player-window__album-copy">
                    <strong>{group.album}</strong>
                    <span>
                      {group.artist ?? 'Unknown artist'} · {group.tracks.length} tracks
                    </span>
                  </span>
                  <span className="media-player-window__album-toggle" aria-hidden="true">
                    {isCollapsed ? '▸' : '▾'}
                  </span>
                </button>

                {!isCollapsed && (
                  <ul className="media-player-window__playlist">
                    {group.tracks.map(({ track, index }) => (
                      <li key={track.id}>
                        <button
                          type="button"
                          className={`media-player-window__track${
                            index === currentIndex ? ' media-player-window__track--active' : ''
                          }`}
                          onClick={() => playTrack(index)}
                        >
                          <span className="media-player-window__track-copy">
                            <strong>{track.title}</strong>
                          </span>
                          <span className="media-player-window__track-duration">
                            {formatTrackDuration(trackDurations[track.id])}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      </div>

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => {
            const trackDuration = event.currentTarget.duration
            setDuration(trackDuration)

            if (Number.isFinite(trackDuration)) {
              setTrackDurations((current) => ({
                ...current,
                [currentTrack.id]: trackDuration,
              }))
            }
          }}
          onEnded={() => playAdjacent(1)}
        />
      )}
    </article>
  )
}

const VOLUME_KEY = 'torros-media-volume'
const AUTOPLAY_KEY = 'torros-media-autoplay'
const SHUFFLE_KEY = 'torros-media-shuffle'
const DEFAULT_VOLUME = 0.8
const DEFAULT_AUTOPLAY = true
const DEFAULT_SHUFFLE = false

function loadBoolean(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue

    return raw === 'true'
  } catch {
    return defaultValue
  }
}

function saveBoolean(key, value) {
  localStorage.setItem(key, String(value))
}

export function loadMediaVolume() {
  try {
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw === null) return DEFAULT_VOLUME

    const value = Number(raw)
    if (!Number.isFinite(value)) return DEFAULT_VOLUME

    return Math.min(1, Math.max(0, value))
  } catch {
    return DEFAULT_VOLUME
  }
}

export function saveMediaVolume(volume) {
  localStorage.setItem(VOLUME_KEY, String(volume))
}

export function loadMediaAutoplay() {
  return loadBoolean(AUTOPLAY_KEY, DEFAULT_AUTOPLAY)
}

export function saveMediaAutoplay(autoplay) {
  saveBoolean(AUTOPLAY_KEY, autoplay)
}

export function loadMediaShuffle() {
  return loadBoolean(SHUFFLE_KEY, DEFAULT_SHUFFLE)
}

export function saveMediaShuffle(shuffle) {
  saveBoolean(SHUFFLE_KEY, shuffle)
}

export function buildShuffleOrder(length, startIndex) {
  const indices = Array.from({ length }, (_, index) => index)

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]]
  }

  const startPosition = indices.indexOf(startIndex)
  if (startPosition > 0) {
    indices.splice(startPosition, 1)
    indices.unshift(startIndex)
  }

  return indices
}

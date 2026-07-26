const VOLUME_KEY = 'torros-media-volume'
const DEFAULT_VOLUME = 0.8

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

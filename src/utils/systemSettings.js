const STORAGE_KEY = 'torros-settings'

const DEFAULT_SETTINGS = {
  showHiddenFiles: false,
}

export function loadSystemSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }

    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSystemSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

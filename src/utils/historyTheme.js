export function getHistoryThemeStyles(color) {
  const primary = color ?? '#334155'

  return {
    '--history-primary': primary,
  }
}

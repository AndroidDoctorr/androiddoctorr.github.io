export function describeWeather(code) {
  if (code === 0) return { label: 'Clear', icon: '☀️' }
  if (code <= 3) return { label: 'Partly cloudy', icon: '⛅' }
  if (code <= 48) return { label: 'Foggy', icon: '🌫️' }
  if (code <= 67) return { label: 'Rainy', icon: '🌧️' }
  if (code <= 77) return { label: 'Snowy', icon: '❄️' }
  if (code <= 82) return { label: 'Showers', icon: '🌦️' }
  if (code <= 86) return { label: 'Snow showers', icon: '🌨️' }
  if (code >= 95) return { label: 'Stormy', icon: '⛈️' }
  return { label: 'Cloudy', icon: '☁️' }
}

import { useWeather } from '../../hooks/useWeather'

export default function WeatherWidget() {
  const weather = useWeather()

  return (
    <div
      className="weather-widget"
      title={
        weather.loading
          ? 'Loading weather'
          : `${weather.label} in ${weather.city}${weather.source === 'fallback' ? ' (default)' : ''}`
      }
      aria-label={
        weather.loading
          ? 'Loading weather'
          : `${weather.label}, ${weather.temperature} degrees in ${weather.city}`
      }
    >
      <span className="weather-widget__icon" aria-hidden="true">
        {weather.icon}
      </span>
      <span className="weather-widget__details">
        <span className="weather-widget__temp">
          {weather.loading ? '…' : weather.temperature != null ? `${weather.temperature}°` : '--'}
        </span>
        <span className="weather-widget__city">{weather.city}</span>
      </span>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { describeWeather } from '../utils/weatherCodes'

const INDIANAPOLIS = {
  latitude: 39.7684,
  longitude: -86.1581,
  city: 'Indianapolis',
}

async function fetchWeather(latitude, longitude) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('current', 'temperature_2m,weather_code')
  url.searchParams.set('temperature_unit', 'fahrenheit')

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Weather request failed')
  }

  const data = await response.json()
  const { temperature_2m: temperature, weather_code: weatherCode } = data.current

  return {
    temperature: Math.round(temperature),
    weatherCode,
  }
}

export function useWeather() {
  const [weather, setWeather] = useState({
    loading: true,
    temperature: null,
    city: INDIANAPOLIS.city,
    label: 'Loading',
    icon: '🌡️',
  })

  useEffect(() => {
    let cancelled = false

    async function loadWeather() {
      try {
        const forecast = await fetchWeather(INDIANAPOLIS.latitude, INDIANAPOLIS.longitude)
        const { label, icon } = describeWeather(forecast.weatherCode)

        if (cancelled) return

        setWeather({
          loading: false,
          temperature: forecast.temperature,
          city: INDIANAPOLIS.city,
          label,
          icon,
        })
      } catch {
        if (cancelled) return

        setWeather({
          loading: false,
          temperature: null,
          city: INDIANAPOLIS.city,
          label: 'Unavailable',
          icon: '🌡️',
        })
      }
    }

    loadWeather()

    return () => {
      cancelled = true
    }
  }, [])

  return weather
}

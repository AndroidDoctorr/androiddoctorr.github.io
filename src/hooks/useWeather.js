import { useEffect, useState } from 'react'
import { describeWeather } from '../utils/weatherCodes'

const INDIANAPOLIS = {
  latitude: 39.7684,
  longitude: -86.1581,
  city: 'Indianapolis',
}

async function getBrowserLocation() {
  if (!navigator.geolocation) {
    return null
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600_000 },
    )
  })
}

async function getIpLocation() {
  try {
    const response = await fetch('https://ipwho.is/')
    if (!response.ok) return null

    const data = await response.json()
    if (!data.success) return null

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
    }
  } catch {
    return null
  }
}

async function reverseGeocodeCity(latitude, longitude) {
  try {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/reverse')
    url.searchParams.set('latitude', String(latitude))
    url.searchParams.set('longitude', String(longitude))
    url.searchParams.set('count', '1')

    const response = await fetch(url)
    if (!response.ok) return null

    const data = await response.json()
    return data.results?.[0]?.name ?? null
  } catch {
    return null
  }
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

async function resolveLocation() {
  const browserLocation = await getBrowserLocation()

  if (browserLocation) {
    const city =
      (await reverseGeocodeCity(browserLocation.latitude, browserLocation.longitude)) ??
      'Nearby'

    return {
      ...browserLocation,
      city,
      source: 'browser',
    }
  }

  const ipLocation = await getIpLocation()
  if (ipLocation) {
    return {
      ...ipLocation,
      source: 'ip',
    }
  }

  return {
    ...INDIANAPOLIS,
    source: 'fallback',
  }
}

export function useWeather() {
  const [weather, setWeather] = useState({
    loading: true,
    temperature: null,
    city: INDIANAPOLIS.city,
    label: 'Loading',
    icon: '🌡️',
    source: 'fallback',
  })

  useEffect(() => {
    let cancelled = false

    async function loadWeather() {
      try {
        const location = await resolveLocation()
        const forecast = await fetchWeather(location.latitude, location.longitude)
        const { label, icon } = describeWeather(forecast.weatherCode)

        if (cancelled) return

        setWeather({
          loading: false,
          temperature: forecast.temperature,
          city: location.city,
          label,
          icon,
          source: location.source,
        })
      } catch {
        if (cancelled) return

        setWeather({
          loading: false,
          temperature: null,
          city: INDIANAPOLIS.city,
          label: 'Unavailable',
          icon: '🌡️',
          source: 'fallback',
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

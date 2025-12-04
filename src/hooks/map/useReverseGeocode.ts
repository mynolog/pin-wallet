import { useLoadScript } from '@react-google-maps/api'
import { useCallback } from 'react'

export function useReverseGeocode() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const getPlaceName = useCallback(
    async (lat: number, lng: number) => {
      if (!isLoaded || !window.google?.maps) return null

      const geocoder = new window.google.maps.Geocoder()

      try {
        const { results } = await geocoder.geocode({ location: { lat, lng } })
        return results?.[0]?.formatted_address ?? null
      } catch (err) {
        console.error(err)
        return null
      }
    },
    [isLoaded],
  )

  return { isLoaded, getPlaceName }
}

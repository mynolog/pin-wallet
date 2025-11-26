import { useState, useRef, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

interface Geolocation {
  lat: number
  lng: number
}

export function useCurrentGeolocation(isAuto: boolean) {
  const [geolocation, setGeolocation] = useState<Geolocation>({ lat: 37.5665, lng: 126.978 })
  const hasErrorRef = useRef(false)

  const requestGeolocation = useCallback((showToast = false) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        hasErrorRef.current = false
      },
      () => {
        if (showToast || !hasErrorRef.current) {
          toast.error('위치 권한이 없거나 위치를 가져올 수 없습니다.')
          hasErrorRef.current = true
        }
      },
    )
  }, [])

  useEffect(() => {
    if (isAuto) requestGeolocation(false)
  }, [isAuto, requestGeolocation])

  const getCurrentGeolocation = () => requestGeolocation(true)

  return { geolocation, getCurrentGeolocation }
}

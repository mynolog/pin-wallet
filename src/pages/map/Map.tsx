import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import GetGeolocationButton from '@/components/block/map/GetGeolocationButton'
import { Spinner } from '@/components/ui/spinner'
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll'
import { useCurrentGeolocation } from '@/hooks/useCurrentGeolocation'
import { useEffect, useState } from 'react'
import { useTripStore } from '@/stores/tripStore'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabaseClient'

interface ExpenseMarker {
  id: string
  amount: number
  latitude: number | null
  longitude: number | null
}

export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })
  const tripId = useTripStore((state) => state.tripId)
  const user = useAuthStore((state) => state.user)
  const [expenseMarkers, setExpenseMakers] = useState<ExpenseMarker[] | null>(null)
  const { geolocation, getCurrentGeolocation } = useCurrentGeolocation(true)
  useDisableBodyScroll()

  useEffect(() => {
    if (!tripId || !user) return

    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('id, amount, latitude, longitude')
        .eq('user_id', user.id)
        .eq('trip_id', tripId)
      if (!error) setExpenseMakers(data)
    }

    fetchExpenses()
  }, [tripId, user])

  if (!isLoaded)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8 animate-spin text-orange-300" />
        <span className="text-sm font-semibold">위치 정보를 가져오는 중입니다...</span>
      </div>
    )

  return (
    <div className="flex h-screen w-full flex-col">
      <MobilePageHeader
        title="소비 지도"
        children={<GetGeolocationButton onClick={() => getCurrentGeolocation()} />}
      />
      <GoogleMap
        zoom={15}
        center={geolocation}
        mapContainerStyle={{ width: '100%', height: 'calc(100vh - 178px)' }}
      >
        {(expenseMarkers ?? [])
          .filter((marker) => marker.latitude !== null && marker.longitude !== null)
          .map((marker) => (
            <Marker key={marker.id} position={{ lat: marker.latitude!, lng: marker.longitude! }} />
          ))}
      </GoogleMap>
    </div>
  )
}

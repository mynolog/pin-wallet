import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import GetGeolocationButton from '@/components/block/map/GetGeolocationButton'
import { Spinner } from '@/components/ui/spinner'
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll'
import { useCurrentGeolocation } from '@/hooks/useCurrentGeolocation'

export default function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const { geolocation, getCurrentGeolocation } = useCurrentGeolocation(true)
  useDisableBodyScroll()

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
        title="지도"
        children={<GetGeolocationButton onClick={() => getCurrentGeolocation()} />}
      />
      <GoogleMap
        zoom={15}
        center={geolocation}
        mapContainerStyle={{ width: '100%', height: 'calc(100vh - 178px)' }}
      >
        <Marker position={geolocation}></Marker>
      </GoogleMap>
    </div>
  )
}

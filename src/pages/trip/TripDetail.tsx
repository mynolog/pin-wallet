import { useParams } from 'react-router'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import { useTripDetail } from '@/hooks/trips/useTripDetail'
import { Spinner } from '@/components/ui/spinner'
import TripOptionsMenu from '@/components/block/trip/TripOptionsMenu'

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: tripDetail, isLoading, error } = useTripDetail(tripId ?? null)

  if (!tripId) {
    return <div>잘못된 접근입니다.</div>
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-8 text-orange-400" />
      </div>
    )
  }
  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title={tripDetail?.title || ''}>
        <TripOptionsMenu
          tripOptions={{
            id: tripDetail?.id,
            title: tripDetail?.title,
            budget: tripDetail?.budget,
            description: tripDetail?.description,
          }}
        />
      </MobilePageHeader>
    </div>
  )
}

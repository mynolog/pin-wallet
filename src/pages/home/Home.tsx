import { useNavigate } from 'react-router'
import { BadgePlus, TicketsPlane, ChevronUp } from 'lucide-react'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTrips } from '@/hooks/trips/useTrips'
import { COUNTRY_EMOJI_MAP } from '@/constants/country'
import { ROUTES } from '@/routes'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  const { data: trips, isLoading, error } = useTrips()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title="홈" children={<BadgePlus />} />
      <ul className="h-full space-y-2">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-32 w-full rounded-lg bg-gray-100" key={index} />
          ))}

        {error && (
          <div className="h-32 w-full">알 수 없는 오류가 발생했습니다. 새로고침 해주세요.</div>
        )}

        {!isLoading && !error && (trips ?? []).length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <TicketsPlane size={60} className="text-orange-600" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-bold">떠날 준비, 지금 바로 시작!</p>
              <p className="text-sm text-gray-500">간편하게 기록하고 손쉽게 관리할 수 있어요.</p>
            </div>
            <div className="mt-20 flex flex-col items-center justify-center gap-2">
              <ChevronUp size={25} className="text-orange-600" />
              <p className="flex items-center justify-center gap-1 text-sm font-semibold text-orange-600">
                우측 상단 <BadgePlus size={18} /> 버튼을 눌러 여행 계획을 기록해보세요!
              </p>
            </div>
          </div>
        )}

        {(trips ?? []).map((trip) => (
          <li key={trip.id} onClick={() => navigate(`${ROUTES.TRIPS.DETAIL(trip.id)}`)}>
            <Card className="h-32 w-full">
              <CardHeader>
                <CardTitle>{trip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.country && <span>{COUNTRY_EMOJI_MAP[trip.country]}</span>}
                {trip.start_date && trip.end_date && (
                  <p className="text-muted-foreground text-sm">
                    {trip.start_date} ~ {trip.end_date}
                  </p>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { useNavigate } from 'react-router'
import { TicketsPlane, ChevronUp } from 'lucide-react'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTrips } from '@/hooks/trips/useTrips'
import { COUNTRY_MAP } from '@/constants/country'
import { ROUTES } from '@/routes'
import { Skeleton } from '@/components/ui/skeleton'
import CreateTripButton from '@/components/block/trip/CreateTripButton'
import { useTripStore } from '@/stores/tripStore'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { data: trips, isLoading, error } = useTrips()
  const { setTripId } = useTripStore()
  const { t } = useTranslation('home')
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title={t('page-title')} children={<CreateTripButton />} />
      <ul className="h-full space-y-2">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-32 w-full rounded-lg bg-gray-100" key={index} />
          ))}

        {error && <div className="h-32 w-full">{t('error.fetch')}</div>}

        {!isLoading && !error && (trips ?? []).length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <TicketsPlane size={60} className="text-orange-600" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-bold">{t('empty.title')}</p>
              <p className="text-sm text-gray-500">{t('empty.description')}</p>
            </div>
            <div className="mt-20 flex flex-col items-center justify-center gap-2">
              <ChevronUp size={25} className="text-orange-600" />
              <p className="flex items-center justify-center gap-1 text-sm font-semibold text-orange-600">
                {t('empty.cta')}
              </p>
            </div>
          </div>
        )}

        {(trips ?? []).map((trip) => (
          <li
            key={trip.id}
            onClick={() => {
              setTripId(trip.id)
              navigate(`${ROUTES.TRIPS.DETAIL(trip.id)}`)
            }}
          >
            <Card className="h-32 w-full">
              <CardHeader>
                <CardTitle>{trip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.country && <span>{COUNTRY_MAP[trip.country].emoji}</span>}
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

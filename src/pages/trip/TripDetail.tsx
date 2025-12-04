import { useParams } from 'react-router'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import { useTripDetail } from '@/hooks/trips/useTripDetail'
import { Spinner } from '@/components/ui/spinner'
import TripOptionsMenu from '@/components/block/trip/TripOptionsMenu'
import BudgetOverviewCard from '@/components/block/trip/BudgetOverviewCard'
import ExpenseTabs from '@/components/block/trip/ExpenseTabs'
import CreateExpenseDrawer from '@/components/block/expense/CreateExpenseDrawer'

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>()
  const { data: tripDetail, isLoading } = useTripDetail(tripId ?? null)

  if (!tripId) {
    return <div>잘못된 접근입니다.</div>
  }

  if (isLoading || !tripDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-8 text-orange-400" />
      </div>
    )
  }
  return (
    <div className="flex h-screen flex-col gap-2">
      <MobilePageHeader title={tripDetail.title || ''}>
        <TripOptionsMenu
          tripOptions={{
            id: tripDetail.id,
            title: tripDetail.title,
            budget: tripDetail.budget,
            description: tripDetail.description,
          }}
        />
      </MobilePageHeader>
      <BudgetOverviewCard tripId={tripId} country={tripDetail.country} budget={tripDetail.budget} />
      <ExpenseTabs
        country={tripDetail.country}
        startDate={tripDetail.start_date}
        endDate={tripDetail.end_date}
      />
      <CreateExpenseDrawer
        tripId={tripId}
        className="fixed bottom-18 left-1/2 -translate-x-1/2 transform"
      />
    </div>
  )
}

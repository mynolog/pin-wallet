import { useQuery } from '@tanstack/react-query'
import { fetchTripDetail } from '@/api/trips'

export function useTripDetail(tripId: string | null) {
  return useQuery({
    queryKey: ['tripDetail', tripId],
    queryFn: () => fetchTripDetail(tripId),
    enabled: !!tripId,
  })
}

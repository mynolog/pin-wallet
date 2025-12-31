import { useQuery } from '@tanstack/react-query'
import { fetchExpenses } from '@/api/expenses'

export function useExpenses(tripId: string) {
  return useQuery({
    queryKey: ['expenses', tripId],
    queryFn: () => fetchExpenses(tripId),
  })
}

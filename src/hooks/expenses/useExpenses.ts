import { useQuery } from '@tanstack/react-query'
import { fetchExpenses } from '@/api/expenses'

export function useExpenses() {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  })
}

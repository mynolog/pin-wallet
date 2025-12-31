import { createExpense } from '@/api/expenses'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateExpense(tripId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses', tripId],
      })
    },
  })
}

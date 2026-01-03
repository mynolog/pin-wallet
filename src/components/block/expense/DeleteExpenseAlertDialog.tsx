import type { DeleteExpenseSupabaseDto } from '@/types/expense'
import { Eraser } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteExpense } from '@/api/expenses'
import { useTranslation } from 'react-i18next'

interface DeleteExpenseAlertDialogProps {
  id: DeleteExpenseSupabaseDto['id']
  tripId: DeleteExpenseSupabaseDto['trip_id']
}

export default function DeleteExpenseAlertDialog({ id, tripId }: DeleteExpenseAlertDialogProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const { t: tTrip } = useTranslation('trip')
  const { t: tCommon } = useTranslation('common')

  const deleteExpenseMutation = useMutation({
    mutationFn: async () => {
      if (!id || !tripId || !user) return
      await deleteExpense(id, tripId, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })

  const handleDeleteExpense = () => {
    deleteExpenseMutation.mutate()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <Eraser className="h-5 w-5" />
          <span>{tTrip('expense-card.delete')}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogHeader>{tTrip('expense-card.delete')}</AlertDialogHeader>
        </AlertDialogHeader>
        <AlertDialogDescription>{tCommon('delete-dialog-message')}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">{tCommon('cancel')}</AlertDialogCancel>
          <AlertDialogAction className="text-xs" onClick={handleDeleteExpense}>
            {tCommon('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

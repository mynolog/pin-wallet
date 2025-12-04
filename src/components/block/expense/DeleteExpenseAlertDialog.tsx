import type { DeleteExpenseSupabaseDto } from '@/types/expense'
import { Eraser } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteExpense } from '@/api/expenses'

interface DeleteExpenseAlertDialogProps {
  id: DeleteExpenseSupabaseDto['id']
  tripId: DeleteExpenseSupabaseDto['trip_id']
}

export default function DeleteExpenseAlertDialog({ id, tripId }: DeleteExpenseAlertDialogProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

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
          <span>지출 내역 삭제하기</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogHeader>지출 내역 삭제</AlertDialogHeader>
        </AlertDialogHeader>
        <AlertDialogDescription>
          이 작업은 되돌릴 수 없습니다. 계속 진행하시겠습니까?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">유지하기</AlertDialogCancel>
          <AlertDialogAction className="text-xs" onClick={handleDeleteExpense}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

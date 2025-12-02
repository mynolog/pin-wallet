import type { DeleteTripSupabaseDto } from '@/types/trip'
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
import { deleteTrip } from '@/api/trips'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes'

interface DeleteTripAlertDialogProps {
  id: DeleteTripSupabaseDto['id']
}

export default function DeleteTripAlertDialog({ id }: DeleteTripAlertDialogProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const deleteTripMutation = useMutation({
    mutationFn: async () => {
      if (!id) return
      if (!user) throw new Error('No user logged in')
      await deleteTrip(id, user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      navigate(ROUTES.HOME)
    },
  })

  const handleDeleteTrip = () => {
    deleteTripMutation.mutate()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <Eraser className="h-5 w-5" />
          <span>여행 삭제하기</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>여행 삭제</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          지금까지 입력한 내용이 모두 사라지며 홈 화면으로 돌아갑니다. 이 작업은 되돌릴 수 없습니다.
          계속 진행하시겠습니까?
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">유지하기</AlertDialogCancel>
          <AlertDialogAction className="text-xs" onClick={handleDeleteTrip}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

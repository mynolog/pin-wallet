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
import { useTranslation } from 'react-i18next'

interface DeleteTripAlertDialogProps {
  id: DeleteTripSupabaseDto['id']
}

export default function DeleteTripAlertDialog({ id }: DeleteTripAlertDialogProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t: tTrip } = useTranslation('trip')
  const { t: tCommon } = useTranslation('common')

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
          <span>{tTrip('menu.delete')}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tTrip('menu.delete')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{tCommon('delete-dialog-message')}</AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">{tCommon('cancel')}</AlertDialogCancel>
          <AlertDialogAction className="text-xs" onClick={handleDeleteTrip}>
            {tCommon('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

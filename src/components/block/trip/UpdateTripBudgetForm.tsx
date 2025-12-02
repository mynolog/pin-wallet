import type { UpdateTripSupabaseDto } from '@/types/trip'
import { updateTripSchema, type UpdateTripSchema } from '@/schemas/trip'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

type UpdateTripBudgetSchema = Pick<UpdateTripSchema, 'budget'>

interface UpdateTripBudgetFormProps {
  id: UpdateTripSupabaseDto['id']
  budget: UpdateTripSupabaseDto['budget']
  onSave?: () => void
  onCancel?: () => void
}

export default function UpdateTripBudgetForm({
  id,
  budget,
  onSave,
  onCancel,
}: UpdateTripBudgetFormProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const updateTripMutation = useMutation({
    mutationFn: async (data: { budget: number }) => {
      if (!id) return
      if (!user) throw new Error('No user logged in')

      const payload: UpdateTripSupabaseDto = {
        budget: Number(data.budget),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('trips')
        .update(payload)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tripDetail'] })
      if (onSave) onSave()
    },
  })

  const { register, handleSubmit } = useForm<UpdateTripBudgetSchema>({
    resolver: zodResolver(
      updateTripSchema.pick({
        budget: true,
      }),
    ),
    defaultValues: {
      budget,
    },
  })

  const onSubmit = async ({ budget }: { budget: number }) => {
    if (!id) return
    updateTripMutation.mutate({ budget })
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ budget: data.budget }))}>
      <Input id="budget" type="number" {...register('budget', { valueAsNumber: true })} />
      <div className="flex w-full justify-end gap-2 py-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}

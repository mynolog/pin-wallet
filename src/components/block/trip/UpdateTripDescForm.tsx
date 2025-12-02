import type { UpdateTripSupabaseDto } from '@/types/trip'
import { updateTripSchema, type UpdateTripSchema } from '@/schemas/trip'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

type UpdateTripDescSchema = Pick<UpdateTripSchema, 'description'>

interface UpdateTripDescFormProps {
  id: UpdateTripSupabaseDto['id']
  description: UpdateTripSupabaseDto['description']
  onSave?: () => void
  onCancel?: () => void
}

export default function UpdateTripDescForm({
  id,
  description,
  onSave,
  onCancel,
}: UpdateTripDescFormProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const updateTripMutation = useMutation({
    mutationFn: async (data: { description: string }) => {
      if (!id) return
      if (!user) throw new Error('No user logged in')

      const payload: UpdateTripSupabaseDto = {
        ...data,
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

  const { register, handleSubmit } = useForm<UpdateTripDescSchema>({
    resolver: zodResolver(
      updateTripSchema.pick({
        description: true,
      }),
    ),
    defaultValues: {
      description: description ?? '',
    },
  })

  const onSubmit = async ({ description }: { description: string }) => {
    if (!id) return
    updateTripMutation.mutate({ description })
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ description: data.description ?? '' }))}>
      <Input id="description" {...register('description')} />
      <div className="flex w-full justify-end gap-2 py-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}

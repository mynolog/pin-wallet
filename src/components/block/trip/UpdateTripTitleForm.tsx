import type { UpdateTripSupabaseDto } from '@/types/trip'
import { updateTripSchema, type UpdateTripSchema } from '@/schemas/trip'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

type UpdateTripTitleSchema = Pick<UpdateTripSchema, 'title'>

interface UpdateTripTitleFormProps {
  id: UpdateTripSupabaseDto['id']
  title: UpdateTripSupabaseDto['title']
  onSave?: () => void
  onCancel?: () => void
}

export default function UpdateTripTitleForm({
  id,
  title,
  onSave,
  onCancel,
}: UpdateTripTitleFormProps) {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()

  const updateTripMutation = useMutation({
    mutationFn: async (data: { title: string }) => {
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

  const { register, handleSubmit } = useForm<UpdateTripTitleSchema>({
    resolver: zodResolver(
      updateTripSchema.pick({
        title: true,
      }),
    ),
    defaultValues: {
      title,
    },
  })

  const onSubmit = async ({ title }: { title: string }) => {
    if (!id) return
    updateTripMutation.mutate({ title })
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ title: data.title }))}>
      <Input id="title" {...register('title')} />
      <div className="flex w-full justify-end gap-2 py-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}

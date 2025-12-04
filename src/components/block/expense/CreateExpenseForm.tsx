import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EXPENSE_CATEGORY_OPTIONS } from '@/constants/category'
import { createExpenseFormSchema, type CreateExpenseSchema } from '@/schemas/expense'
import { useAuthStore } from '@/stores/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useCurrentGeolocation } from '@/hooks/useCurrentGeolocation'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReverseGeocode } from '@/hooks/map/useReverseGeocode'
import type { CreateExpenseSupabaseDto } from '@/types/expense'
import { supabase } from '@/lib/supabaseClient'

interface CreateExpenseFormProps {
  tripId: string
  onSave?: () => void
  onCancel?: () => void
}

export default function CreateExpenseForm({ tripId, onSave, onCancel }: CreateExpenseFormProps) {
  const { geolocation, getCurrentGeolocation } = useCurrentGeolocation(true)
  const [placeName, setPlaceName] = useState<string | null>(null)
  const { isLoaded, getPlaceName } = useReverseGeocode()

  const user = useAuthStore((state) => state.user)
  const { register, handleSubmit, control, setValue } = useForm<CreateExpenseSchema>({
    resolver: zodResolver(createExpenseFormSchema),
    defaultValues: {
      category: 'UNCATEGORIZED',
      amount: 0,
      description: '',
      latitude: undefined,
      longitude: undefined,
    },
  })

  useEffect(() => {
    if (!geolocation) return
    setValue('latitude', geolocation.lat)
    setValue('longitude', geolocation.lng)
  }, [geolocation, setValue])

  const onSubmit = async (data: CreateExpenseSchema) => {
    if (!user) throw new Error('No user logged in')
    if (!tripId) throw new Error('tripId not exist')

    const payload: CreateExpenseSupabaseDto = {
      ...data,
      user_id: user.id,
      trip_id: tripId,
    }

    const { error } = await supabase.from('expenses').insert(payload).select('*')

    if (error) {
      console.error('Insert error:', error)
      throw error
    }

    if (onSave) onSave()
  }

  const handleGetPlace = async () => {
    getCurrentGeolocation()

    if (!isLoaded) return

    const place = await getPlaceName(geolocation.lat, geolocation.lng)
    setPlaceName(place)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount" className="font-semibold">
            사용 금액
          </Label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  id="amount"
                  className="text-right"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '')
                    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    e.target.value = formattedValue
                    field.onChange(Number(numericValue))
                  }}
                  value={field.value?.toLocaleString() || 0}
                  inputMode="numeric"
                />
              )
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">메모 (선택)</Label>
          <Input id="description" {...register('description')} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>카테고리</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORY_OPTIONS.map(({ value, label, emoji }) => (
                    <SelectItem key={value} value={value}>
                      {emoji} {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          ></Controller>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGetPlace} variant="outline" type="button">
            <MapPin />
            현재 위치 가져오기
          </Button>
          {isLoaded && placeName && (
            <span className="flex items-center text-xs font-semibold">{placeName}</span>
          )}
        </div>
        <div className="hidden">
          <Input {...register('latitude')} className="hidden" />
          <Input {...register('longitude')} className="hidden" />
        </div>
        <div className="flex w-full justify-end gap-2 py-2">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </div>
      </div>
    </form>
  )
}

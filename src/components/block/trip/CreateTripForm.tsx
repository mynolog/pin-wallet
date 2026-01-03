import type { CreateTripSupabaseDto } from '@/types/trip'
import type { CreateTripSchema } from '@/schemas/trip'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { COUNTRY_MAP, COUNTRY_OPTIONS } from '@/constants/country'
import { createTripFormSchema } from '@/schemas/trip'
import { ROUTES } from '@/routes'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/authStore'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/languageStore'

/* TODO: CreateTripForm 컴포넌트 리팩토링
- watch api -> Controller or field value로 대체
- onSubmit 함수 -> 커스텀 hooks
- UI 단위 컴포넌트로 분리
 */

export default function CreateTripForm() {
  const user = useAuthStore((state) => state.user)
  const { t: tCreateTrip } = useTranslation('createTrip')
  const { t: tCommon } = useTranslation('common')
  const language = useLanguageStore((state) => state.language)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateTripSchema>({
    resolver: zodResolver(createTripFormSchema),
    defaultValues: {
      title: '',
      country: 'KR',
      start_date: undefined,
      end_date: undefined,
      budget: 0,
      description: '',
    },
  })

  const currentStartDate = watch('start_date')
  const currentEndDate = watch('end_date')
  const currentCountry = watch('country')

  const onSubmit = async (data: CreateTripSchema) => {
    if (!user) throw new Error('No user logged in')

    const payload: CreateTripSupabaseDto = {
      ...data,
      user_id: user.id,
      start_date: format(data.start_date, 'yyyy-MM-dd'),
      end_date: format(data.end_date, 'yyyy-MM-dd'),
    }

    const { error } = await supabase.from('trips').insert(payload).select('*')

    if (error) {
      console.error('Insert error:', error)
    }

    queryClient.invalidateQueries({ queryKey: ['trips'] })
    navigate(ROUTES.HOME)
  }

  const handleCancelDatePicker = (
    field: keyof Pick<CreateTripSchema, 'start_date' | 'end_date'>,
  ) => {
    resetField(field)
  }

  const handleCancelCreateTrip = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="title">{tCreateTrip('form.title')}</Label>
              {errors.title && (
                <p className="ml-1 text-xs leading-none font-semibold text-orange-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <Input id="title" {...register('title')} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="country">{tCreateTrip('form.country.title')}</Label>
              {errors.country && (
                <p className="ml-1 text-xs leading-none font-semibold text-orange-600">
                  {errors.country.message}
                </p>
              )}
            </div>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="국가 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_OPTIONS.map(({ value, labelKey, emoji }) => (
                      <SelectItem key={value} value={value}>
                        {emoji} {tCreateTrip(labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="start-date">{tCreateTrip('form.start-date.title')}</Label>
              {errors.start_date && (
                <p className="ml-1 text-xs leading-none font-semibold text-orange-600">
                  {errors.start_date.message}
                </p>
              )}
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="start-date"
                  className="bg-orange-100 text-orange-500 hover:bg-orange-400 hover:text-orange-100"
                >
                  <CalendarArrowUp />
                  {!currentStartDate
                    ? tCreateTrip('form.start-date.label')
                    : currentStartDate.toLocaleDateString()}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-screen">
                <div className="w-full">
                  <DrawerHeader className="flex w-full justify-center">
                    <DrawerTitle>{tCreateTrip('form.start-date.title')}</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                      <Calendar
                        lang={language}
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date)
                        }}
                        className="w-2/3"
                        captionLayout="dropdown"
                        startMonth={
                          currentStartDate
                            ? new Date(currentStartDate.getFullYear(), currentStartDate.getMonth())
                            : new Date(new Date().getFullYear(), new Date().getMonth())
                        }
                        endMonth={
                          currentStartDate
                            ? new Date(currentStartDate.getFullYear() + 2, 11)
                            : new Date(new Date().getFullYear() + 2, 11)
                        }
                      />
                    )}
                  />
                </div>
                <DrawerFooter>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <DrawerClose asChild className="w-2/3">
                      <Button className="w-full">확인</Button>
                    </DrawerClose>
                    <DrawerClose asChild className="w-2/3">
                      <Button
                        className="w-full"
                        onClick={() => handleCancelDatePicker('start_date')}
                      >
                        취소
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="end-date">{tCreateTrip('form.end-date.title')}</Label>
              {errors.end_date && (
                <p className="ml-1 text-xs leading-none font-semibold text-orange-600">
                  {errors.end_date.message}
                </p>
              )}
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="end-date"
                  className="bg-orange-100 text-orange-500 hover:bg-orange-400 hover:text-orange-100"
                >
                  <CalendarArrowDown />
                  {!currentEndDate
                    ? tCreateTrip('form.end-date.label')
                    : currentEndDate.toLocaleDateString()}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-screen">
                <div className="w-full">
                  <DrawerHeader className="flex w-full justify-center">
                    <DrawerTitle>{tCreateTrip('form.end-date.title')}</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Controller
                    control={control}
                    name="end_date"
                    render={({ field }) => {
                      const selectedStartDate = getValues('start_date')

                      return (
                        <Calendar
                          lang={language}
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date)
                          }}
                          disabled={(date) => {
                            if (!selectedStartDate) return false
                            return date < new Date(selectedStartDate)
                          }}
                          className="w-2/3"
                          captionLayout="dropdown"
                          startMonth={
                            currentStartDate
                              ? new Date(
                                  currentStartDate.getFullYear(),
                                  currentStartDate.getMonth(),
                                )
                              : new Date(new Date().getFullYear(), new Date().getMonth())
                          }
                          endMonth={
                            currentStartDate
                              ? new Date(currentStartDate.getFullYear() + 2, 11)
                              : new Date(new Date().getFullYear() + 2, 11)
                          }
                        />
                      )
                    }}
                  />
                </div>
                <DrawerFooter>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <DrawerClose asChild className="w-2/3">
                      <Button className="w-full">확인</Button>
                    </DrawerClose>
                    <DrawerClose asChild className="w-2/3">
                      <Button className="w-full" onClick={() => handleCancelDatePicker('end_date')}>
                        취소
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-5">
              <div className="flex h-4 items-center gap-2">
                <Label htmlFor="budget">{tCreateTrip('form.budget')}</Label>

                {currentCountry && (
                  <div className="flex items-center gap-2 leading-none">
                    <p>{COUNTRY_MAP[currentCountry].emoji}</p>
                    <p className="text-xs font-semibold">{COUNTRY_MAP[currentCountry].currency}</p>
                  </div>
                )}

                {errors.budget && (
                  <p className="ml-1 text-xs leading-none font-semibold text-orange-600">
                    {errors.budget.message}
                  </p>
                )}
              </div>
            </div>
            <Controller
              name="budget"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    type="text"
                    id="budget"
                    placeholder="예산을 입력하세요."
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
            <Label htmlFor="description">{tCreateTrip('form.description')}</Label>
            <Input id="description" {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="text-xs text-orange-500" variant="secondary">
                  {tCommon('cancel')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{tCommon('delete')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {tCommon('delete-dialog-message')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-xs">{tCommon('continue')}</AlertDialogCancel>
                  <AlertDialogAction className="text-xs" onClick={handleCancelCreateTrip}>
                    {tCommon('delete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" className="w-1/5 bg-orange-400 text-xs hover:bg-orange-500">
              {tCommon('save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

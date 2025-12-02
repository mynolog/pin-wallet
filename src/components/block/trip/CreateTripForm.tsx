import type { CreateTripSupabaseDto } from '@/types/trip'
import type { CreateTripSchema } from '@/schemas/trip'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { CalendarArrowDown, CalendarArrowUp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

/* TODO: CreateTripForm 컴포넌트 리팩토링
- watch api -> Controller or field value로 대체
- onSubmit 함수 -> 커스텀 hooks
- UI 단위 컴포넌트로 분리
 */

export default function CreateTripForm() {
  const user = useAuthStore((state) => state.user)
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
      start_date: data.start_date.toISOString(),
      end_date: data.end_date.toISOString(),
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
      <CardHeader>
        <CardTitle>새로운 여행</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="title">여행 제목</Label>
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
              <Label htmlFor="country">여행 국가</Label>
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
                    {COUNTRY_OPTIONS.map(({ value, label, emoji }) => (
                      <SelectItem key={value} value={value}>
                        {emoji} {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-4 items-center gap-2">
              <Label htmlFor="start-date">여행 시작일</Label>
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
                  {!currentStartDate ? '시작일' : currentStartDate.toLocaleDateString()}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-screen">
                <div className="w-full">
                  <DrawerHeader className="flex w-full justify-center">
                    <DrawerTitle>여행 시작일</DrawerTitle>
                  </DrawerHeader>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                      <Calendar
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
              <Label htmlFor="end-date">여행 종료일</Label>
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
                  {!currentEndDate ? '종료일' : currentEndDate.toLocaleDateString()}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-screen">
                <div className="w-full">
                  <DrawerHeader className="flex w-full justify-center">
                    <DrawerTitle>여행 종료일</DrawerTitle>
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
                <Label htmlFor="budget">여행 예산</Label>

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
            <Label htmlFor="description">메모 (선택)</Label>
            <Input id="description" {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="text-xs text-orange-500" variant="secondary">
                  취소
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>작성 취소</AlertDialogTitle>
                  <AlertDialogDescription>
                    지금까지 입력한 내용이 모두 사라지며 홈 화면으로 돌아갑니다. 이 작업은 되돌릴 수
                    없습니다. 계속 진행하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-xs">계속 작성하기</AlertDialogCancel>
                  <AlertDialogAction className="text-xs" onClick={handleCancelCreateTrip}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" className="w-1/5 bg-orange-400 text-xs hover:bg-orange-500">
              저장
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

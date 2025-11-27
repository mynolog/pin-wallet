import type { CreateTripDto } from '@/schemas/trip'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
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
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes'

export default function CreateTripForm() {
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateTripDto>({
    resolver: zodResolver(createTripFormSchema),
    defaultValues: {
      title: '',
      country: undefined,
      start_date: undefined,
      end_date: undefined,
      budget: 0,
      description: '',
    },
  })
  const navigate = useNavigate()

  const currentStartDate = watch('start_date')
  const currentEndDate = watch('end_date')

  const onSubmit = (data: CreateTripDto) => {
    console.log('submit', data)
  }

  const handleCancelDatePicker = (field: keyof Pick<CreateTripDto, 'start_date' | 'end_date'>) => {
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
            <Label htmlFor="title">여행 제목</Label>
            <Input id="title" {...register('title')} />
            {errors.title && (
              <p className="ml-1 text-xs font-semibold text-orange-600">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="country">여행 국가</Label>
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
            {errors.country && (
              <p className="ml-1 text-xs font-semibold text-orange-600">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="start-date">여행 시작일</Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="start-date"
                  className="bg-orange-100 text-orange-500 hover:bg-orange-400 hover:text-orange-100"
                >
                  <CalendarArrowUp />
                  {!currentStartDate ? '시작일 선택' : currentStartDate.toLocaleDateString()}
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
                    <DrawerClose className="w-2/3">
                      <Button className="w-full">확인</Button>
                    </DrawerClose>
                    <DrawerClose className="w-2/3">
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
            {errors.start_date && (
              <p className="ml-1 text-xs font-semibold text-orange-600">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="end-date">여행 종료일</Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="end-date"
                  className="bg-orange-100 text-orange-500 hover:bg-orange-400 hover:text-orange-100"
                >
                  <CalendarArrowDown />
                  {!currentEndDate ? '종료일 선택' : currentEndDate.toLocaleDateString()}
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
                    <DrawerClose className="w-2/3">
                      <Button className="w-full">확인</Button>
                    </DrawerClose>
                    <DrawerClose className="w-2/3">
                      <Button className="w-full" onClick={() => handleCancelDatePicker('end_date')}>
                        취소
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {errors.end_date && (
              <p className="ml-1 text-xs font-semibold text-orange-600">
                {errors.end_date.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              name="budget"
              control={control}
              render={({ field }) => {
                const selectedCountry = watch('country')

                return (
                  <>
                    <div className="flex items-center justify-between gap-5">
                      <Label htmlFor="budget">여행 예산</Label>
                      <div>
                        {selectedCountry && (
                          <div className="flex items-center gap-2">
                            <p>{COUNTRY_MAP[selectedCountry].emoji}</p>
                            <p className="text-sm font-semibold">
                              {COUNTRY_MAP[selectedCountry].currency}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
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
                      pattern="[0-9]*"
                    />
                  </>
                )
              }}
            />
            {errors.budget && (
              <p className="ml-1 text-xs font-semibold text-orange-600">{errors.budget.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">메모 (선택)</Label>
            <Input id="description" {...register('description')} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            <Button type="submit" className="w-1/5 bg-orange-400 text-xs hover:bg-orange-500">
              저장
            </Button>
            <Button
              type="button"
              className="w-1/5 text-xs text-orange-500"
              variant="secondary"
              onClick={handleCancelCreateTrip}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

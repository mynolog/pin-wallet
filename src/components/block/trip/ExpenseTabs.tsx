import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { COUNTRY_MAP } from '@/constants/country'
import { useExpenses } from '@/hooks/expenses/useExpenses'
import { getDateRange } from '@/lib/utils'
import { format } from 'date-fns'

interface ExpenseTabsProps {
  startDate: string
  endDate: string
  country: string
}

export default function ExpenseTabs({ startDate, endDate, country }: ExpenseTabsProps) {
  const { data: expenses, isLoading, error } = useExpenses()
  const dates = getDateRange(startDate, endDate)
  const today = format(new Date(), 'yyyy-MM-dd')
  const defaultTab = dates.includes(today) ? today : 'all'

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        {dates.map((date) => {
          const day = new Date(date).getDate()
          return (
            <TabsTrigger value={date} key={date}>
              {day}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value="all" className="flex flex-col gap-2">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-32 w-full rounded-lg bg-gray-100" key={index} />
          ))}

        {error && (
          <div className="h-32 w-full">알 수 없는 오류가 발생했습니다. 새로고침 해주세요.</div>
        )}

        {!isLoading && !error && (expenses ?? []).length !== 0 && (
          <>
            {expenses?.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="py-2">
                  <div className="text-sm">{format(expense.created_at, 'M월 d일 HH:mm')}</div>
                  <div className="text-xl font-semibold text-emerald-500">
                    {COUNTRY_MAP[country].currencyCode}
                    {Intl.NumberFormat('ko-KR').format(expense.amount)}
                  </div>
                  <div className="text-sm">지출</div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </TabsContent>

      {dates.map((date) => (
        <TabsContent value={date} key={date} className="flex flex-col gap-2">
          {(expenses ?? [])
            .filter((expense) => format(new Date(expense.created_at), 'yyyy-MM-dd') === date)
            .map((expense) => (
              <Card key={expense.id}>
                <CardContent className="py-2">
                  <div className="text-sm">{format(expense.created_at, 'M월 d일 HH:mm')}</div>
                  <div className="text-xl font-semibold text-emerald-500">
                    &yen; {expense.amount}
                  </div>
                  <div className="text-sm">지출</div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

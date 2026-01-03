import type { CountryCode } from '@/types/trip'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { COUNTRY_MAP } from '@/constants/country'
import { useExpenses } from '@/hooks/expenses/useExpenses'
import { getDateRange } from '@/lib/utils'
import { format } from 'date-fns'
import ExpenseOptionsMenu from '../expense/ExpenseOptionsMenu'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/stores/languageStore'

interface ExpenseTabsProps {
  startDate: string
  endDate: string
  country: CountryCode
  tripId: string
}

export default function ExpenseTabs({ startDate, endDate, country, tripId }: ExpenseTabsProps) {
  const { data: expenses, isLoading, error } = useExpenses(tripId)
  const { t } = useTranslation('trip')
  const language = useLanguageStore((state) => state.language)
  const dates = getDateRange(startDate, endDate)
  const today = format(new Date(), 'yyyy-MM-dd')
  const defaultTab = dates.includes(today) ? today : 'all'

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="all">{t('tab.all')}</TabsTrigger>
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

        {error && <div className="h-32 w-full">{t('error.fetch')}</div>}

        {!isLoading && !error && (expenses ?? []).length !== 0 && (
          <>
            {expenses?.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="flex justify-between py-2">
                  <div>
                    <div className="text-sm">
                      {format(
                        expense.created_at,
                        language === 'ko' ? 'M월 d일 HH:mm' : 'MMM d HH:mm',
                      )}
                    </div>
                    <div className="text-xl font-semibold text-emerald-500">
                      {COUNTRY_MAP[country].currencyCode}
                      {Intl.NumberFormat('ko-KR').format(expense.amount)}
                    </div>
                    <div className="text-sm">{t('expense-card.expense')}</div>
                  </div>
                  <ExpenseOptionsMenu
                    expenseOptions={{
                      id: expense.id,
                      trip_id: expense.trip_id,
                    }}
                  />
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
                <CardContent className="flex justify-between py-2">
                  <div>
                    <div className="text-sm">
                      {format(
                        expense.created_at,
                        language === 'ko' ? 'M월 d일 HH:mm' : 'MMM d HH:mm',
                      )}
                    </div>
                    <div className="text-xl font-semibold text-emerald-500">
                      {COUNTRY_MAP[country].currencyCode}
                      {Intl.NumberFormat('ko-KR').format(expense.amount)}
                    </div>
                    <div className="text-sm">{t('expense-card.expense')}</div>
                  </div>
                  <ExpenseOptionsMenu
                    expenseOptions={{
                      id: expense.id,
                      trip_id: expense.trip_id,
                    }}
                  />
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

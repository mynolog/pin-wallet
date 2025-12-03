import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDateRange } from '@/lib/utils'
import { format } from 'date-fns'

interface ExpenseTabsProps {
  startDate: string
  endDate: string
}

// UI 구현용 더미 데이터
const data = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    trip_id: '22222222-2222-2222-2222-222222222222',
    user_id: '33333333-3333-3333-3333-333333333333',
    description: null,
    created_at: '2025-12-06 13:06:22.172881+00',
    updated_at: null,
    amount: 100,
    latitude: '',
    longitude: '',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    trip_id: '22222222-2222-2222-2222-222222222222',
    user_id: '33333333-3333-3333-3333-333333333333',
    description: null,
    created_at: '2025-12-07 11:12:01.172881+00',
    updated_at: null,
    amount: 1000,
    latitude: '',
    longitude: '',
  },
]

export default function ExpenseTabs({ startDate, endDate }: ExpenseTabsProps) {
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
        {data.map((d) => (
          <Card key={d.id}>
            <CardContent className="py-2">
              <div className="text-sm">{format(d.created_at, 'M월 d일 HH:mm')}</div>
              <div className="text-xl font-semibold text-emerald-500">&yen; {d.amount}</div>
              <div className="text-sm">지출</div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      {dates.map((date) => (
        <TabsContent value={date} key={date} className="flex flex-col gap-2">
          {data
            .filter((d) => format(new Date(d.created_at), 'yyyy-MM-dd') === date)
            .map((d) => (
              <Card key={d.id}>
                <CardContent className="py-2">
                  <div className="text-sm">{format(d.created_at, 'M월 d일 HH:mm')}</div>
                  <div className="text-xl font-semibold text-emerald-500">&yen; {d.amount}</div>
                  <div className="text-sm">지출</div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  )
}

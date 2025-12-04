import type { CountryCode } from '@/types/trip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { COUNTRY_MAP } from '@/constants/country'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface BudgetOverviewCardProps {
  tripId: string
  budget: number
  country?: CountryCode
}

export default function BudgetOverviewCard({ tripId, country, budget }: BudgetOverviewCardProps) {
  const [budgetUsage, setBudgetUsage] = useState(100)
  const [usedAmount, setUsedAmount] = useState(0)

  useEffect(() => {
    if (!tripId) return

    const fetchExpensesAmount = async () => {
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select('amount')
        .eq('trip_id', tripId)
      if (error) {
        console.error(error)
        throw error
      }

      const totalExpenses = expenses?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0
      setUsedAmount(totalExpenses)
      const usedPercent = 100 - (totalExpenses / budget) * 100
      setBudgetUsage(usedPercent)
    }

    fetchExpensesAmount()
  }, [tripId, budget])

  return (
    <Card>
      <CardHeader>
        <Progress value={budgetUsage} className="[&>div]:bg-orange-600" />
        <div className="flex items-center justify-between">
          <CardTitle>남은 돈</CardTitle>
          {country && <span className="text-orange-500">{COUNTRY_MAP[country].currency}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center text-xl font-semibold">
          {country && (
            <>
              {COUNTRY_MAP[country].currencyCode}
              {Intl.NumberFormat('ko-KR').format(budget - usedAmount)}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

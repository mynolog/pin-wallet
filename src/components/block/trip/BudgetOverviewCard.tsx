import type { CountryCode } from '@/types/trip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { COUNTRY_MAP } from '@/constants/country'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'

interface BudgetOverviewCardProps {
  country?: CountryCode
  budget?: number
}

export default function BudgetOverviewCard({ country, budget }: BudgetOverviewCardProps) {
  const [budgetUsage, setBudgetUsage] = useState(100)

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
        <div className="flex items-center justify-center text-xl font-semibold">{budget}</div>
      </CardContent>
    </Card>
  )
}

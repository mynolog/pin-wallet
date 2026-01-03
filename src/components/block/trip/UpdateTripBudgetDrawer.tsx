import type { UpdateTripSupabaseDto } from '@/types/trip'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { DollarSign } from 'lucide-react'
import { useState } from 'react'
import UpdateTripBudgetForm from './UpdateTripBudgetForm'
import { useTranslation } from 'react-i18next'

interface UpdateTripBudgetDrawerProps {
  id: UpdateTripSupabaseDto['id']
  budget: UpdateTripSupabaseDto['budget']
}

export default function UpdateTripBudgetDrawer({ id, budget }: UpdateTripBudgetDrawerProps) {
  const [budgetDrawerOpen, setBudgetDrawerOpen] = useState(false)
  const { t: tTrip } = useTranslation('trip')

  return (
    <Drawer open={budgetDrawerOpen} onOpenChange={setBudgetDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-5 w-5" />
          <span>{tTrip('menu.budget')}</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>{tTrip('menu.budget')}</DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="p-4">
          <UpdateTripBudgetForm
            id={id}
            budget={budget}
            onSave={() => setBudgetDrawerOpen(false)}
            onCancel={() => setBudgetDrawerOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { BanknoteArrowDown } from 'lucide-react'
import CreateExpenseForm from './CreateExpenseForm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CreateExpenseDrawerProps {
  tripId: string
  className?: string
}

export default function CreateExpenseDrawer({ className, tripId }: CreateExpenseDrawerProps) {
  const [createExpenseDrawerOpen, setCreateExpenseDrawerOpen] = useState(false)
  const { t: tTrip } = useTranslation('trip')

  return (
    <div className={cn('', className)}>
      <Drawer open={createExpenseDrawerOpen} onOpenChange={setCreateExpenseDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <BanknoteArrowDown />
            <span>{tTrip('expense-card.create')}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <CreateExpenseForm
            tripId={tripId}
            onCancel={() => setCreateExpenseDrawerOpen(false)}
            onSave={() => setCreateExpenseDrawerOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    </div>
  )
}

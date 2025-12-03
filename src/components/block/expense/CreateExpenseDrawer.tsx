import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { BanknoteArrowDown } from 'lucide-react'

interface CreateExpenseDrawerProps {
  className?: string
}

export default function CreateExpenseDrawer({ className }: CreateExpenseDrawerProps) {
  return (
    <div className={cn('', className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <BanknoteArrowDown />
            <span>새로운 지출</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent></DrawerContent>
      </Drawer>
    </div>
  )
}

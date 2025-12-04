import type { UpdateExpenseSupabaseDto } from '@/types/expense'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import DeleteExpenseAlertDialog from './DeleteExpenseAlertDialog'

interface ExpenseOptionsMenuProps {
  expenseOptions: UpdateExpenseSupabaseDto
}

export default function ExpenseOptionsMenu({ expenseOptions }: ExpenseOptionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ul className="space-y-2 px-4 py-2">
          <li className="flex items-center gap-2 text-sm text-red-500">
            <DeleteExpenseAlertDialog id={expenseOptions.id} tripId={expenseOptions.trip_id} />
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

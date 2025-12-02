import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { EllipsisVertical } from 'lucide-react'
import UpdateTripTitleDrawer from './UpdateTripTitleDrawer'
import type { UpdateTripSupabaseDto } from '@/types/trip'
import UpdateTripBudgetDrawer from './UpdateTripBudgetDrawer'
import UpdateTripDescDrawer from './UpdateTripDescDrawer'
import DeleteTripAlertDialog from './DeleteTripAlertDialog'

interface TripOptionsMenuProps {
  tripOptions: UpdateTripSupabaseDto
}

export default function TripOptionsMenu({ tripOptions }: TripOptionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer p-2 hover:text-orange-400">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ul className="space-y-2 px-4 py-2">
          <li className="flex items-center gap-2 text-sm">
            <UpdateTripTitleDrawer id={tripOptions.id} title={tripOptions.title} />
          </li>
          <li className="flex items-center gap-2 text-sm">
            <UpdateTripBudgetDrawer id={tripOptions.id} budget={tripOptions.budget} />
          </li>
          <li className="flex items-center gap-2 text-sm">
            <UpdateTripDescDrawer id={tripOptions.id} description={tripOptions.description} />
          </li>
          <Separator />
          <li className="flex items-center gap-2 text-sm text-red-500">
            <DeleteTripAlertDialog id={tripOptions.id} />
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

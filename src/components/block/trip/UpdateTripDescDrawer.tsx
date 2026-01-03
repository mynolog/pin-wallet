import type { UpdateTripSupabaseDto } from '@/types/trip'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Captions } from 'lucide-react'
import { useState } from 'react'
import UpdateTripDescForm from './UpdateTripDescForm'
import { useTranslation } from 'react-i18next'

interface UpdateTripDescDrawerProps {
  id: UpdateTripSupabaseDto['id']
  description: UpdateTripSupabaseDto['description']
}

export default function UpdateTripDescDrawer({ id, description }: UpdateTripDescDrawerProps) {
  const [descDrawerOpen, setDescDrawerOpen] = useState(false)
  const { t: tTrip } = useTranslation('trip')

  return (
    <Drawer open={descDrawerOpen} onOpenChange={setDescDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <Captions className="h-5 w-5" />
          <span>{tTrip('menu.description')}</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>{tTrip('menu.description')}</DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="p-4">
          <UpdateTripDescForm
            id={id}
            description={description}
            onSave={() => setDescDrawerOpen(false)}
            onCancel={() => setDescDrawerOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

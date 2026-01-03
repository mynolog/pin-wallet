import type { UpdateTripSupabaseDto } from '@/types/trip'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { SquarePen } from 'lucide-react'
import UpdateTripTitleForm from './UpdateTripTitleForm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UpdateTripTitleDrawerProps {
  id: UpdateTripSupabaseDto['id']
  title: UpdateTripSupabaseDto['title']
}

export default function UpdateTripTitleDrawer({ id, title }: UpdateTripTitleDrawerProps) {
  const [titleDrawerOpen, setTitleDrawerOpen] = useState(false)
  const { t: tTrip } = useTranslation('trip')
  return (
    <Drawer open={titleDrawerOpen} onOpenChange={setTitleDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <SquarePen className="h-5 w-5" />
          <span>{tTrip('menu.title')}</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>{tTrip('menu.title')}</DrawerTitle>
          </DrawerHeader>
        </div>
        <div className="p-4">
          <UpdateTripTitleForm
            id={id}
            title={title}
            onSave={() => setTitleDrawerOpen(false)}
            onCancel={() => setTitleDrawerOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

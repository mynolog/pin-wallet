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

interface UpdateTripDescDrawerProps {
  id: UpdateTripSupabaseDto['id']
  description: UpdateTripSupabaseDto['description']
}

export default function UpdateTripDescDrawer({ id, description }: UpdateTripDescDrawerProps) {
  const [descDrawerOpen, setDescDrawerOpen] = useState(false)
  return (
    <Drawer open={descDrawerOpen} onOpenChange={setDescDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-2 text-sm">
          <Captions className="h-5 w-5" />
          <span>메모 편집</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>메모 편집</DrawerTitle>
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

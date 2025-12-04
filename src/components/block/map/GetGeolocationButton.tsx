import { Button } from '@/components/ui/button'
import { LocateFixed } from 'lucide-react'

interface GetGeolocationButtonProps {
  onClick: () => void
}

export default function GetGeolocationButton({ onClick }: GetGeolocationButtonProps) {
  return (
    <Button
      variant="outline"
      className="cursor-pointer p-2 hover:text-orange-400"
      onClick={onClick}
    >
      <LocateFixed />
      <span>현재 위치</span>
    </Button>
  )
}

import { LocateFixed } from 'lucide-react'

interface GetGeolocationButtonProps {
  onClick: () => void
}

export default function GetGeolocationButton({ onClick }: GetGeolocationButtonProps) {
  return (
    <div className="cursor-pointer p-2 hover:text-orange-400" role="button" onClick={onClick}>
      <LocateFixed />
    </div>
  )
}

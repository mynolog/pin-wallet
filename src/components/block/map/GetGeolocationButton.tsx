import { LocateFixed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface GetGeolocationButtonProps {
  onClick: () => void
}

export default function GetGeolocationButton({ onClick }: GetGeolocationButtonProps) {
  const { t } = useTranslation('map')

  return (
    <Button
      variant="outline"
      className="cursor-pointer p-2 hover:text-orange-400"
      onClick={onClick}
    >
      <LocateFixed />
      <span>{t('button.current-location')}</span>
    </Button>
  )
}

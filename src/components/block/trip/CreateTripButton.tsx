import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'
import { BadgePlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function CreateTripButton() {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  const handleNavigate = () => {
    navigate(ROUTES.TRIPS.NEW)
  }

  return (
    <Button variant="outline" onClick={handleNavigate}>
      <BadgePlus />
      <span>{t('button.new-trip')}</span>
    </Button>
  )
}

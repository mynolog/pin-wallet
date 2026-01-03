import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import CreateTripForm from '@/components/block/trip/CreateTripForm'
import { useTranslation } from 'react-i18next'

export default function CreateTripPage() {
  const { t } = useTranslation('createTrip')
  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title={t('page-title')} />
      <CreateTripForm />
    </div>
  )
}

import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import CreateTripForm from '@/components/block/trip/CreateTripForm'

export default function CreateTripPage() {
  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title="여행" />
      <CreateTripForm />
    </div>
  )
}

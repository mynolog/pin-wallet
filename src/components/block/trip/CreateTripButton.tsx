import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes'
import { useNavigate } from 'react-router'

export default function CreateTripButton() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(ROUTES.TRIPS.NEW)
  }

  return (
    <Button variant="outline" onClick={handleNavigate}>
      새로운 여행
    </Button>
  )
}

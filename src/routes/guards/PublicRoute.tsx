import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '../index'

interface PublicRouteProps {
  children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      if (location.state?.from) {
        navigate(location.state.from, { replace: true })
      } else {
        navigate(ROUTES.HOME, { replace: true })
      }
    }
  }, [isAuthenticated, location, navigate])

  if (isAuthenticated) return null
  return children
}

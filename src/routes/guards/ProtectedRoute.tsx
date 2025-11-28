import { useEffect, useRef } from 'react'
import { Navigate } from 'react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '..'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const toastShownRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated && !toastShownRef.current) {
      toast.error('로그인 후 이용할 수 있습니다.')
      toastShownRef.current = true
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SETTINGS} replace />
  }
  return children
}

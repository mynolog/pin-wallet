import { Spinner } from '@/components/ui/spinner'
import { supabase } from '@/lib/supabaseClient'
import { ROUTES } from '@/routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function GoogleCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleOAuth = async () => {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token })
        navigate(ROUTES.HOME)
      }
    }

    handleOAuth()
  }, [navigate])

  return (
    <div className="flex h-screen w-full items-center justify-center gap-4">
      <Spinner className="h-8 w-8 animate-spin text-orange-300" />
      <span className="text-sm font-semibold text-gray-700">로그인 처리 중입니다...</span>
    </div>
  )
}

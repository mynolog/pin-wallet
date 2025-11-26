import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabaseClient'
import { Spinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/stores/authStore'

export default function GoogleCallbackPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  useEffect(() => {
    const handleAuth = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error('getSession Error:', sessionError.message)
      }

      if (sessionData.session?.user) {
        setAuth(sessionData.session.user)
        navigate('/')
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setAuth(session.user)
          navigate('/')
        }
      })
    }

    handleAuth()
  }, [navigate, setAuth])

  return (
    <div className="flex h-screen w-full items-center justify-center gap-4">
      <Spinner className="h-8 w-8 animate-spin text-orange-300" />
      <span className="text-sm font-semibold text-gray-700">로그인 처리 중입니다...</span>
    </div>
  )
}

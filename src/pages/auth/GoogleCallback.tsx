import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabaseClient'
import { Spinner } from '@/components/ui/spinner'

export default function GoogleCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuth = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error('getSession Error:', sessionError.message)
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          console.log('Signed in session:', session)
          navigate('/')
        }
      })

      if (sessionData.session) {
        console.log('Existing session:', sessionData.session)
        navigate('/')
      }
    }

    handleAuth()
  }, [navigate])

  return (
    <div className="flex h-screen w-full items-center justify-center gap-4 bg-gray-50">
      <Spinner className="h-8 w-8 animate-spin text-blue-500" />
      <span className="text-sm font-semibold text-gray-700">로그인 요청 중...</span>
    </div>
  )
}

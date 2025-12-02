import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/authStore'

export function useSupabaseAuthSync() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    const syncAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('AuthError:', error)
      }
      if (data.session?.user) {
        setAuth(data.session.user)
      }
    }
    syncAuth()

    const { data: listner } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setAuth(session.user)
      } else if (event === 'SIGNED_OUT') {
        clearAuth()
      } else if (event === 'TOKEN_REFRESHED') {
        setAuth(session?.user ?? null)
      }
    })

    return () => {
      listner.subscription.unsubscribe()
    }
  }, [clearAuth, setAuth])
}

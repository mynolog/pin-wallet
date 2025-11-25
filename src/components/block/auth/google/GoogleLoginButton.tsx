import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
}

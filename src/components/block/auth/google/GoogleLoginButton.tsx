import { FaGoogle } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { cn } from '@/lib/utils'

interface GoogleLoginButtonProps {
  className?: string
}

export function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
  const handleGoogleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      className={cn('cursor-pointer bg-[#4285F4] hover:bg-[#357AE8]', className)}
    >
      <FaGoogle />
      <span>Google</span>
    </Button>
  )
}

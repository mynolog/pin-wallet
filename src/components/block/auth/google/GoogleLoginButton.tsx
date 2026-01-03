import { FaGoogle } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface GoogleLoginButtonProps {
  className?: string
}

export function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
  const { t } = useTranslation('common')
  const BASE_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_APP_BASE_URL
      : window.location.origin
  const handleGoogleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${BASE_URL}/auth/callback`,
      },
    })
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      className={cn('cursor-pointer bg-[#4285F4] hover:bg-[#357AE8]', className)}
    >
      <FaGoogle />
      <span>{t('login.google')}</span>
    </Button>
  )
}

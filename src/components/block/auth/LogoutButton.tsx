import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { useTranslation } from 'react-i18next'

interface LogoutButtonProps {
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
}

export default function LogoutButton({ className, variant }: LogoutButtonProps) {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const { t } = useTranslation('common')

  const handleLogout = () => {
    clearAuth()
  }
  return (
    <Button
      onClick={handleLogout}
      className={cn('bg-orange-400 text-xs hover:bg-orange-600', className)}
      variant={variant}
    >
      <LogOutIcon />
      <span>{t('logout')}</span>
    </Button>
  )
}

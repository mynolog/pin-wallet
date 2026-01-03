import { useTranslation } from 'react-i18next'
import { GoogleLoginButton } from '@/components/block/auth/google/GoogleLoginButton'
import LogoutButton from '@/components/block/auth/LogoutButton'
import MobilePageHeader from '@/components/block/mobile/MobilePageHeader'
import LanguageSelector from '@/components/block/setting/LanguageSelector'
import ThemeSelector from '@/components/block/setting/ThemeSelector'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import pkg from '../../../package.json'

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { t } = useTranslation('settings')

  return (
    <div className="flex h-screen flex-col">
      <MobilePageHeader title={t('page-title')} />
      <div className="flex flex-1 flex-col items-center space-y-6 p-4">
        {isAuthenticated && user && (
          <>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="font-semibold">{t('profile.title')}</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Avatar className="flex h-16 w-16 items-center justify-center rounded-lg">
                  <AvatarImage src={user.user_metadata.avatar_url} alt="AvatarImage" />
                  <AvatarFallback>
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                      <span className="text-xl font-bold text-gray-600">
                        {user.user_metadata.full_name[0].toUpperCase()}
                      </span>
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.user_metadata.full_name}</p>
                  <p className="text-sm font-medium text-gray-700">{user.email}</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        <Card className="w-full">
          <CardHeader className="font-semibold">{t('app-setting.title')}</CardHeader>
          <CardContent>
            <ul className="flex w-full flex-col gap-3">
              <li className="flex items-center justify-between">
                <ThemeSelector />
              </li>
              <li className="flex items-center justify-between">
                <LanguageSelector />
              </li>
              <li className="flex items-center justify-between">
                <span>{t('app-setting.version.sub-title')}</span>
                <span className="text-orange-400">{pkg.version}</span>
              </li>
              {user && isAuthenticated ? (
                <li className="flex items-center justify-between">
                  <span>{t('app-setting.logout.sub-title')}</span>
                  <LogoutButton className="w-1/2 md:w-1/4" />
                </li>
              ) : (
                <li className="flex items-center justify-between">
                  <span>{t('app-setting.login.sub-title')}</span>
                  <GoogleLoginButton className="w-1/2 text-xs md:w-1/4" />
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

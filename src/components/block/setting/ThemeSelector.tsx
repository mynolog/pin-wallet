import { Moon, Sun, SunMoon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useThemeStore } from '@/stores/themeStore'
import type { Theme } from '@/types/setting'
import { useTranslation } from 'react-i18next'

export default function ThemeSelector() {
  const { theme, setTheme } = useThemeStore()
  const { t } = useTranslation('settings')

  return (
    <>
      <span>{t('app-setting.theme.sub-title')}</span>
      <Select defaultValue={theme} onValueChange={(value: Theme) => setTheme(value)}>
        <SelectTrigger className="w-1/2 md:w-1/4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="system">
              <div className="flex items-center justify-center gap-1">
                <SunMoon size="18" />
                <span>{t('app-setting.theme.options.system')}</span>
              </div>
            </SelectItem>
            <SelectItem value="light">
              <div className="flex items-center justify-center gap-1">
                <Sun size="18" />
                <span>{t('app-setting.theme.options.light')}</span>
              </div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center justify-center gap-1">
                <Moon size="18" />
                <span>{t('app-setting.theme.options.dark')}</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

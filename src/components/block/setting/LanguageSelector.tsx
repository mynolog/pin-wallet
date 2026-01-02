import type { Language } from '@/types/setting'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLanguageStore } from '@/stores/languageStore'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore()
  const { t } = useTranslation('settings')

  return (
    <>
      <span>{t('app-setting.language.sub-title')}</span>
      <Select defaultValue={language} onValueChange={(language: Language) => setLanguage(language)}>
        <SelectTrigger className="w-1/2 md:w-1/4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ko">{t('app-setting.language.options.ko')}</SelectItem>
            <SelectItem value="en">{t('app-setting.language.options.en')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

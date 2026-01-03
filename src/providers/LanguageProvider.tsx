import i18n from '@/i18n'
import { useLanguageStore } from '@/stores/languageStore'
import { useEffect } from 'react'

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return children
}

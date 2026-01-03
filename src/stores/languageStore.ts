import type { Language } from '@/types/setting'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-store',
      partialize: (state) => ({
        language: state.language,
      }),
    },
  ),
)

import type { Theme } from '@/types/setting'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-store',
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
)

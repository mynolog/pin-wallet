import { Toaster as ToasterProvider } from 'sonner'
import TanstackQueryClientProvider from './TanstackQueryProvider'
import { AuthProvider } from './AuthProvider'
import ThemeProvider from './ThemeProvider'
import LanguageProvider from './LanguageProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TanstackQueryClientProvider>
            {children}
            <ToasterProvider position="top-center" />
          </TanstackQueryClientProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

import { Toaster as ToasterProvider } from 'sonner'
import TanstackQueryClientProvider from './TanstackQueryProvider'
import { AuthProvider } from './AuthProvider'
import ThemeProvider from './ThemeProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TanstackQueryClientProvider>
          {children}
          <ToasterProvider position="top-center" />
        </TanstackQueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

import { Toaster as ToasterProvider } from 'sonner'
import TanstackQueryClientProvider from './TanstackQueryProvider'
import { AuthProvider } from './AuthProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <TanstackQueryClientProvider>
        {children}
        <ToasterProvider position="top-center" />
      </TanstackQueryClientProvider>
    </AuthProvider>
  )
}

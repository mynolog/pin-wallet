import { Toaster as ToasterProvider } from 'sonner'
import TanstackQueryClientProvider from './TanstackQueryProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <TanstackQueryClientProvider>
      {children}
      <ToasterProvider position="top-center" />
    </TanstackQueryClientProvider>
  )
}

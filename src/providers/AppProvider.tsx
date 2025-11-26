import { Toaster as ToasterProvider } from 'sonner'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      {children}
      <ToasterProvider position="top-center" />
    </>
  )
}

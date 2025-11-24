import { RouterProvider } from 'react-router'
import { router } from './routes/router'
import AppProvider from './providers/AppProvider'

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

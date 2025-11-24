import MobileNavigator from '@/components/block/mobile/MobileNavigator'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center p-4">
        <Outlet />
      </main>
      <MobileNavigator />
    </div>
  )
}

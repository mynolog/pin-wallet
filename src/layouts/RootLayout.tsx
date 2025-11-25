import MobileNavigator from '@/components/block/mobile/MobileNavigator'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div className="flex h-screen w-full max-w-md items-center justify-center sm:max-w-sm">
      <div className="flex h-screen w-md items-center justify-center sm:w-sm">
        <main className="flex h-screen flex-1 flex-col p-4">
          <Outlet />
        </main>
        <MobileNavigator />
      </div>
    </div>
  )
}

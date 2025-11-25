import MobileNavigationMenu from '@/components/block/mobile/MobileNavigationMenu'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-screen w-full max-w-2xl p-4">
        <main>
          <Outlet />
        </main>
        <MobileNavigationMenu className="fixed bottom-0 z-50 w-full max-w-2xl" />
      </div>
    </div>
  )
}

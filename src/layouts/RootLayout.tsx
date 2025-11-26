import MobileNavigationMenu from '@/components/block/mobile/MobileNavigationMenu'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-full max-w-2xl px-1 py-2">
        <main className="h-full w-full">
          <Outlet />
        </main>
        <MobileNavigationMenu className="fixed bottom-0 z-50 w-full max-w-2xl" />
      </div>
    </div>
  )
}

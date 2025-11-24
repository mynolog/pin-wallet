import { Outlet, Link } from 'react-router'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Travel Wallet</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">
            홈
          </Link>
          <Link to="/travel" className="text-blue-600 hover:underline">
            여행 대시보드
          </Link>
        </nav>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="border-t p-4 text-center text-sm text-gray-500">
        © 2025 Travel Wallet
      </footer>
    </div>
  )
}

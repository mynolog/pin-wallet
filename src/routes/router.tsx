import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/home/Home'
import TravelDashboard from '@/pages/travel/TravelDashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'travel',
        element: <TravelDashboard />,
      },
    ],
  },
])

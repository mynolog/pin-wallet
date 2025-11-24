import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/home/Home'
import MapPage from '@/pages/map/Map'
import SettingsPage from '@/pages/settings/Settings'
import ExpenseCreatePage from '@/pages/trip/expenses/ExpenseCreate'
import TripDetailPage from '@/pages/trip/TripDetail'
import { ROUTES } from './index'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.MAP,
        element: <MapPage />,
      },
      {
        path: ROUTES.TRIPS.ROOT,
        element: null,
      },
      {
        path: ROUTES.TRIPS.DETAIL(':tripId'),
        element: <TripDetailPage />,
      },
      {
        path: ROUTES.TRIPS.EDIT(':tripId'),
        element: null,
      },
      {
        path: ROUTES.TRIPS.DELETE(':tripId'),
        element: null,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_ROOT,
        element: null,
      },

      {
        path: ROUTES.TRIPS.EXPENSE_NEW(':tripId'),
        element: <ExpenseCreatePage />,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_DETAIL(':tripId', ':expenseId'),
        element: null,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_EDIT(':tripId', ':expenseId'),
        element: null,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_DELETE(':tripId', ':expenseId'),
        element: null,
      },

      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])

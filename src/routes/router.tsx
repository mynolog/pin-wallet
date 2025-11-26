import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/home/Home'
import MapPage from '@/pages/map/Map'
import SettingsPage from '@/pages/settings/Settings'
import ExpenseCreatePage from '@/pages/trip/expenses/ExpenseCreate'
import TripDetailPage from '@/pages/trip/TripDetail'
import { ROUTES } from './index'
import GoogleCallbackPage from '@/pages/auth/GoogleCallback'
import ProtectedRoute from './guards/ProtectedRoute'
import PublicRoute from './guards/PublicRoute'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MAP,
        element: <MapPage />,
      },
      {
        path: ROUTES.TRIPS.ROOT,
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.DETAIL(':tripId'),
        element: (
          <ProtectedRoute>
            <TripDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.TRIPS.EDIT(':tripId'),
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.DELETE(':tripId'),
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_ROOT,
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_NEW(':tripId'),
        element: (
          <ProtectedRoute>
            <ExpenseCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.TRIPS.EXPENSE_DETAIL(':tripId', ':expenseId'),
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_EDIT(':tripId', ':expenseId'),
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.TRIPS.EXPENSE_DELETE(':tripId', ':expenseId'),
        element: <ProtectedRoute>{null}</ProtectedRoute>,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: 'auth/callback',
        element: (
          <PublicRoute>
            <GoogleCallbackPage />
          </PublicRoute>
        ),
      },
    ],
  },
])

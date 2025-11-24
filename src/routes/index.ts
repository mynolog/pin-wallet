export const ROUTES = {
  HOME: '/',
  MAP: '/map',
  TRIPS: {
    ROOT: '/trips',
    NEW: '/trips/new',
    DETAIL: (tripId: string) => `/trips/${tripId}`,
    EDIT: (tripId: string) => `/trips/${tripId}/edit`,
    DELETE: (tripId: string) => `/trips/${tripId}/delete`,

    EXPENSE_ROOT: 'expense',
    EXPENSE_NEW: (tripId: string) => `/trips/${tripId}/expenses/new`,
    EXPENSE_DETAIL: (tripId: string, expenseId: string) => `/trips/${tripId}/expenses/${expenseId}`,
    EXPENSE_EDIT: (tripId: string, expenseId: string) =>
      `/trips/${tripId}/expenses/${expenseId}/edit`,
    EXPENSE_DELETE: (tripId: string, expenseId: string) =>
      `/trips/${tripId}/expenses/${expenseId}/delete`,
  },
  SETTINGS: '/settings',
} as const

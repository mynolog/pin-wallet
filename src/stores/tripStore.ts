import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TripState {
  tripId: string | null
  isSelected: boolean

  setTripId: (tripId: string | null) => void
  clearTripId: () => void
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      tripId: null,
      isSelected: false,
      setTripId: (tripId) =>
        set({
          tripId,
          isSelected: !!tripId,
        }),
      clearTripId: () => {
        set({
          tripId: null,
          isSelected: false,
        })
      },
    }),
    {
      name: 'trip-store',
      partialize: (state) => ({
        tripId: state.tripId,
        isSelected: state.isSelected,
      }),
    },
  ),
)

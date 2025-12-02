import { supabase } from '@/lib/supabaseClient'

// Read
export async function fetchTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('start_date', { ascending: true })
  if (error) throw error
  return data
}
export async function fetchTripDetail(tripId: string | null) {
  if (!tripId) return null
  const { data, error } = await supabase.from('trips').select('*').eq('id', tripId).single()
  if (error) throw error
  return data
}

// Delete
export async function deleteTrip(tripId: string, userId: string) {
  const { error } = await supabase.from('trips').delete().eq('id', tripId).eq('user_id', userId)
  if (error) throw error
}

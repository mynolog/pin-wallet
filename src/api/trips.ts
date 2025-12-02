import { supabase } from '@/lib/supabaseClient'

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

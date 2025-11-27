import { supabase } from '@/lib/supabaseClient'

export async function fetchTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('start_date', { ascending: false })
  if (error) throw error
  return data
}

import { supabase } from '@/lib/supabaseClient'

export async function fetchExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

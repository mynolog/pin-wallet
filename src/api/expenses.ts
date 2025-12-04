import { supabase } from '@/lib/supabaseClient'

export async function fetchExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteExpense(expenseId: string, tripId: string, userId: string) {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId)
    .eq('trip_id', tripId)
    .eq('user_id', userId)
  if (error) throw error
}

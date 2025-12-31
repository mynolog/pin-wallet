import { supabase } from '@/lib/supabaseClient'
import type { CreateExpenseSupabaseDto } from '@/types/expense'

export async function fetchExpenses(tripId: string) {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('trip_id', tripId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createExpense(payload: CreateExpenseSupabaseDto) {
  const { error } = await supabase.from('expenses').insert(payload).select('*')
  if (error) throw error
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

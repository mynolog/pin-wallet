import type { Database } from './supabase'

export type ExpenseCategories = Database['public']['Enums']['expense_categories']

export type CreateExpenseSupabaseDto = Database['public']['Tables']['expenses']['Insert']

export type UpdateExpenseSupabaseDto = Pick<
  Database['public']['Tables']['expenses']['Update'],
  'id' | 'trip_id' | 'description' | 'amount' | 'updated_at'
>

export type DeleteExpenseSupabaseDto = Pick<
  Database['public']['Tables']['expenses']['Update'],
  'id' | 'trip_id'
>

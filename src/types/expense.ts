import type { Database } from './supabase'

export type ExpenseCategories = Database['public']['Enums']['expense_categories']

export type CreateExpenseSupabaseDto = Database['public']['Tables']['expenses']['Insert']

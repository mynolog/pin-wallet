import type { Database } from './supabase'

export type CountryCode = Database['public']['Enums']['country_code']

export type CreateTripSupabaseDto = Database['public']['Tables']['trips']['Insert']

export type UpdateTripSupabaseDto = Pick<
  Database['public']['Tables']['trips']['Update'],
  'id' | 'title' | 'budget' | 'description' | 'updated_at'
>

export type DeleteTripSupabaseDto = Pick<Database['public']['Tables']['trips']['Update'], 'id'>

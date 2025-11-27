import type { Database } from './supabase'

export type CountryCode = Database['public']['Enums']['country_code']

export type TripInsert = Database['public']['Tables']['trips']['Insert']

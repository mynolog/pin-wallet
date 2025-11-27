import type { Database } from '@/types/supabase'

export type CountryCode = Database['public']['Enums']['country_code']

export const COUNTRY_EMOJI_MAP: Record<CountryCode, string> = {
  JP: '🇯🇵',
  KR: '🇰🇷',
} as const

import type { CountryCode } from '@/types/trip'

interface CountryMap {
  label: string
  currency: string
  emoji: string
}

export const COUNTRY_MAP: Record<CountryCode, CountryMap> = {
  JP: {
    label: '일본',
    currency: 'JPY',
    emoji: '🇯🇵',
  },
  KR: {
    label: '대한민국',
    currency: 'KRW',
    emoji: '🇰🇷',
  },
} as const

export const COUNTRY_CODES = ['JP', 'KR'] as const

export const COUNTRY_OPTIONS = Object.entries(COUNTRY_MAP).map(([code, info]) => ({
  value: code as CountryCode,
  label: info.label,
  emoji: info.emoji,
}))

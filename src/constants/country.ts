import type { CountryCode } from '@/types/trip'

interface CountryMap {
  labelKey: string
  currency: string
  currencyCode: string
  emoji: string
}

export const COUNTRY_MAP: Record<CountryCode, CountryMap> = {
  JP: {
    labelKey: 'form.country.jp',
    currency: 'JPY',
    currencyCode: '¥',
    emoji: '🇯🇵',
  },
  KR: {
    labelKey: 'form.country.ko',
    currency: 'KRW',
    currencyCode: '₩',
    emoji: '🇰🇷',
  },
} as const

export const COUNTRY_CODES = ['JP', 'KR'] as const

export const COUNTRY_OPTIONS = Object.entries(COUNTRY_MAP).map(([code, info]) => ({
  value: code as CountryCode,
  labelKey: info.labelKey,
  emoji: info.emoji,
}))

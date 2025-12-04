import type { ExpenseCategories } from '@/types/expense'

interface ExpenseCategoriesMap {
  label: string
  emoji: string
}

export const EXPENSE_CATEGORIES_MAP: Record<ExpenseCategories, ExpenseCategoriesMap> = {
  UNCATEGORIZED: {
    label: '미분류',
    emoji: '📦',
  },
  FOOD: {
    label: '식비',
    emoji: '🍱',
  },
  TRANSPORT: {
    label: '교통',
    emoji: '🚌',
  },
  SHOPPING: {
    label: '쇼핑',
    emoji: '🛍️',
  },
  SIGHTSEEING: {
    label: '관광',
    emoji: '🗼',
  },
  ACCOMMODATION: {
    label: '숙박',
    emoji: '🛏️',
  },
}

export const EXPENSE_CATEGORIES = [
  'UNCATEGORIZED',
  'FOOD',
  'TRANSPORT',
  'SHOPPING',
  'SIGHTSEEING',
  'ACCOMMODATION',
] as const

export const EXPENSE_CATEGORY_OPTIONS = Object.entries(EXPENSE_CATEGORIES_MAP).map(
  ([category, info]) => ({
    value: category as ExpenseCategories,
    label: info.label,
    emoji: info.emoji,
  }),
)

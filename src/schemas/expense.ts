import { EXPENSE_CATEGORIES } from '@/constants/category'
import z from 'zod'

export const createExpenseFormSchema = z.object({
  category: z.enum(EXPENSE_CATEGORIES),
  amount: z.number({ error: '금액을 입력해주세요.' }),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export type CreateExpenseSchema = z.infer<typeof createExpenseFormSchema>

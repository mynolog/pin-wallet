import { COUNTRY_CODES } from '@/constants/country'
import z from 'zod'

export const createTripFormSchema = z.object({
  title: z.string().min(1, '여행 제목을 입력해주세요.'),
  country: z.enum(COUNTRY_CODES, { error: '국가를 선택해주세요.' }),
  start_date: z.date({ error: '여행 시작일을 선택해주세요.' }),
  end_date: z.date({ error: '여행 종료일을 선택해주세요.' }),
  budget: z
    .number({ error: '여행 예산을 입력해주세요.' })
    .min(1, '예산은 최소 1 이상 입력해주세요.'),
  description: z.string().optional(),
})

export type CreateTripSchema = z.infer<typeof createTripFormSchema>

export const updateTripSchema = createTripFormSchema.pick({
  title: true,
  budget: true,
  description: true,
})

export type UpdateTripSchema = z.infer<typeof updateTripSchema>

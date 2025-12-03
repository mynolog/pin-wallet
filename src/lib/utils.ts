import { clsx, type ClassValue } from 'clsx'
import { addDays, format, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateRange(startDate: string, endDate: string) {
  const dates: string[] = []
  let current = parseISO(startDate)
  const last = parseISO(endDate)

  while (current <= last) {
    dates.push(format(current, 'yyyy-MM-dd'))
    current = addDays(current, 1)
  }

  return dates
}

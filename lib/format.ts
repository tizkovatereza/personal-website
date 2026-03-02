import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'MMMM d, yyyy')
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'MMM d, yyyy')
}

export function getYear(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'yyyy')
}

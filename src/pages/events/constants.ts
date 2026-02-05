import type { Severity, Filters } from '@/types/events'

export const SEVERITY_COLORS: Record<Severity, string> = {
  Info: 'blue',
  Warning: 'orange',
  Error: 'red',
}

export const SEVERITY_OPTIONS = [
  { value: 'Info' as const, label: 'Info' },
  { value: 'Warning' as const, label: 'Warning' },
  { value: 'Error' as const, label: 'Error' },
]

export const EMPTY_FILTERS: Filters = {}

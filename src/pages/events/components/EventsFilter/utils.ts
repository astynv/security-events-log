import type { SecurityEvent, SortOrder } from '@/types/events'
import type { Nullable } from '@/types/common'

interface FilterParams {
  severity?: Nullable<string>
  user?: Nullable<string>
  dateFrom?: Nullable<string>
  dateTo?: Nullable<string>
}

export function filterEvents(
  events: SecurityEvent[],
  params: FilterParams
): SecurityEvent[] {
  let filtered = [...events]

  if (params.severity) {
    filtered = filtered.filter((e) => e.severity === params.severity)
  }

  if (params.user) {
    filtered = filtered.filter((e) =>
      e.user.toLowerCase().includes(params.user!.toLowerCase())
    )
  }

  if (params.dateFrom) {
    filtered = filtered.filter((e) => e.timestamp >= params.dateFrom!)
  }

  if (params.dateTo) {
    filtered = filtered.filter((e) => e.timestamp <= params.dateTo!)
  }

  return filtered
}

export function sortEventsByDate(
  events: SecurityEvent[],
  order: SortOrder = 'desc'
): SecurityEvent[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

import type {
  EventsRequest,
  EventsResponse,
  SecurityEvent,
} from '@/types/events'

const API_URL = '/api/events'

export async function fetchEvents(
  params: EventsRequest
): Promise<EventsResponse> {
  const { pagination, filters, sort } = params

  const searchParams = new URLSearchParams()
  searchParams.set('page', String(pagination.page))
  searchParams.set('size', String(pagination.size))

  if (filters?.severity) {
    searchParams.set('severity', filters.severity)
  }

  if (filters?.user) {
    searchParams.set('user', filters.user)
  }

  if (filters?.dateFrom) {
    searchParams.set('dateFrom', filters.dateFrom)
  }

  if (filters?.dateTo) {
    searchParams.set('dateTo', filters.dateTo)
  }

  if (sort) {
    searchParams.set('sortOrder', sort.order)
  }

  const response = await fetch(`${API_URL}?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
}

export async function fetchEventById(id: string): Promise<SecurityEvent> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Event not found')
  }

  return response.json()
}

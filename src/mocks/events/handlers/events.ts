import { http, HttpResponse, delay } from 'msw'
import type { EventsResponse, SortOrder } from '@/types/events'
import { mockEvents } from '../data/events'
import {
  filterEvents,
  sortEventsByDate,
} from '../../../pages/events/components/EventsFilter/utils'
import {
  NETWORK_DELAY,
  NETWORK_DELAY_SHORT,
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  DEFAULT_SORT_ORDER,
} from './constants'

export const eventsHandlers = [
  http.get('/api/events', async ({ request }) => {
    await delay(NETWORK_DELAY)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || DEFAULT_PAGE
    const size = Number(url.searchParams.get('size')) || DEFAULT_SIZE
    const severity = url.searchParams.get('severity')
    const user = url.searchParams.get('user')
    const dateFrom = url.searchParams.get('dateFrom')
    const dateTo = url.searchParams.get('dateTo')
    const sortOrderParam = url.searchParams.get('sortOrder')
    const sortOrder: SortOrder =
      sortOrderParam === 'asc' || sortOrderParam === 'desc'
        ? sortOrderParam
        : DEFAULT_SORT_ORDER

    const filtered = filterEvents(mockEvents, {
      severity,
      user,
      dateFrom,
      dateTo,
    })

    const sorted = sortEventsByDate(filtered, sortOrder)

    const start = (page - 1) * size
    const end = start + size
    const items = sorted.slice(start, end)

    const response: EventsResponse = {
      items,
      total: sorted.length,
      page,
      size,
    }

    return HttpResponse.json(response)
  }),

  http.get('/api/events/:id', async ({ params }) => {
    await delay(NETWORK_DELAY_SHORT)

    const { id } = params
    const event = mockEvents.find((e) => e.id === id)

    if (!event) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(event)
  }),
]

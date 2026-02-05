import { useSearchParams } from 'react-router-dom'
import type { EventsRequest, Filters, Sort } from '@/types/events'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const params: EventsRequest = {
    pagination: {
      page: Number(searchParams.get('page')) || DEFAULT_PAGE,
      size: Number(searchParams.get('size')) || DEFAULT_SIZE,
    },
    filters: {
      severity: searchParams.get('severity') as Filters['severity'],
      user: searchParams.get('user') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    },
    sort: searchParams.get('sortOrder')
      ? {
          field: 'timestamp',
          order: searchParams.get('sortOrder') as Sort['order'],
        }
      : undefined,
  }

  const setParams = (newParams: EventsRequest) => {
    const newSearchParams = new URLSearchParams()

    newSearchParams.set('page', String(newParams.pagination.page))
    newSearchParams.set('size', String(newParams.pagination.size))

    if (newParams.filters?.severity) {
      newSearchParams.set('severity', newParams.filters.severity)
    }

    if (newParams.filters?.user) {
      newSearchParams.set('user', newParams.filters.user)
    }

    if (newParams.filters?.dateFrom) {
      newSearchParams.set('dateFrom', newParams.filters.dateFrom)
    }

    if (newParams.filters?.dateTo) {
      newSearchParams.set('dateTo', newParams.filters.dateTo)
    }

    if (newParams.sort?.order) {
      newSearchParams.set('sortOrder', newParams.sort.order)
    }

    setSearchParams(newSearchParams)
  }

  return { params, setParams }
}

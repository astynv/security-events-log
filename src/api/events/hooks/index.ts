import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchEvents, fetchEventById } from '../endpoints'
import type { EventsRequest } from '@/types/events'
import type { Nullable } from '@/types/common'

export function useGetEvents(params: EventsRequest) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => fetchEvents(params),
    placeholderData: keepPreviousData,
  })
}

export function useGetEvent(id: Nullable<string>) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id!),
    enabled: !!id,
  })
}

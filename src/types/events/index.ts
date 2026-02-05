export type EventType =
  | 'Login'
  | 'Logout'
  | 'File Access'
  | 'File Modify'
  | 'Permission Change'
  | 'System Alert'

export type Severity = 'Info' | 'Warning' | 'Error'

export type SortOrder = 'asc' | 'desc'

export interface SecurityEvent {
  id: string
  timestamp: string
  type: EventType
  severity: Severity
  user: string
  workstation: string
  ip: string
  userAgent: string
  location: string
  sessionId: string
  details: string
}

export interface Filters {
  severity?: Severity
  user?: string
  dateFrom?: string
  dateTo?: string
}

export interface Sort {
  field: 'timestamp'
  order: SortOrder
}

export interface Pagination {
  page: number
  size: number
}

export interface EventsRequest {
  pagination: Pagination
  filters?: Filters
  sort?: Sort
}

export interface EventsResponse {
  items: SecurityEvent[]
  total: number
  page: number
  size: number
}

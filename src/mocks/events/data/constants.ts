import type { EventType, Severity } from '@/types/events'

export const eventTypes: EventType[] = [
  'Login',
  'Logout',
  'File Access',
  'File Modify',
  'Permission Change',
  'System Alert',
]

export const severities: Severity[] = ['Info', 'Warning', 'Error']

export const users = [
  'Alex Johnson',
  'Emily Clark',
  'Daniel Roberts',
  'Laura Martinez',
  'Benjamin Harris',
  'Natalie Thompson',
  'Christopher Lee',
  'Victoria Walker',
]

export const workstations = [
  'WS-001',
  'WS-002',
  'WS-003',
  'WS-004',
  'LAPTOP-101',
  'LAPTOP-102',
  'SERVER-01',
  'SERVER-02',
]

export const locations = [
  'San Francisco, Headquarters',
  'Amsterdam, Office',
  'Toronto, Branch',
  'Remote (Home Office)',
]

export const userAgents = [
  'Chrome/120.0.0.0 (Windows)',
  'Safari/605.1.15 (MacOS)',
  'Firefox/121.0 (Windows)',
  'Chrome/120.0.0.0 (Linux)',
]

export const details: Record<EventType, string[]> = {
  Login: ['User login', 'Login from new device'],
  Logout: ['User logout', 'Session expired'],
  'File Access': ['File viewed', 'File downloaded'],
  'File Modify': ['File updated', 'File deleted'],
  'Permission Change': ['Permissions updated'],
  'System Alert': ['Security alert'],
}

import type { SecurityEvent } from '@/types/events'
import {
  eventTypes,
  severities,
  users,
  workstations,
  locations,
  userAgents,
  details,
} from './constants'
import {
  random,
  randomIP,
  randomSessionId,
  randomDate,
} from '../../utils/generators'

function createEvent(index: number): SecurityEvent {
  const type = random(eventTypes)

  return {
    id: `id_${String(index).padStart(5, '0')}`,
    timestamp: randomDate(30),
    type,
    severity: random(severities),
    user: random(users),
    workstation: random(workstations),
    ip: randomIP(),
    userAgent: random(userAgents),
    location: random(locations),
    sessionId: randomSessionId(),
    details: random(details[type]),
  }
}

export const mockEvents: SecurityEvent[] = []

for (let i = 1; i <= 150; i++) {
  mockEvents.push(createEvent(i))
}

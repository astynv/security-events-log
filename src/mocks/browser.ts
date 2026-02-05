import { setupWorker } from 'msw/browser'
import { eventsHandlers } from './events/handlers/events'

export const worker = setupWorker(...eventsHandlers)

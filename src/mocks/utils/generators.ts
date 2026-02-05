export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)] as T
}

export function randomIP(): string {
  const n = () => Math.floor(Math.random() * 256)
  return `192.168.${n()}.${n()}`
}

export function randomSessionId(): string {
  return `sess_${Math.random().toString(36).slice(2, 12)}`
}

export function randomDate(daysBack: number): string {
  const now = Date.now()
  const past = now - Math.random() * daysBack * 24 * 60 * 60 * 1000
  return new Date(past).toISOString()
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTripRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${s.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}`
  }
  return `${formatDate(start)} – ${formatDate(end)}`
}

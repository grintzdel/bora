export const formatSeconds = (seconds: number) =>
  seconds < 60 ? `${seconds} secondes` : `${Math.round(seconds / 60)} minutes`

export const formatRest = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  if (minutes === 0) return `repos ${rest} s`
  return rest === 0 ? `repos ${minutes} min` : `repos ${minutes} min ${rest}`
}

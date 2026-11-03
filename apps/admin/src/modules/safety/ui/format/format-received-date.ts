const receivedDay = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Paris',
})

export const formatReceivedDate = (isoDate: string) => `Reçu ${receivedDay.format(new Date(isoDate))}`

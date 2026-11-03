import type { Availability } from '../../../shared/core/domain/constants/availability.constant'

const MonthNames = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const

const SmallNumbers = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq'] as const

export const monthName = (month: number) => MonthNames[month] ?? ''

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const ofMonth = (month: number) => {
  const name = monthName(month)
  return /^[aeiouéèh]/i.test(name) ? `d'${name}` : `de ${name}`
}

export const cohortLabel = (cohortMonth: number, measuredMonth: number) =>
  `Inscrits ${ofMonth(cohortMonth)}, mesurés en ${monthName(measuredMonth)}`

export const countInWords = (count: number) => SmallNumbers[count] ?? String(count)

export const plural = (count: number, singular: string, pluralForm = `${singular}s`) =>
  count > 1 ? pluralForm : singular

export const AvailabilityInSentence: Record<Availability, string> = {
  lunch: 'le midi',
  'after-work': 'après le travail',
  weekend: 'le week-end',
}

export const StaffingHint: Record<Availability, string> = {
  lunch: 'Prévoyez du personnel en zone guidée entre 12 h et 14 h.',
  'after-work': 'Prévoyez du personnel en zone guidée entre 18 h et 20 h.',
  weekend: 'Prévoyez du personnel en zone guidée le samedi matin.',
}

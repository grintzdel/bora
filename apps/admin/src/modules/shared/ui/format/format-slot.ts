import type { Weekday } from '../../core/domain/constants/weekday.constant'
import type { Slot } from '../../core/domain/shared.domain-model'

const WeekdayLabel: Record<Weekday, string> = {
  monday: 'lundi',
  tuesday: 'mardi',
  wednesday: 'mercredi',
  thursday: 'jeudi',
  friday: 'vendredi',
  saturday: 'samedi',
  sunday: 'dimanche',
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const formatTime = (time: string) => {
  const [hours = '0', minutes = '00'] = time.split(':')
  const hour = `${Number(hours)} h`
  return minutes === '00' ? hour : `${hour} ${minutes}`
}

export const formatWeekday = (weekday: Weekday) => WeekdayLabel[weekday]

export const formatSlot = (slot: Slot) => `${capitalize(WeekdayLabel[slot.weekday])} ${formatTime(slot.time)}`

export const formatSlotTitle = (slot: Slot) => `${capitalize(WeekdayLabel[slot.weekday])}, ${formatTime(slot.time)}`

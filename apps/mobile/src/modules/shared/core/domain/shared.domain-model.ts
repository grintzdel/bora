import * as Schema from 'effect/Schema'

import { Gender } from './constants/gender.constant'
import { Level } from './constants/level.constant'
import { Weekday } from './constants/weekday.constant'
import { literalOf } from './literal-of'

export const WeekdaySchema = literalOf(Weekday)
export const GenderSchema = literalOf(Gender)
export const LevelSchema = literalOf(Level)

export const SlotSchema = Schema.Struct({
  weekday: WeekdaySchema,
  time: Schema.String.pipe(Schema.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)),
})

export type Slot = Schema.Schema.Type<typeof SlotSchema>

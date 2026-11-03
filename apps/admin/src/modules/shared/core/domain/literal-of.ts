import * as Schema from 'effect/Schema'

export const literalOf = <const T extends Record<string, string>>(values: T) =>
  Schema.Literal(...(Object.values(values) as [T[keyof T], ...T[keyof T][]]))

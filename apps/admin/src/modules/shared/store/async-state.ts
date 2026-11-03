import * as Cause from 'effect/Cause'
import * as Predicate from 'effect/Predicate'

export type SerializedError = { readonly _tag: string; readonly message: string }

export type AsyncState<T> = {
  readonly data: T | null
  readonly isLoading: boolean
  readonly error: SerializedError | null
}

export const idle = <T>(): AsyncState<T> => ({ data: null, isLoading: false, error: null })

export const loading = <T>(previous: AsyncState<T>): AsyncState<T> => ({ ...previous, isLoading: true, error: null })

export const loaded = <T>(data: T): AsyncState<T> => ({ data, isLoading: false, error: null })

export const failed = <T>(previous: AsyncState<T>, error: SerializedError | undefined): AsyncState<T> => ({
  ...previous,
  isLoading: false,
  error: error ?? { _tag: 'UnknownError', message: 'Erreur inconnue' },
})

export const serializeCause = (cause: Cause.Cause<unknown>): SerializedError => {
  const error = Cause.squash(cause)
  const message = error instanceof Error ? error.message : String(error)
  if (Predicate.hasProperty(error, '_tag') && typeof error._tag === 'string') {
    return { _tag: error._tag, message: message || error._tag }
  }
  return { _tag: 'UnknownError', message }
}

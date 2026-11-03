import type * as Effect from 'effect/Effect'

export type DemoControlGateway = {
  readonly reset: () => Effect.Effect<void>
  readonly simulatePartnerAbsence: () => Effect.Effect<void>
}

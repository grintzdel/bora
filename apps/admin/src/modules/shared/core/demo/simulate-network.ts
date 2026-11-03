import * as Duration from 'effect/Duration'
import * as Effect from 'effect/Effect'

export type DemoGatewayOptions = {
  readonly latencyMs: number
  readonly now: () => Date
}

export const simulateNetwork = (latencyMs: number) =>
  latencyMs > 0 ? Effect.sleep(Duration.millis(latencyMs)) : Effect.void

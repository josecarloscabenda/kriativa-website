import { getPayload, type Payload } from "payload"
import config from "@payload-config"

// Persist the Payload instance across HMR reloads in dev to avoid exhausting
// the Postgres connection pool on each route recompilation.
const globalForPayload = globalThis as unknown as {
  __payload?: Promise<Payload>
}

export async function getPayloadClient(): Promise<Payload> {
  if (!globalForPayload.__payload) {
    globalForPayload.__payload = getPayload({ config })
  }
  return globalForPayload.__payload
}

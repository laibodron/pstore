import { zEnvHost, zEnvNonemptyTrimmed, zEnvNonemptyTrimmedRequiredOnNotLocal } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zEnv = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  HOST_ENV: zEnvHost,
  SOURCE_VERSION: zEnvNonemptyTrimmedRequiredOnNotLocal,
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_WEBAPP_URL: zEnvNonemptyTrimmed,
})

const envFromBackend = (window as any).webappEnvFromBackend

// eslint-disable-next-line n/no-process-env
export const env = zEnv.parse(envFromBackend?.replaceMeWithPublicEnv ? process.env : envFromBackend)

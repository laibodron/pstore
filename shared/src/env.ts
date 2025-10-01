import { z } from 'zod'

const zEnvNonemptyTrimmed = z.string().trim().min(1)

declare global {
  const webappEnvFromBackend: Record<string, string> | undefined
}
const windowEnv = typeof webappEnvFromBackend !== 'undefined' ? webappEnvFromBackend : {}
const getSharedEnvVariable = (key: string) => windowEnv[`VITE_${key}`] || windowEnv[key] //|| process.env[`VITE_${key}`] || process.env[key]

const sharedEnvRaw = {
  WEBAPP_URL: getSharedEnvVariable('WEBAPP_URL'),
}

const zEnv = z.object({
  WEBAPP_URL: zEnvNonemptyTrimmed,
})

export const sharedEnv = zEnv.parse(sharedEnvRaw)

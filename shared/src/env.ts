/* eslint-disable n/no-process-env */
import { z } from 'zod'

const zEnvNonemptyTrimmed = z.string().trim().min(1)

declare global {
  // Глобальная переменная, которую может прокинуть backend в HTML при рендере
  const webappEnvFromBackend: Record<string, string> | undefined
}

declare const process: { env?: Record<string, string | undefined> } | undefined

// Определяем источник для windowEnv
const windowEnv = typeof webappEnvFromBackend !== 'undefined' ? webappEnvFromBackend : {}

// Аккуратно проверяем существование process
const getSharedEnvVariable = (key: string): string | undefined => {
  const nodeEnv = typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env : {}

  return windowEnv[`VITE_${key}`] || windowEnv[key] || nodeEnv[`VITE_${key}`] || nodeEnv[key]
}

const sharedEnvRaw = {
  WEBAPP_URL: getSharedEnvVariable('WEBAPP_URL'),
}

const zEnv = z.object({
  WEBAPP_URL: zEnvNonemptyTrimmed,
})

export const sharedEnv = zEnv.parse(sharedEnvRaw)

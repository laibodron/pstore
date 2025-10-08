import { env } from '../lib/env'

import crypto from 'crypto'

export const getPasswordHash = (password: string): string => {
  return crypto.createHash('sha256').update(`${env.PASSWORD_SALT}${password}`).digest('hex')
}

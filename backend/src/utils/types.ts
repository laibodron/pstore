import { type User } from '@prisma/client'
import { type Request } from 'express'
import _ from 'lodash'

export type ExpressRequest = Request & {
  user: User | undefined
}

const x = 0

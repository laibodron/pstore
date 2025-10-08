import { type User } from '@prisma/client'
import pick from '@pstore/shared/src/pick'

export const toClientMe = (user: User | null) => {
  return user && pick(user, ['id', 'username', 'name', 'email'])
}

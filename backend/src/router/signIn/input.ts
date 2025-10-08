import { zEmailRequired, zPhoneNumberRequired, zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  emailOrnumber: zPhoneNumberRequired.or(zEmailRequired),
  password: zStringRequired,
})

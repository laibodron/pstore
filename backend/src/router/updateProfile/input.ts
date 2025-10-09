import { zEmailRequired, zNickRequired, zPhoneNumberRequired, zStringOptional } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  email: zEmailRequired,
  phoneNumber: zPhoneNumberRequired,
  username: zNickRequired,
  name: zStringOptional,
  surname: zStringOptional,
  avatarUrl: z.string().nullable(),
})

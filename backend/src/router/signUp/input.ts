import {
  zEmailRequired,
  zNickRequired,
  zPhoneNumberRequired,
  zStringOptional,
  zStringRequired,
} from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  email: zEmailRequired,
  phoneNumber: zPhoneNumberRequired,
  username: zNickRequired,
  password: zStringRequired,
  name: zStringOptional,
  surname: zStringOptional,
  // avatarUrl: zStringOptional,
})

import { zEmailRequired, zPhoneNumberRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

import { zCartItem } from '../getCartList/output'

export const zCreateOrderInput = z.object({
  cartItems: z.array(zCartItem).nonempty(),
  phoneNumber: zPhoneNumberRequired,
  email: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    zEmailRequired.optional()
  ),
})

// .pick({ id: true, countInCart: true, price: true })

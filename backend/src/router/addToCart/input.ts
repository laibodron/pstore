import { zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zAddToCartInput = z.object({
  productId: zStringRequired,
  count: z.number().int().min(0),
})

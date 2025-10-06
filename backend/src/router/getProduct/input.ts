import { zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zGetProductInput = z.object({
  productId: zStringRequired,
})

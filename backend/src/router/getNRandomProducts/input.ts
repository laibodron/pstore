import { z } from 'zod'

export const zGetNRandomProductsInput = z.object({
  n: z.coerce.number(),
})

import { zStringOptional } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zGetProductsInput = z.object({
  // cursor: z.coerce.number().optional(),
  limit: z.coerce.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  sort: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'time-desc']).default('price-asc'),
  // search: zStringOptional,
})

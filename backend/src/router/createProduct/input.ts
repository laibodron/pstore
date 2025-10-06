import { zStringOptional, zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zCreateProductInput = z.object({
  article: zStringRequired,
  title: zStringRequired,
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  description: zStringOptional,
})

import { zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zGetProductsByIdInput = z.object({
  ids: z.array(zStringRequired),
})

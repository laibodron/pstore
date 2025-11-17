import { zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zCreateCategoryInput = z.object({
  name: zStringRequired,
})

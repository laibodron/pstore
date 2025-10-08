import { zStringOptional, zStringRequired } from '@pstore/shared/src/zod'
import { z } from 'zod'

export const zCreateProductInput = z.object({
  article: zStringRequired,
  title: zStringRequired,
  price: z
    .string()
    .trim()
    .regex(/^\d*[.,]?\d*$/, 'Цена должна содержать только цифры, точку или запятую')
    .refine((val) => val === '' || Number(val.replace(',', '.')) >= 0, 'Цена не может быть отрицательной'),
  description: zStringOptional,
})

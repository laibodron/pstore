import { cloudinaryUploadTypes } from '@pstore/shared/src/cloudinary'
import { getKeysAsArray } from '@pstore/shared/src/getKeysAsArray'
import { z } from 'zod'

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})

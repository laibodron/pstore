import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

import { createTrpcRouter } from '../lib/trpc'

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createProductTrpcRoute } from './createProduct'
import { getMeTrpcRoute } from './getMe'
import { getNRandomProductsTrpcRoute } from './getNRandomProducts'
import { getProductTrpcRoute } from './getProduct'
import { getProductsTrpcRoute } from './getProducts'
import { getProductsByIdTrpcRoute } from './getProductsById'
import { prepareCloudinaryUploadTrpcRoute } from './prepareCloudinaryUpload'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updatePasswordTrpcRoute } from './updatePassword'
import { updateProfileTrpcRoute } from './updateProfile'
// @endindex

export const trpcRouter = createTrpcRouter({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createProduct: createProductTrpcRoute,
  getMe: getMeTrpcRoute,
  getNRandomProducts: getNRandomProductsTrpcRoute,
  getProduct: getProductTrpcRoute,
  getProducts: getProductsTrpcRoute,
  getProductsById: getProductsByIdTrpcRoute,
  prepareCloudinaryUpload: prepareCloudinaryUploadTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>

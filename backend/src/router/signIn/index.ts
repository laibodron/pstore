import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'

import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpcLoggedProcedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      AND: [
        { OR: [{ email: input.emailOrnumber }, { phoneNumber: input.emailOrnumber }] },
        { password: getPasswordHash(input.password) },
      ],
    },
  })

  if (!user) {
    throw new ExpectedError('Invalid login or password')
  }

  const token = signJWT(user.id)

  return { token, userId: user.id }
})

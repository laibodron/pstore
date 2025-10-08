// import { sendWelcomeEmail } from '../../lib/emails'
import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'

import { zSignUpTrpcInput } from './input'
// input: {
//   email: string;
//   phoneNumber: string;
//   username: string;
//   password: string;
//   name?: string | undefined;
//   surname?: string | undefined;
//   avatarUrl?: string | undefined;
// }
export const signUpTrpcRoute = trpcLoggedProcedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUserWithUsername = await ctx.prisma.user.findUnique({
    where: {
      username: input.username,
    },
  })
  if (exUserWithUsername) {
    throw new ExpectedError('Username already exists')
  }

  const exUserWithEmail = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  })
  if (exUserWithEmail) {
    throw new ExpectedError('User with this email already exists')
  }

  const exUserWithNumber = await ctx.prisma.user.findUnique({
    where: {
      phoneNumber: input.phoneNumber,
    },
  })
  if (exUserWithNumber) {
    throw new ExpectedError('User with this phone number already exists')
  }

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      phoneNumber: input.phoneNumber,
      username: input.username,
      password: getPasswordHash(input.password),
      name: input.name,
      surname: input.surname,
    },
  })

  const token = signJWT(user.id)

  // sendWelcomeEmail({ user })

  return { token, userId: user.id }
})

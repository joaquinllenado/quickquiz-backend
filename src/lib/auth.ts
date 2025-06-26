import { ExpressAuth } from "@auth/express"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "@auth/express/providers/google"
import Resend from "@auth/express/providers/resend"
import { prisma } from "./prisma"

export const auth = ExpressAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: "joaquinllenado@gmail.com", 
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
})

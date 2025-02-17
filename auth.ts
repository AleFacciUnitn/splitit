import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
 
const prisma = new PrismaClient()


export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  ...authConfig,
})

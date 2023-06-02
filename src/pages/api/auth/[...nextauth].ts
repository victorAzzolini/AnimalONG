import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProviders from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { AuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProviders({
        name: 'credentials',
        credentials: {
            email: {label: 'email', type: 'email'},
            password: {label: 'password', type: 'password'}
        },
        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
                throw new Error('Invalid credentials')
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })

            if (!user || !user.hashedPassword) {
                throw new Error('Invalid credentials')
            }

            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            )

            if (!isCorrectPassword) {
              throw new Error('Invalid credentials')
            }

            
            return user
        }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, trigger, session, user}) {
      if(user?.id) {
        token.id = user.id
      } 
      if(trigger === "update" && session?.name) {
        token = session
        token.sub = session.id
      }
      return { ...token, ...user};
    },

    async session({ session, token }) {
      session.user  = token as any
      return { ...session }
    }
  }
};

export default NextAuth(authOptions)

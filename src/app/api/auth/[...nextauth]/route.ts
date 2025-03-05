import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              role: true,
              balance: true
            }
          });

          // Check if user exists
          if (!user) {
            console.log(`No user found for email: ${credentials.email}`);
            return null;
          }

          // Check if password matches
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            console.log(`Invalid password for email: ${credentials.email}`);
            return null;
          }

          // Important: Log full user object for debugging
          console.log("User authenticated successfully:", {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            balance: user.balance
          });

          // Return the user WITHOUT the password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            balance: user.balance || 0
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Include user data in the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.balance = user.balance || 0;
        token.role = user.role;
        // For debugging
        console.log("JWT callback - adding user data to token", { user, token });
      }
      return token;
    },
    async session({ session, token }) {
      // Include token data in the session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.balance = token.balance as number;
        session.user.role = token.role as string;
        // For debugging
        console.log("Session callback - updated session with token data", { token, session });
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
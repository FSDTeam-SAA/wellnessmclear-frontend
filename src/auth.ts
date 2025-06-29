import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "USER" | "ADMIN";
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(_, request) {
        const data = await request.json();

        if (data) {
          return {
            id: data._id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            role: data.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = String(token.id);
        if (token.role === "USER" || token.role === "ADMIN") {
          session.user.role = token.role;
        }
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;

      return token;
    },
  },
});

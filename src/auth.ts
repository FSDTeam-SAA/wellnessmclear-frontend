import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const data = await request.json();

        console.log(data);
        return null;
      },
    }),
  ],
});

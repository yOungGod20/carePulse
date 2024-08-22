import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUser } from "./actions/user.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const res = user as User;
        const data = await getUser(res.$id);
        token.sub = data.$id;
        token.name = data.name;
      } else {
        const data = await getUser(token.sub!);

        token.id = data.$id;
        token.name = data.name;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.sub!;
      session.user.name = token.name;
      return session;
    },
  },
});

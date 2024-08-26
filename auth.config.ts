import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import { Login } from "./schema/zod/loginForm";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/user.action";

const bcrypt = require("bcryptjs");
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const res = Login.safeParse(credentials);
          if (!res.success) return null;
          const Data = res.data;
          const user = await getUserByEmail(Data.email);
          if (!user) {
            throw new Error("User not found.");
          }

          const isCorrect = await bcrypt.compare(Data.password, user.password);

          if (!isCorrect) return null;

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

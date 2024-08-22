"use server";
import { ID, Query } from "node-appwrite";
import { database, users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { loginForm } from "@/schema/zod/loginForm";
import { isRedirectError } from "next/dist/client/components/redirect";
const bycrypt = require("bcryptjs");
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_TO } from "@/routes";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
} from "./token.action";
import { sendVerificationCode } from "./sendEmail";
import { redirect } from "next/dist/server/api-utils";
export const createUser = async (user: z.infer<typeof loginForm>) => {
  try {
    const hashedPassword = bycrypt.hash(user.password, 10);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      hashedPassword,
      user.name
    );
    return { newUser };
  } catch (error: any) {
    if (error && error?.code === 409) {
      console.log(error);
      return {
        error:
          "A user with the same id, email, or phone already exists in this project.",
      };
    }
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await users.get(id);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await users.list([Query.equal("email", [email])]);
    return user.users[0];
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "user not exist" };
    }
    const isCorrect = bycrypt.compare(user.password, password);
    if (!isCorrect) return { error: "password is not correct" };
    // console.log(user);
    if (!user.emailVerification) {
      const token = await createVerificationToken(user.email);
      const message = `Verification Code is ${token?.token}`;
      console.log(user.email);
      await sendVerificationCode({
        message,
        email: user.email,
        name: user.name,
      });

      return { success: "The email has been sent successfully" };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_TO,
    });

    return { user };
  } catch (error) {
    if (isRedirectError(error)) throw error;
  }
};

export const verification = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const existToken = await getVerificationTokenByEmail(email);
    if (!bycrypt.compare(existToken.token, token)) {
      return { error: "Verification code is not correct" };
    }
    const user = await getUserByEmail(email);
    if (!user) return { error: "User not exist" };
    await users.updateEmailVerification(user?.$id!, true);
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

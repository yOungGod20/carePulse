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
  deleteRegisterTokenByEmail,
  getRegisterTokenByEmail,
  getVerificationTokenByEmail,
} from "./token.action";
import { sendVerificationCode } from "./sendEmail";
import { redirect } from "next/dist/server/api-utils";
import { createRegisterToken } from "./token.action";
import { error } from "console";
import { createUsers, getUserByEmail, updateUser } from "./user.action";

export const register = async ({
  email,
  name,
  phone,
  password,
}: z.infer<typeof loginForm>) => {
  const user = await getUserByEmail(email);
  if (user) return { error: "This email has been used" };

  const token = await createRegisterToken({ email, name, phone, password });
  const message = `Verification Code is ${token?.token}`;
  await sendVerificationCode({
    message,
    email,
    name,
  });
  return { success: "The email has been sent successfully" };
};

export const createUser = async ({
  userEmail,
  passkey,
}: {
  userEmail: string;
  passkey: string;
}) => {
  try {
    const { email, password, phone, name, token } =
      await getRegisterTokenByEmail(userEmail);
    const isCorrect = await bycrypt.compare(passkey, token);
    if (!isCorrect) {
      return { error: "Verification Code is not correct" };
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    console.log("start", password, hashedPassword);
    const user = await createUsers({
      email,
      phone,
      password: hashedPassword,
      name,
    });

    await updateUser({ id: user.$id });
    await deleteRegisterTokenByEmail(email);
    return { success: "User has created successfully" };
  } catch (error: any) {
    if (error && error?.code === 409) {
      return {
        error: "A user with the same phone already exists in this project.",
      };
    }
    return console.log(error);
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
    const isCorrect = await bycrypt.compare(password, user.password);
    if (!isCorrect) return { error: "password is not correct" };
    // console.log(user);
    if (!user.emailVerification) {
      const token = await createVerificationToken(user.email);
      const message = `Verification Code is ${token?.token}`;
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
    const isCorrect = await bycrypt.compare(token, existToken.token);
    if (!isCorrect) {
      return { error: "Verification code is not correct" };
    }
    const user = await getUserByEmail(email);
    if (!user) return { error: "User not exist" };
    await updateUser({ id: user.$id });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

"use server";
import { ID, Query } from "node-appwrite";
import { users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { loginForm } from "@/schema/zod/loginForm";
import { isRedirectError } from "next/dist/client/components/redirect";

const bycrypt = require("bcryptjs");
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_TO } from "@/routes";
export const createUser = async (user: z.infer<typeof loginForm>) => {
  try {
    const { name, email, phone, password } = user;
    const hashedPassword = await bycrypt.hash(user.password, 10);
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
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_TO,
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
  }
};

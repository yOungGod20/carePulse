"use server";
import { ID, Query } from "node-appwrite";
import { users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return { newUser };
  } catch (error: any) {
    if (error && error?.code === 409) {
      console.log(error);
      return { error: "This email is already in use" };
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

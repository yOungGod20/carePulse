"use server";
import { database } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { Query } from "node-appwrite";
export const createUsers = async (values: any) => {
  try {
    const newUser = await database.createDocument(
      process.env.DATABASE!,
      process.env.USER!,
      ID.unique(),
      values
    );
    console.log(parseStringify(newUser));
    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ id }: { id: string }) => {
  try {
    console.log("fuck");
    const updatedUser = await database.updateDocument(
      process.env.DATABASE!,
      process.env.USER!,
      id,
      { emailVerification: true }
    );
    return parseStringify(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id: string) => {
  const user = await database.getDocument(
    process.env.DATABASE!,
    process.env.USER!,
    id
  );
  if (!user) {
    return { error: "Appointment not exist" };
  }

  return parseStringify(user);
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await database.listDocuments(
      process.env.DATABASE!,
      process.env.USER!,
      [Query.equal("email", [email])]
    );
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

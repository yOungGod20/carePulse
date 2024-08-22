"use server";
import { ID, Query } from "node-appwrite";
import { database } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import * as z from "zod";
import { loginForm } from "@/schema/zod/loginForm";
const bcrypt = require("bcryptjs");
export const createVerificationToken = async (email: string) => {
  try {
    const expiry = new Date(new Date().getTime() + 86400000);
    const num = Math.random().toFixed(6).slice(-6);
    const token = await bcrypt.hash(num, 10);
    const data = { expiry, email, token };
    const oldToken = await database.listDocuments(
      process.env.DATABASE!,
      process.env.TOKEN!,
      [Query.equal("email", email)]
    );

    if (oldToken.documents[0]) {
      await database.deleteDocument(
        process.env.DATABASE!,
        process.env.TOKEN!,
        oldToken.documents[0].$id
      );
    }

    const verificationToken = await database.createDocument(
      process.env.DATABASE!,
      process.env.TOKEN!,
      ID.unique(),
      data
    );
    return { token: num };
  } catch (error) {
    console.log(error);
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const documents = await database.listDocuments(
      process.env.DATABASE!,
      process.env.TOKEN!,
      [Query.equal("email", [email])]
    );
    return parseStringify(documents.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const createRegisterToken = async ({
  email,
  name,
  phone,
  password,
}: z.infer<typeof loginForm>) => {
  try {
    // const expiry = new Date(new Date().getTime() + 86400000);
    const num = Math.random().toFixed(6).slice(-6);
    const token = await bcrypt.hash(num, 10);
    const data = { name, email, phone, password, token };
    const oldToken = await database.listDocuments(
      process.env.DATABASE!,
      process.env.REGISTER_TOKEN!,
      [Query.equal("email", email)]
    );

    if (oldToken.documents[0]) {
      await database.deleteDocument(
        process.env.DATABASE!,
        process.env.REGISTER_TOKEN!,
        oldToken.documents[0].$id
      );
    }

    await database.createDocument(
      process.env.DATABASE!,
      process.env.REGISTER_TOKEN!,
      ID.unique(),
      data
    );
    return { token: num };
  } catch (error) {
    console.log(error);
  }
};

export const getRegisterTokenByEmail = async (email: string) => {
  try {
    const documents = await database.listDocuments(
      process.env.DATABASE!,
      process.env.REGISTER_TOKEN!,
      [Query.equal("email", [email])]
    );
    return parseStringify(documents.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRegisterTokenByEmail = async (email: string) => {
  try {
    const token = await getRegisterTokenByEmail(email);
    await database.deleteDocument(
      process.env.DATABASE!,
      process.env.REGISTER_TOKEN!,
      token.$id
    );
  } catch (error) {
    console.log(error);
    throw new Error("token not exist");
  }
};

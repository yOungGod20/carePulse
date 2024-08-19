"use server";
import { InputFile } from "node-appwrite/file";
import { database, storage } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
export const createPatient = async ({
  identificationDocument,
  ...patient
}: CreatePatientParams) => {
  try {
    const inputFile = InputFile.fromBuffer(
      identificationDocument?.get("blobFile") as Blob,
      identificationDocument?.get("fileName") as string
    );
    const file = await storage.createFile(
      process.env.STORAGE!,
      ID.unique(),
      inputFile
    );
    const newPatient = await database.createDocument(
      process.env.DATABASE!,
      process.env.PATIENT!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env.ENDPOINT}/storage/buckets/${process.env.STORAGE}/files/${file.$id}/view?project=${process.env.PROJECT}`,
        ...patient,
      }
    );
    return newPatient;
  } catch (error) {
    console.log(error);
  }
};
export const getPatient = async (userId: string) => {
  try {
    const patient = await database.listDocuments(
      process.env.DATABASE!,
      process.env.PATIENT!,
      [Query.equal("userId", [userId])]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

import * as sdk from "node-appwrite";
export const { PROJECT, DATABASE, API_KEY, ENDPOINT } = process.env;
const client = new sdk.Client();
client.setEndpoint(ENDPOINT!).setProject(PROJECT!).setKey(API_KEY!);
export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Functions(client);
export const users = new sdk.Users(client);

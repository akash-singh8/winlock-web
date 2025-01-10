import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const options: object = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!uri) {
  console.error("Undefined MongoDB URI environment variable");
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

async function getDb(): Promise<Db> {
  if (!clientPromise) {
    throw new Error("MongoDB client is not initialized");
  }
  const client = await clientPromise;
  return client.db("ProClients");
}

export default getDb;

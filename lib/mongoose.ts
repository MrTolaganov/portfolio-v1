import { connect, ConnectOptions, set } from "mongoose";

export default async function connectDatabase(): Promise<void> {
  set("strictQuery", true);

  const MONGODB_URI = process.env.MONGODB_URI;
  let isConnected = false;

  if (!MONGODB_URI) throw new Error("MongoDB URI does not exist");

  if (!MONGODB_URI || isConnected) return;

  try {
    const connectOptions: ConnectOptions = {
      dbName: "portfolio",
      autoCreate: true,
    };

    await connect(MONGODB_URI!, connectOptions);
    isConnected = true;
  } catch (e) {
    throw new Error(`MongoDB connection error: ${e}`);
  }
}

import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const databaseConnect = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL_V1 as string
    const connect = await mongoose.connect(dbUrl);
    console.log(`Database connected to ${connect.Connection.name}`);

  } catch (error) {
    console.log("Error: " + (error as Error).message);
    process.exit(1);
  }
}

export default databaseConnect;

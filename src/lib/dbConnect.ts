import mongoose from "mongoose";

const MONGOOSE_URI = process.env.MONGO_URI;

type ConnectionObject = {
  isConnectd?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnectd) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(MONGOOSE_URI || "", {});

    console.log(db);

    connection.isConnectd = db.connections[0].readyState;

    console.log("DB connected SuccessFully");
  } catch (error) {
    console.log("DB Connection failed", error);
    process.exit(1);
  }
}
export default dbConnect;

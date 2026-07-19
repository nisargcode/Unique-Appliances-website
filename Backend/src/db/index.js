import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`,
    );
    console.log("Mongodb Connected Successfully !! ");
  } catch (error) {
    console.log("Mongodb Connection Failed !! ", error);
    process.exit(1);
  }
};

export default ConnectDB;

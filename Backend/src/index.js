import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

try {
  await connectDB();

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port : ${process.env.PORT || 8000}`);
  });
} catch (error) {
  console.log("Mongodb connection failed !!!", error);
}

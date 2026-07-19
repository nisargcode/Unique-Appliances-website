import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import schemeRouter from "./routes/scheme.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRouter from "./routes/admin.js";
import snapshotRouter from "./routes/snapshot.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/categories", categoryRouter);

app.use("/api/products", productRouter);

app.use("/api/schemes", schemeRouter);

app.use("/api/admin", adminRouter);

app.use("/api/snapshots", snapshotRouter);

app.use(errorHandler);

export { app };

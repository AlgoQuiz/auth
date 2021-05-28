import express, { Application } from "express";
import { config as dotenvConfig } from "dotenv";

import connectDB from "./config/db";
import UserRouter from "./routes/user";
import { errorHandler } from "./middlewares";

const app: Application = express();

dotenvConfig();

connectDB();
app.use(express.json());

app.use(errorHandler);

app.use("/auth", UserRouter);

export default app;

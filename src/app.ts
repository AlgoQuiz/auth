import express, { Application } from "express";
import { config as dotenvConfig } from "dotenv";

import UserRouter from "./routes/user";

const app: Application = express();

dotenvConfig();

app.use("/auth", UserRouter);

export default app;

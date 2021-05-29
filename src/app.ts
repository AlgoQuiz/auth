import session from "express-session";
import express, { Application } from "express";
import { config as dotenvConfig } from "dotenv";

import connectDB from "./config/db";
import UserRouter from "./routes/user";
import redisAdapter from "./config/redis";
import { SESSION_OPTIONS } from "./config/session";

const app: Application = express();

app.use(express.json());
// Init env variables
dotenvConfig();
// Connect to MongoDB
connectDB();
// Redis config
const store = redisAdapter();

// @ts-ignore
app.use(session({ ...SESSION_OPTIONS, store }));

app.use("/auth", UserRouter);

export default app;

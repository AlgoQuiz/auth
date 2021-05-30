import session from "express-session";
import express, { Application } from "express";
import { config as dotenvConfig } from "dotenv";

import { getSessionOptions, redisAdapter, connectDB } from "./config";
import { login, register, me } from "./routes";
import { active } from "./middlewares";

const app: Application = express();

app.use(express.json());
// Init env variables
dotenvConfig();
// Connect to MongoDB
connectDB();
// Redis config
const store = redisAdapter();

app.use(session({ ...getSessionOptions(process.env), store }));
app.use(active);

app.use(login);
app.use(register);
app.use(me);

export default app;

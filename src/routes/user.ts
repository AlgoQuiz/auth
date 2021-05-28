import { Router } from "express";

import { login, register } from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/register", register);

export default UserRouter;

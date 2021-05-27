import { Router } from "express";

import { signIn, signUp } from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/signin", signIn);
UserRouter.post("/signup", signUp);

export default UserRouter;
